const User = require("../models/User")
const { BadRequestError, UnauthenticatedError } = require("../errors")
const login = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password) {
        throw new BadRequestError("Please provide email and password")
    }
    const user =await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError("Invalid Credentials")
    }
    const passwordCheck = await user.checkPassword(password)
    if(!passwordCheck){
        throw new UnauthenticatedError("Invalid Credentials")
    }
    const token = user.createToken()
    res.json({token})
}

const register = async (req, res) => {
    const user = await User.create({...req.body})
    const token = user.createToken()
    res.json({token}) 
}

module.exports = {
    login,
    register
}