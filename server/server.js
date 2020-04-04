const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  db = require("./config/sequelizeConfig");
app.use(bodyParser.json())
require("./routers/router")(app);
 
bodyParser.urlencoded({ extended: true });

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop the table and resync");
  });

app.get('/',(req,res)=>{
    res.json({message: "Rest api works"})
})

const server = app.listen(3000, callback => {
  const port = server.address().port;
  console.log("Server is working on port %s", port);
});
