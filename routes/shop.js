import express from "express";
const app = express();

import multer from "multer";
export const upload = multer({ dest: "uploads/" });

// with es6 modules i haver to use the full filename with .js otherwise it wont find it unlike in react with babel.
import Bike from "../models/Bike.js";

// get all the items from the document

app.get("/bikes", async (req, res) => {
  try {
    let bikes = await Bike.find();
    if (bikes) {
      res.status(200).json(bikes).end();
    } else {
      res.status(401).json("no bike found").end();
    }
  } catch (err) {
    res.json(err);
  }
});

// Get one item from the document

app.get("/bikes:id", async (req, res) => {
  try {
    let bike = await Bike.findOne({ _id: req.params._id });
    if (bike) {
      res.status(200).json(bikes).end();
    } else {
      res.status(401).json("no bike found").end();
    }
  } catch (err) {
    res.json(err);
  }
});

// Post a new item to the document

app.post("/bikes:id", async (req, res) => {
  try {
    let bike = await Bike.findOne({ _id: req.params._id });
    if (bike) {
      res.status(200).json(bikes).end();
    } else {
      res.status(401).json("no bike found").end();
    }
  } catch (err) {
    res.json(err);
  }
});

// Update an item in the document

app.post("/bikes", async (req, res) => {
  let bike = {
    model: req.body.model,
    description: req.mody.description,
    price: req.body.price,
  };
  try {
    let newBike = await Bike.save(bike);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json("error");
  }
});

// Delete an item from the document

app.delete("/bikes:id", async (req, res) => {
  try {
    let bikeToDelete = await Bike.findOne({ _id: req.params._id });
    if (bikeToDelete) {
      await Bike.deleteOne({ _id: req.params.id });
      res.status(200).json(bikes).end();
    } else {
      res.status(401).json("no bike found").end();
    }
  } catch (err) {
    res.json(400).json(err);
  }
});

export default app;
