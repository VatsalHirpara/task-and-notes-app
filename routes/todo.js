const { Router } = require('express')
const { Todos } = require('../database/db')

const route = Router()

route.get('/', async (req, res) => {
    const todos = await Todos.findAll()
    res.send(todos)
})