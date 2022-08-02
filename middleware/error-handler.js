const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode,
    msg: err.message
  }

  if(err.name === "CastError"){
    customError.statusCode = 404,
    customError.msg = `No job found for the ID: ${err.value}`
  }
  if(err.name === "ValidationError"){
    customError.msg = Object.keys(err.errors).map((errItem) => {
      console.log(errItem)
      return })
      .join(", ")
    customError.statusCode = 400
    console.log(customError.msg)
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
  return res.status(customError.statusCode).json(customError.msg)
}

module.exports = errorHandlerMiddleware
