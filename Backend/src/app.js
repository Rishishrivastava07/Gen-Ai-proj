const express = require("express");
const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes"); 
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use("/api/auth", authRouter);

app.use("/api/interview", interviewRouter);

module.exports = app;
