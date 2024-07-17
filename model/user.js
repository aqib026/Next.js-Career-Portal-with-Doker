import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
  first_name: "string",
  Last_name: "string",
  email: "string",
  phone: "string",
  password: "string",
  resume: "string",
  profilePicture: "string",
  headline: "string",
  bio: "string",
  is_admin: "bool",
  created_at: "date"
});

const Users = models.user || model("user", userSchema);
export default Users;
