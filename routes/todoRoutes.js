const express = require('express');
const {getTodos, createTodo, updateTodo, deleteTodo} = require("../controllers/todoController");
const router = express.Router();


router.get('', async (req, res) => {
    try{
        let todos = await getTodos()
        res.status(200).json(todos)
    }
    catch (e) {
        console.log(e)
        res.status(500).json({message: "Something went wrong"})
    }
});

router.get('/:id', async (req, res) => {
    try{
        let todos = await getTodos(req.params.id)
        res.status(200).json(todos)
    }
    catch (e) {
        console.log(e)
        res.status(500).json({message: "Something went wrong"})
    }
});

router.post('', async (req, res) => {
    try{
        let new_todo = await createTodo(req.body)
        res.status(200).json(new_todo)
    }
    catch (e) {
        console.log(e)
        res.status(500).json({message: "Something went wrong"})
    }
});

router.put('/:id', async(req, res) => {
    try{
        let todos = await updateTodo(req.params.id,req.body)
        res.status(200).json(todos)
    }
    catch (e) {
        console.log(e)
        res.status(500).json({message: "Something went wrong"})
    }
});

router.delete('/:id', async (req, res) => {
    try{
        let todos = await deleteTodo(req.params.id)
        res.status(200).json(todos)
    }
    catch (e) {
        console.log(e)
        res.status(500).json({message: "Something went wrong"})
    }
});

module.exports = router