import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: "User",
        required: true
    },
    companyId: {
        type: String,
        ref: "Company",
        required: true
    },
    jobId: {
        type: String,
        ref: "Job",
        required: true
    },
    status : {
        type: Boolean,
        default:"Pending"
    },
    date:{
        type: Number,
        required: true
    }
});  

export const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);