const mongoose = require("mongoose");

const technicalQuestionsSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: ["true", "question is required"],
    },
    intention: {
      type: String,
      required: ["true", "Intention is required"],
    },
    answer: {
      type: String,
      required: ["true", "Answer is required"],
    },
  },
  {
    _id: false,
  },
);
const behavioralQuestionsSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: ["true", "question is required"],
    },
    intention: {
      type: String,
      required: ["true", "Intention is required"],
    },
    answer: {
      type: String,
      required: ["true", "Answer is required"],
    },
  },
  {
    _id: false,
  },
);

const skillGapSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: ["true", "skill is required"],
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: ["true", "severity is required"],
    },
  },
  {
    _id: false,
  },
);

const preparationPlanSchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: ["true", "day is required"],
    },
    focus: {
      type: String,
      required: ["true", "focus is required"],
    },
    task: [
      {
        type: String,
        required: ["true", "task is required"],
      },
    ],
  },
  {
    _id: false,
  },
);

const interviewReportSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: String,
      required: ["true", "job description is required"],
    },
    resume: {
      type: String,
    },
    selfDescription: {
      type: String,
    },
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    technicalQuestions: [technicalQuestionsSchema],
    behavioralQuestions: [behavioralQuestionsSchema],
    skillGap: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    title: {
      type: String,
      required: ["true", "title is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  },
);

const interviewReportModel = mongoose.model(
  "InterviewReport",
  interviewReportSchema,
);

module.exports = interviewReportModel;
