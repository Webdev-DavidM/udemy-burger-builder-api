import mongoose from "mongoose";

const adminUsersSchema = new mongoose.Schema(
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

const Admin = mongoose.model("Admin", adminUsersSchema);

export default Admin;
