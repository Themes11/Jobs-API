require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const authrouter = require("./routes/auth")
const jobsrouter = require("./routes/jobs")
const rateLimiter = require("express-rate-limit")
const helmet = require("helmet")
const cors = require("cors")
const xss = require("xss-clean")


// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const {connectDB} = require("./db/connect");
const {authMiddleware} = require('./middleware/authentication');

app.use(express.json());

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// extra packages

// routes
app.use('/api/v1/auth', authrouter)
app.use('/api/v1/jobs',authMiddleware, jobsrouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
