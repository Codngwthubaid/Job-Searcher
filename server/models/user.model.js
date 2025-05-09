import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unqiue: true
    },
    resume: {
        type: String
    },
    image :{
        type: String,
        required: true
    }
});

export const User = mongoose.model("User", userSchema);