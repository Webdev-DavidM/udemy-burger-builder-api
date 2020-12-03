import express from "express";
const app = express();
import mongoose from "mongoose";
import bcrypt from "bcrypt";
// with es6 modules i haver to use the full filename with .js otherwise it wont find it unlike in react with babel.
import User from "../models/User.js";
import AdminUser from "../models/AdminUser.js";

app.post("/register", (req, res) => {
  //Below I will bcrypt the password
  const passwordHashed = req.body.password;
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, async (err, salt) => {
    try {
      bcrypt.hash(passwordHashed, salt, async (err, hash) => {
        await User.create({
          email: req.body.email,
          password: hash,
          name: req.body.name,
        });
      });
      res.status(201).json("created");
    } catch (err) {
      console.log(err);
    }
  });
});

app.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      console.log(user.password);
      // Here I am checking if the bcrypt password works
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result) {
          res.status(202).json({ name: user.name });
        } else {
          res.status(401).json("unauthorised");
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/admin-login", async (req, res) => {
  try {
    console.log(req.body);
    let user = await AdminUser.findOne({ email: req.body.email });
    console.log(user);
    if (req.body.password === user.password) {
      res.status(202).json("authorised");
    } else {
      res.status(401).json("unauthorised");
    }
  } catch (err) {
    console.log(err);
  }
});

export default app;
