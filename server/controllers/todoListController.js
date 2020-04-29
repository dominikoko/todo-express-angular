const db = require("../config/sequelizeConfig"),
  User = db.user,
  Todo = db.todo;

const Op = db.Sequelize.Op;

exports.createTask = async (req, res) => {
  try {
    if (!req.body.title && !req.body.task) {
      res.status(400).send({
        reason: err,
        message: "Content can not be empty!",
      });
      return;
    }

    const todo = await Todo.create({
      title: req.body.title,
      task: req.body.task,
      userId: req.body.userIdentity,
    });
    res.send(todo);
    res.send({ message: "task created successfully" });
    res.status(200).json({
      status: "success",
      todo: req.body,
    });
  } catch (err) {
    res
      .status(500)
      .send({ reason: err, message: "error while creating the task" });
  }
};

exports.getList = async (req, res, next) => {
  const identity = req.params.id;

  try {
    const listOfTodos = await Todo.findAll({
      include: [{ model: User }],
      where: {
        userId: {
          [Op.eq]: identity,
        },
      },
    });

    res.send(listOfTodos);
    res.send({ message: "got all tasks" });
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res
      .status(500)
      .send({ reason: err, message: "error why retrieving todo-list" });
  }
};

exports.getTask = async (req, res) => {
  const id = req.param.id;
  try {
    const specificTodo = await Todo.findByPk(id);

    res.send(specificTodo);
    res.send({ message: "got todo with id:" + id });
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res
      .status(500)
      .send({ reason: err || "error why retrieving todo with id" + id });
  }
};

exports.updateTask = async (req, res) => {
  const id = req.params.id;
  try {
    const todoToUpdate = await Todo.update(req.body, {
      where: { id: id },
    });

    if (todoToUpdate == 1) {
      res.send({
        message: "task updated",
      });

      res.send({
        message: "can't update task with id = " + id,
      });
    }
  } catch (err) {
    res
      .status(500)
      .send({ reason: err || "error why updating task with id" + id });
  }
};
exports.deleteTask = async (req, res) => {
  const id = req.params.id;
  try {
    const todoToDestroy = await Todo.destroy({
      where: { id: id },
    });

    if (todoToDestroy == 1) {
      res.send({
        message: "task deleted",
      });

      res.send({
        message: "can't delete task with id = " + id,
      });
    }
  } catch (err) {
    res
      .status(500)
      .send({ reason: err || "error why deleting task with id" + id });
  }
};
