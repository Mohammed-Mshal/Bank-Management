import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    default: "user",
  },
  image: {
    type: String,
  },
  authProviderId: {
    type: String,
  },
});

const UserModel = models?.user || model("user", userSchema);
export default UserModel;
