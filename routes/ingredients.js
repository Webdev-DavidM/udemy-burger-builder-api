import express from "express";
const app = express();
import mongoose from "mongoose";
import Ingredient from "../models/Ingredients.js";

app.get("/", async (req, res) => {
  try {
    let ingredients = await Ingredient.find({});
    if (ingredients) {
      res.status(200).json(ingredients).end();
    } else {
      res.status(401).json("no ingredients found").end();
    }
  } catch (err) {
    res.json(err);
  }
});

export default app;
