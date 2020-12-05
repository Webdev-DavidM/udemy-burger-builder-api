import mongoose from "mongoose";

const ingredientsSchema = new mongoose.Schema(
  {
    salad: {
      amount: Number,
      price: Number,
    },
    bacon: {
      amount: Number,
      price: Number,
    },
    cheese: {
      amount: Number,
      price: Number,
    },
    meat: {
      amount: Number,
      price: Number,
    },
  },
  { useUnifiedTopology: true }
);

const Ingredient = mongoose.model("Ingredient", ingredientsSchema);

export default Ingredient;
