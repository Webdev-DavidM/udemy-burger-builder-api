import express from "express";
const app = express();
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

//with es6 modules i haver to use the full filename with .js otherwise it wont find it unlike in react with babel.
import Order from "../models/Orders.js";

// This will get the customer orders if their JWT token is valid

app.get("/", async (req, res) => {
  try {
    const token = req.body.token;
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, "DavidM-myJWTbackend-Secret");
    // req.userData = { userId: decodedToken.userId };
  } catch (err) {
    res.status(403).json("Authentication failed!").end();
  }

  try {
    let orders = await Order.find({ userId: req.body.userId });
    console.log(orders);
    if (orders) {
      res.status(200).json(orders).end();
    } else {
      res.status(401).json("no previous orders found").end();
    }
  } catch (err) {
    res.json(err);
  }
});

// Submit a new order

app.post("/", async (req, res) => {
  let { order, userId, orderData, token, price } = req.body;

  console.log(userId);
  try {
    const token1 = token;
    if (!token1) {
      res.status(401).json("Authentication failed!").end();
    }
    const decodedToken = jwt.verify(token1, "DavidM-myJWTbackend-Secret");
  } catch (err) {
    res
      .status(403)
      .json("Authentication failed!" + err)
      .end();
  }

  try {
    let customerOrder = {
      userId: userId,
      price: parseInt(price),
      order: {
        salad: order.salad.amount,
        meat: order.meat.amount,
        cheese: order.cheese.amount,
        bacon: order.bacon.amount,
      },
      orderData: {
        country: orderData.country,
        deliveryMethod: orderData.deliveryMethod,
        username: orderData.email,
        name: orderData.name,
        street: orderData.street,
        zipCode: orderData.zipCode,
      },
    };

    let newOrder = new Order(customerOrder);

    let orderNo = await newOrder.save();
    console.log();
    if (orderNo) {
      res.status(200).json(orderNo).end();
    } else {
      res.status(401).json("no previous orders found").end();
    }
  } catch (err) {
    res.json(err).end();
  }
});

export default app;
