import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide a value for 'email'"],
    },
    password: {
      type: String,
      required: [true, "Please provide a value for 'password'"],
    },
  },
  { useUnifiedTopology: true }
);

const User = mongoose.model("User", usersSchema);

export default User;
