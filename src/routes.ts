import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from "./lib/prisma"

export async function appRoutes(app: FastifyInstance) {
    app.get('/to-do-items-by-situation', async (request) => {
        const getItemsParams = z.object({
            situation: z.coerce.number().min(0).max(1)
        })
        const { situation } = getItemsParams.parse(request.query)

        const toDoItems = await prisma.toDoItem.findMany({
            where: {
                completed: situation
            },
            orderBy: [
                {
                    title: 'asc'
                }
            ]
        })
    
        return toDoItems
    })

    app.get('/to-do-items', async () => {
        const toDoItems = await prisma.toDoItem.findMany({
            orderBy: [
                {
                    completed: 'asc'
                },
                {
                    title: 'asc',
                }
            ]
                
        })
    
        return toDoItems
    })

    app.get('/to-do-items/:todoId', async (request) => {
        const createItemBody = z.object({
            todoId: z.coerce.number()
        })
        
        const { todoId } = createItemBody.parse(request.params)

        const todoItem = await prisma.toDoItem.findUnique({
            where: {
                id: todoId,
            },
        })

        return todoItem
    })

    app.post('/to-do-items', async(request) => {
        const createItemBody = z.object({
            title: z.string()
        })
        
        const { title } = createItemBody.parse(request.body)

        const newTodo = await prisma.toDoItem.create({
            data: {
                title
            }
        })

        return newTodo
    })

    app.patch('/to-do-items/:todoId', async (request) => {
        const todoParams = z.object({
            todoId: z.coerce.number()
        })

        const todoQueryParams = z.object({
            situation: z.coerce.number().min(0).max(1)
        })

        const { todoId } = todoParams.parse(request.params)
        const { situation } = todoQueryParams.parse(request.query)

        const updateTodo = await prisma.toDoItem.update({
            where: {
                id: todoId
            },
            data: {
                completed: situation,
            },
        })
    })

    app.put('/to-do-items/:todoId', async (request) => {
        const createItemBody = z.object({
            id: z.coerce.number(),
            title: z.string()
        })
        
        const { id, title } = createItemBody.parse(request.body)
        
        const updateTodo = await prisma.toDoItem.update({
            where: {
                id
            },
            data: {
                title
            }
        })
    })

    app.delete('/to-do-items/:todoId', async (request) => {
        const createItemBody = z.object({
            todoId: z.coerce.number()
        })
        
        const { todoId } = createItemBody.parse(request.params)

        await prisma.toDoItem.delete({
            where: {
                id: todoId,
            },
        })

    })
}
