const todoModel = require('../models/Todos.js')

module.exports = {
    getById: function (req, res, next) {
        todoModel.findById(req.params.todoId, function (err, todoInfo) {
            if (err) {
                next(err)
            } else {
                res.json({ status: 'success', message: 'todo item found', data: { todo: todoInfo } })
            }
        })
    },
    getAll: function (req, res, next) {
        let cardList = []

        cardModel.find({}, function (err, cards) {
            if (err) {
                next(err)
            } else {
                for (let card of cards) {
                    cardList.push({ id: card._id, type: card.cardType, text: card.text, image: card.image, themes: card.themes, choice1: card.choice1, choice2: card.choice2 })
                }
                res.json({ status: 'succes', message: 'card list found', data: { cards: cardList } })
            }
        })
    },
    getAll: function (req, res, next) {
        let todoList = []

        todoModel.find({}, function (err, cards) {
            if (err) {
                next(err)
            } else {
                for (let todo of todos) {
                    todoList.push({ id: todo._id, title: todo.title, complete: todo.complete, creator: todo.creator, notes: todo.notes })
                }
                res.json({ status: 'succes', message: 'todo list found', data: { todos: todoList } })
            }
        })
    },
    create: function (req, res, next) {

        console.log(req.body, "todoController req.body")

        todoModel.create({
            title: req.body.title,
            notes: req.body.notes,
            creator: req.body.creator,
            complete: req.body.complete
        }, function (err, result) {
            if (err) {
                next(err)
            } else {
                res.json({ status: 'success', message: 'todo added succesfully', data: result })

            }
        })
    },
    deleteById: function (req, res, next) {
        todoModel.findByIdAndRemove(req.params.todoId, function(err, todoInfo) {
            if (err)
                next(err)
            else {
                res.json({status:'success', message: 'todo item deleted successfully', data: todoInfo})
            }
        })
    },
    updateById: function (req, res, next) {
        todoModel.findByIdAndUpdate(req.params.todoId, {
            title: req.body.title,
            notes: req.body.notes,
            creator: req.body.creator,
            complete: req.body.complete
            }, function(err, todoInfo) {
            if (err)
                next(err)
            else {
                res.json({status:'success', message: 'todo item updated successfully', data: todoInfo})
            }
        })
    },
}