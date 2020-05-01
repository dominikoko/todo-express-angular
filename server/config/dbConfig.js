const dbConfig = {
  database: 'usersDB',
  username: 'root',
  port: 3000,
  password: 'passWORD',
  host: 'localhost',
  dialect: 'mysql',
  pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
  }
};
 
module.exports = dbConfig;
