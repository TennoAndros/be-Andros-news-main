const {
  selectUsers,
  selectUserByUsername,
  insertUser,
  checkUserExists,
} = require("../models/users-models");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await selectUsers();
    res.status(200).send({ users });
  } catch (err) {
    next(err);
  }
};

exports.getUserByUsername = async (req, res, next) => {
  try {
    const username = req.params.username;
    const user = await selectUserByUsername(username);
    res.status(200).send({ user });
  } catch (err) {
    next(err);
  }
};

exports.postUser = async (req, res, next) => {
  try {
    const userObj = req.body; 
    const [, newUser] = await Promise.all([
      checkUserExists(userObj.username), 
      insertUser(userObj),
    ]);
    res.status(201).send({ newUser });
  } catch (err) {
    next(err);
  }
};
