const verifySignUp = require("./verifySignUp"),
  jwtAuth = require("./jwtAuth");

module.exports = function(app) {
  const controller = require("../controllers/controller");
  const todoListController = require("../controllers/todoListController");

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/auth/signup",[verifySignUp.checkDuplicates],
    controller.signUp
  );

  app.post("/auth/signin", controller.signIn);

  app.get("/test/user", [jwtAuth.verifyToken], controller.userContent);
  
  app.post("/create-task",[jwtAuth.verifyToken],todoListController.createTask);

  app.get("/get-todo-list/:id",[jwtAuth.verifyToken],todoListController.getList);

  app.get("/get-task-by-id/:id",[jwtAuth.verifyToken],todoListController.getTask);

  app.put("/update-task/:id",[jwtAuth.verifyToken],todoListController.updateTask);

  app.delete("/delete-task/:id",[jwtAuth.verifyToken],todoListController.deleteTask);

};
