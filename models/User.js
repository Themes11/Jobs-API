const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 3
    }

})

UserSchema.pre("save", async function() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createToken = function () {
    return jwt.sign({ userId: this._id, name: this.name}, process.env.JWT_KEY, {
        expiresIn: process.env.JWT_TIMER
    })
}

UserSchema.methods.checkPassword = async function (userPassword) {
    const check = await bcrypt.compare(userPassword, this.password)
    return check
}

module.exports = mongoose.model("User", UserSchema)