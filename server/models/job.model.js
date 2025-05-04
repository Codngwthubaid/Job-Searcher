import mongoose, { mongo } from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Company',
        required: true
    }
})

export const Job = mongoose.model("Job", jobSchema);