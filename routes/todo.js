const { Router } = require('express')
const { Todos } = require('../database/db')

const route = Router()

route.get('/', async (req, res) => {
    const todos = await Todos.findAll()
    res.send(todos)
})

route.get('/:id', async (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send({
      error: 'todo id must be an integer',
    })
  }
  const todo = await Todos.findByPk(req.params.id)

  if (!todo) {
    return res.status(404).send({
      error: 'No todo found with id = ' + req.params.id,
    })
  }
  res.send(todo)
})


route.get('/:id/notes',async (req,res)=>{
	if (isNaN(Number(req.params.id))) {
		return res.status(400).send({error: 'todo id must be an integer'})
	}
	const todo = await Todos.findByPk(req.params.id)
	if (!todo) {
		return res.status(404).send({error: 'No todo found with id = ' + req.params.id})
	}
	if(!todo.notes) return res.status(404).send({
		error: `No notes found of todo with id = ${req.params.id}`  
	})

	const notes = todo.notes.split(',')
	res.send(notes)
})


route.post('/', async (req, res) => {

    if (req.body.status === 'true') {
      req.body.status = true
    } else {
      req.body.status = false
    }
    
    const todo = {
        title: req.body.title,
        description:req.body.description,
        due: req.body.due,
        priority:req.body.priority,
        status: req.body.status,
    }
    if( req.body.notes) todo.notes = req.body.notes.toString()

    const newTodo = await Todos.create(todo)
    res.status(201).send({ success: 'New task added', data: newTodo })
})

module.exports = route