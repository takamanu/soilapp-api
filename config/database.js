const Sequelize = require("sequelize");

// configure this with your own parameters

const database = new Sequelize({
  database: "soilapp",
  username: "root",
  password: "Kairobot123!",
  dialect: "mysql",
  //   port:,
  host: "34.172.160.94",
});

module.exports = database;
