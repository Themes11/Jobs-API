const mongoose = require("mongoose")

const Jobs = mongoose.Schema({
    company:{
        type: String,
        required: [true, "Please provide company name"],
        maxlength: 50
    },
    position: {
        type: String,
        required: [true, "Please provide position name"],
        maxlength: 100
    },
    status:{
        type: String,
        enum: ["pending", "rejected", "interview"],
        default: "pending"
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User",
        required: [true, "Please provide user name"] 
    }
}, {timestamps: true})

module.exports = mongoose.model("Jobs", Jobs)