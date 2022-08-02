const Jobs = require("../models/Job")
const {StatusCodes} = require("http-status-codes")
const { NotFoundError, BadRequestError } = require("../errors")
const getAllJobs = async (req, res) => {
    const { userId } = req.user
    const jobs = await Jobs.find({createdBy: userId}).sort("createdAt")
    res.status(StatusCodes.OK).json(jobs)
}

const getJob = async (req, res) => {
    const {user: {userId}, params: {id}} = req
    const job = await Jobs.findOne({createdBy: userId, _id:id})
    if(!job){
        throw new NotFoundError("Job not found")
    }
    res.status(StatusCodes.OK).json(job)
}

const updateJob = async (req, res) => {
    const {user: {userId}, params: {id}, body: {company, position}} = req
    if(company === undefined && position === undefined){
        throw new BadRequestError("Please provide they property to be updated")
    }
    const job = await Jobs.findOneAndUpdate({createdBy: userId, _id:id}, req.body, {new: true, runvalidators: true})
    res.status(StatusCodes.OK).json(job)
}

const createJob = async (req, res) => {
    const {userId} = req.user
    req.body.createdBy = userId
    const job = await Jobs.create(req.body)
    res.status(StatusCodes.OK).json(job)
}

const deleteJob = async (req, res) => {
    const {user: {userId}, params: {id}} = req
    const job = await Jobs.findOneAndDelete({createdBy: userId, _id:id})
    if(!job){
        throw new NotFoundError("Job not found")
    }
    res.status(StatusCodes.OK).json(job)
}

module.exports = {
    getAllJobs,
    getJob, 
    updateJob,
    createJob,
    deleteJob
}