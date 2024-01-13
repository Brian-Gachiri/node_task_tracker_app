const dbUtil = require('../config/mongoose');
const Todo = require('../models/todoModel')
async function getTodos(id=null){
    return id ? await Todo.findById(id) : await Todo.find({})
}

async function createTodo(todo){
    return await Todo.create(todo);
}

async function updateTodo(id,todo){

    const update = await Todo.updateOne({_id: id}, todo);
    return Todo.findById(id);
}

async function deleteTodo(id){
    return Todo.findByIdAndDelete(id)
}

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
}