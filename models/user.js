import mongoose from "mongoose";

// creating a schema for user
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// creating a model is like a collections
const User = new mongoose.model("User", userSchema);

export default User;