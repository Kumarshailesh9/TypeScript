"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text
    };
    todos.push(newTodo);
    res.status(201).json({ message: 'Todo created successfully', todo: newTodo });
});
router.put('/todo/:todoId', (req, res, next) => {
    const params = req.params;
    const todoId = params.todoId;
    const body = req.body;
    const index = todos.findIndex((todosItem) => todosItem.id === todoId);
    if (index >= 0) {
        todos[index] = { id: todos[index].id, text: body.text };
        return res.status(200).json({ message: 'Updated Successfully', todos: todos });
    }
    res.status(404).json({ message: 'page not found!' });
});
router.delete('/todo/:todoId', (req, res, next) => {
    const params = req.params;
    todos = todos.filter(todoItem => todoItem.id !== params.todoId);
    res.status(200).json({ message: 'Deleted Successfully', todos: todos });
});
exports.default = router;
