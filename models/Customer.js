import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please provide a username"],
    },
    password: {
      type: String,
      required: [true, "please provide a password"],
    },
  },
  { useUnifiedTopology: true }
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
