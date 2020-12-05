import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String },
    order: {
      salad: {
        type: Number,
      },
      bacon: {
        type: Number,
      },
      cheese: {
        type: Number,
      },
      meat: {
        type: Number,
      },
    },
    price: {
      type: Number,
    },
    orderData: {
      name: {
        type: String,
        required: [true, "please provide a name"],
      },
      username: {
        type: String,
        required: [true, "please provide a username"],
      },
      street: {
        type: String,
        required: [true, "please provide a street"],
      },
      zipCode: {
        type: String,
        required: [true, "please provide a postcode"],
      },
      country: {
        type: String,
        required: [true, "please provide a country"],
      },
      deliveryMethod: {
        type: String,
        required: [true, "please provide a delivery method"],
      },
    },

    totalPrice: {
      type: Number,
    },
  },

  { useUnifiedTopology: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
