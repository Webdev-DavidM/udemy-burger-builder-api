import express from "express";
const app = express();
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Customer from "../models/Customer.js";
// with es6 modules i haver to use the full filename with .js otherwise it wont find it unlike in react with babel.
// import User from "../models/User.js";
// import AdminUser from "../models/AdminUser.js";

app.post("/log-in", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  let existingUser;

  try {
    existingUser = await Customer.findOne({ username: username });
    console.log(existingUser);
  } catch (err) {
    return res
      .status(500)
      .json("Logging in failed, please try again later." + err);
  }

  if (!existingUser) {
    return res.status(403).json("Invalid credentials, could not log you in.");
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return res
      .status(500)
      .json(
        "Could not log you in, please check your credentials and try again." +
          err
      );
  }

  if (!isValidPassword) {
    return res.status(403).json("Invalid credentials, could not log you in.");
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "DavidM-myJWTbackend-Secret",
      { expiresIn: "1h" }
    );
  } catch (err) {
    return res
      .status(500)
      .json("Logging in failed, please try again later." + err);
  }

  return res.json({
    userId: existingUser._id,
    email: existingUser.username,
    token: token,
  });
});

app.post("/register", async (req, res) => {
  console.log(req.body);
  let existingUser;
  try {
    existingUser = await Customer.findOne({ username: req.body.username });
    console.log(existingUser);
  } catch (err) {
    console.log(existingUser);
    return res
      .status(500)
      .json("Signing up failed, please try again later." + err);
  }

  if (existingUser) {
    return res.status(422).json("User exists already, please login instead.");
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(req.body.password, 12);
  } catch (err) {
    return res
      .status(500)
      .json("Could not create user, please try again." + err);
  }

  const createdUser = new Customer({
    username: req.body.username,
    password: hashedPassword,
  });

  try {
    await createdUser.save();
  } catch (err) {
    return res
      .status(500)
      .json("Signing up failed, please try again later." + err);
  }

  let token;
  try {
    token = await jwt.sign(
      { userId: createdUser._id, username: createdUser.username },
      "DavidM-myJWTbackend-Secret",
      { expiresIn: "1h" }
    );
    console.log(token);
    return res.status(201).json({
      userId: createdUser._id,
      username: createdUser.username,
      token: token,
    });
  } catch (err) {
    return res
      .status(500)
      .json("Signing up failed, please try again later." + err);
  }
});

export default app;
