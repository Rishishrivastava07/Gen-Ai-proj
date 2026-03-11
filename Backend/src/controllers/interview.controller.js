const pdfParse = require("pdf-parse");
const generateInterviewReport = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

async function generateInterviewReportController(req, res) {
  const { selfDescription, jobDescription } = req.body;

  if (!jobDescription) {
    return res.status(400).json({
      message: "Job description is required.",
    });
  }

  if (!req.file && !selfDescription) {
    return res.status(400).json({
      message: "Either a resume or self description is required.",
    });
  }

  let resumeText = "";

  if (req.file) {
    const parser = new pdfParse.PDFParse(Uint8Array.from(req.file.buffer));
    const resumeContent = await parser.getText();
    resumeText = resumeContent.text;
  }

  const interviewReportByAI = await generateInterviewReport({
    resume: resumeText,
    selfDescription,
    jobDescription,
  });

  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume: resumeText,
    selfDescription,
    jobDescription,
    ...interviewReportByAI,
  });

  res.status(201).json({
    message: "Interview report generated successfully.",
    interviewReport,
  });
}


async function getInterviewReportController(req, res) {
  const { interviewId } = req.params;

  const interviewReport = await interviewReportModel.findOne({
    _id: interviewId,
    user: req.user.id,
  });

  if (!interviewReport) {
    return res.status(404).json({ message: "Interview report not found." });
  }

  res.status(200).json({
    message: "Interview report retrieved successfully.",
    interviewReport,
  });
}


async function getAllInterviewReportsByIdController(req, res) {
  const interviewReports = await interviewReportModel.find({
    user: req.user.id,
  }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGap -preparationPlan");

  res.status(200).json({
    message: "Interview reports retrieved successfully.",
    interviewReports,
  });
}

module.exports = { generateInterviewReportController, getInterviewReportController, getAllInterviewReportsByIdController };
