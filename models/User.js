const Sequelize = require("sequelize");
const db = require("../config/database");

// creation of the User model
const User = db.define("user", {
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  first_name: {
    type: Sequelize.STRING,
  },
  last_name: {
    type: Sequelize.STRING,
  },
});

module.exports = User;
