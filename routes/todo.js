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


route.get('/:id/notes', async (req, res) => {
	if (isNaN(Number(req.params.id))) {
		return res.status(400).send({ error: 'todo id must be an integer' })
	}
	const todo = await Todos.findByPk(req.params.id)
	if (!todo) {
		return res.status(404).send({ error: 'No todo found with id = ' + req.params.id })
	}
	if (!todo.notes) return res.status(404).send({
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
		description: req.body.description,
		due: req.body.due,
		priority: req.body.priority,
		status: req.body.status,
	}
	if (req.body.notes) todo.notes = req.body.notes.toString()

	const newTodo = await Todos.create(todo)
	res.status(201).send({ success: 'New task added', data: newTodo })
})

route.post('/:id/notes', async (req, res) => {
	if (isNaN(Number(req.params.id))) {
		return res.status(400).send({
			error: 'todo id must be an integer',
		})
	}

	const todo = await Todos.findByPk(req.params.id)
	if (!todo) {
		return res.status(404).send({ error: `No todo found with id = ${req.params.id}` })
	}
	const note = req.body.note;
	if (todo.notes === null) {
		const notes = []
		notes.push(note)
		todo.notes = notes.toString()
	}
	else {
		const notes = todo.notes.split(',')
		notes.push(note)
		todo.notes = notes.toString()
	}

	await todo.save()
	res.status(201).send({ success: 'New task added', data: note })
})

route.patch('/:id',async (req,res) => {
	if (isNaN(Number(req.params.id))) {
		return res.status(400).send({
			error: 'todo id must be an integer',
		})
	}
	const updatedTOdo = {id:req.params.id, ...req.body}
	Todos.upsert(
		updatedTOdo
	)
	.then((test) => {
		if(test){
			res.status(200);
			res.send("Successfully stored");
		}else{
			res.status(200);
			res.send("Successfully inserted");
		}
	})
	.catch((err)=>console.log(err))
}) 

module.exports = route