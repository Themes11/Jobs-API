const { UnauthenticatedError } = require("../errors")
const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        throw new UnauthenticatedError("Token not present")
    }
    const token = authHeader.split(" ")[1]
    if(!token){
        throw new UnauthenticatedError("Token not present")
    }
    try{
        const payload = jwt.verify(token, process.env.JWT_KEY)
        req.user = payload
    }catch(error){
        console.log(error)
    }
    next()

}

module.exports = {authMiddleware}