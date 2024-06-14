const User = require("../models/User");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const { jwtOptions } = require("../config/jwtOptions");

const createUser = async ({ firstName, lastName, email, password }) => {
  return await User.create({ firstName, lastName, email, password });
};

const getUser = async (obj) => {
  return await User.findOne({
    where: obj,
  });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (email && password) {
    let user = await getUser({ email: email });
    if (!user) {
      return res.status(401).json({ message: "No such user found" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.status(403).json({ message: "incorrect password" });
      }
      if (result) {
        let payload = { user };
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        const data = {
          email: email,
          token: token,
        };
        return res.status(200).json({ message: "success login", data: data });
      } else {
        return res.status(403).json({ message: "incorrect password" });
      }
    });
  } else {
    return res.status(400).json({ message: "Email and password required" });
  }
};

const registerUser = async (req, res, next) => {
  const user = await getUser({ email: req.body.email });

  if (user) return res.status(409).json({ message: "email already exists" });

  const { first_name, last_name } = req.body;
  bcrypt.hash(req.body.password, null, null, (err, hash) => {
    createUser({
      firstName: first_name,
      lastName: last_name,
      email: req.body.email,
      password: hash,
    }).then((user) =>
      res
        .status(201)
        .json({ message: "account created successfully", data: user })
    );
  });
};

module.exports = {
  loginUser,
  registerUser,
};
