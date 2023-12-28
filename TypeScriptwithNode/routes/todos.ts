import { Router } from "express";

import { Todo } from "../models/todo";

let todos: Todo[] = [];

const router = Router();

router.get('/', (req, res, next) => {
    res.status(200).json({todos: todos})
});

router.post('/todo', (req, res, next) => {
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: req.body.text
    }
    todos.push(newTodo);

    res.status(201).json({ message: 'Todo created successfully', todo: newTodo });
   
})

router.put('/todo/:todoId', (req, res, next) => {
    const todoId = req.params.todoId;
    const index = todos.findIndex((todosItem) => todosItem.id === todoId);
    if(index >= 0){
        todos[index] = {id: todos[index].id, text : req.body.text };
        return res.status(200).json({message : 'Updated Successfully', todos: todos}) 
    }

    res.status(404).json({message: 'page not found!'});
})

router.delete('/todo/:todoId', (req, res, next) => {
    todos = todos.filter(todoItem => todoItem.id !== req.params.todoId);

    res.status(200).json({message: 'Deleted Successfully', todos: todos})
})

export default router;