import UserModel from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//Function signin
export const signIn = async (req, res, next) => {
  UserModel.find({
    username: req.body.username,
  })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: " Mail exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new UserModel({
              username: req.body.username,
              name: req.body.name,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "User created",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};
export const remove = async (req, res) => {
  UserModel.remove({ _id: req.params.id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: " user deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
export const getAll = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const login = async (req, res) => {
  UserModel.find({ username: req.body.username })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(404).json({
          message: "Auth failed",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            { username: user[0].username, id: user[0]._id },
            process.env.JWT_KEY,
            {
              expiresIn: "10h",
            }
          );
          return res.status(200).json({
            message: "Auth success",
            token: token,
            name: user[0].name,
          });
        }
        res.status(401).json({
          message: "Auth failed",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
