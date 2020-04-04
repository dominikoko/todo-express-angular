const db = require('../config/sequelizeConfig'),
    secret = require('../config/secret').secret,
    User = db.user,
    Todo = db.todo,
    jwt = require('jsonwebtoken'),
    brypt = require('bcrypt');

    const Op = db.Sequelize.Op;

    exports.createTask = (req,res) =>{
        if (!req.body.title && !req.body.task) {
            res.status(400).send({
              message: "Content can not be empty!"
            });
            return;
          }
        
    Todo.create({
        title: req.body.title,
        task: req.body.task,
        userId: req.body.userIdentity
    }).then(data =>{
        res.send(data);
        res.send({message: "task created successfully"});
        res.status(200).json({
            status: 'success',
            data: req.body,
        }).catch(err=>{
            res.status(500).send({reason: err || "error while creating the task"})
        });
    });
    }

    exports.getList = (req,res) =>{
        const identity = req.params.id;
        Todo.findAll({
         include: [{model: User}],
         where:{
            userId:{
                [Op.eq]: identity
            }
         }
    }).then(data =>{
        res.send(data);
        res.send({message: "got all taskts"});
        res.status(200).json({
            status: 'success'
        }).catch(err=>{
            res.status(500).send({reason: err || "error why retrieving todo-list"})
        });
    });
    }
    
    
    exports.getTask = (req,res) =>{
        const id = req.param.id;
    Todo.findByPk(id).
    then(data =>{
        res.send(data);
        res.send({message: "got task with id:" + id});
        res.status(200).json({
            status: 'success'
        }).catch(err=>{
            res.status(500).send({reason: err || "error why retrieving task with id" + id})
        });
    });
    }
    
    exports.updateTask = (req,res) =>{
        const id = req.param.id;
    Todo.update(req.body,{
        where: { id: id }
    }).
    then(num =>{
        if(num == 1){
            res.send({
                message: "task updated"
            });

            res.send({
                message: "can't update task with id = " + id
            })
        }
    
        }).catch(err=>{
            res.status(500).send({reason: err || "error why updating task with id" + id})
        });
    }

    exports.deleteTask = (req,res) =>{
        const id = req.param.id;
    Todo.destroy({
        where: { id: id }
    }).
    then(num =>{
        if(num == 1){
            res.send({
                message: "task deleted"
            });

            res.send({
                message: "can't delete task with id = " + id
            })
        }
    
        }).catch(err=>{
            res.status(500).send({reason: err || "error why deleting task with id" + id})
        });
    }