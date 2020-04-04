const dbConfig = require('./dbConfig');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorAliases: false,

     
  pool: {
    max: dbConfig.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }

});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/user.model')(sequelize, Sequelize);
db.todo = require('../models/todo.model')(sequelize,Sequelize);

db.user.hasMany(db.todo, {onDelete: 'cascade'});
db.todo.belongsTo(db.user,{foreignKey:'userId'});

module.exports = db;
