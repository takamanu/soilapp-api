const User = require("../models/User");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const { jwtOptions } = require("../config/jwtOptions");

const getUser = async (obj) => {
  return await User.findOne({
    where: obj,
  });
};

const getAllUsers = async () => {
  return await User.findAll();
};

const getUsers = async (req, res, next) => {
  getAllUsers()
    .then((users) =>
      res.json({ message: "success get all users", data: users })
    )
    .catch(next);
};

const getUserById = async (req, res, next) => {
  const user = await getUser({ id: req.params.id });
  if (user) {
    res.json({ message: "success get all users", data: user });
  } else {
    res.status(400).json({ message: "User not found" });
  }
};

const getUserByJwt = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("Authorization header not present");
    return res.status(401).json({ message: "jwt is missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtOptions.secretOrKey);
    const user = await getUser({ id: decoded.user.id });
    if (user) {
      res.json({ message: "success get profile", data: user });
    } else {
      res.status(400).json({ message: "user not found" });
    }
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = {
  getUsers,
  getUserByJwt,
  getUserById,
};
