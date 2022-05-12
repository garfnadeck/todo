const { PrismaClient } = require('@prisma/client')
const express = require('express')
const todoRoutes = express.Router()
const allTodos = [{ name: 'aaaa', status: false }]

const prisma = new PrismaClient()

todoRoutes.post('/todos', async (req, res) => {
  const { name } = req.body
  allTodos.push({ name, status: false })
  const todo = await prisma.todo.create({
    data: {
      name,
    },
  })
  return res.status(201).json(todo)
})

todoRoutes.get('/todos', async (req, res) => {
  const todos = await prisma.todo.findMany()
  return res.status(200).json(todos)
})

todoRoutes.put('/todos', async (req, res) => {
  const { name, id, status } = req.body
  if (!id) {
    return res.status(400).json('Id is mandatory')
  }

  const todoAlreadyExists = await prisma.todo.findUnique({ where: { id } })

  if (!todoAlreadyExists) {
    return res.status(404).json('Todo not found')
  }

  const todo = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      name,
      status,
    },
  })
  return res.status(200).json(todo)
})

todoRoutes.delete('/todos/:id', async (req, res) => {
  const { id } = req.params

  const intId = parseInt(id)

  if (!intId) {
    return res.status(400).json('Id is mandatory')
  }

  const todoAlreadyExists = await prisma.todo.findUnique({
    where: { id: intId },
  })

  if (!todoAlreadyExists) {
    return res.status(404).json('Todo not found')
  }

  await prisma.todo.delete({ where: { id: intId } })
  return res.status(200).json('Deleted')
})

module.exports = todoRoutes
