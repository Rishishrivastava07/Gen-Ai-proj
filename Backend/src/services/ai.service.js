const { GoogleGenAI } = require("@google/genai");
require("dotenv").config(); 

const { z } = require("zod");


const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

const interviewReportSchema = z.object({
    matchScore: z.number().describe(
    "The match score between 0 and 100 indicating how well the candidate matches the job description",
    ),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "The technical questions that can be asked in the inteview",
          ),
        intention: z.string().describe("The intention of the Interviewer"),
        answer: z
          .string()
          .describe(
            "How to answer this question , what points to cover, what approach to take etc.",
          ),
      }),
    )
    .describe(
      "The technical questions that can be asked in the inteview, along with thier intention and how to answer them.",
    ),
  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "The technical questions that can be asked in the inteview",
          ),
        intention: z.string().describe("The intention of the Interviewer"),
        answer: z
          .string()
          .describe(
            "How to answer this question , what points to cover, what approach to take etc.",
          ),
      }),
    )
    .describe(
      "The Behavioral questions that can be asked in the inteview, along with thier intention and how to answer them.",
    ),
  skillGap: z
    .array(
      z.object({
        skill: z.string().describe("The skills which candidate is lacking"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe("The severity of the skill gap"),
      }),
    )
    .describe(
      "The skills which candidate is lacking, along with the severity of the skill gap.",
    ),
  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe(
            "The day number in the preparation plan, starting from 1",
          ),
        focus: z
          .string()
          .describe("The focus of the day in the preparation plan"),
        task: z.array(z.string())
          .describe(
            "The tasks to be completed in the day in the preparation plan",
          ),
      }),
    )
    .describe(
      "The preparation plan for the candidate, along with the day number, focus and tasks to be completed in the day.",
    ),
    title: z.string().describe("The title of the job for which the interview report is generated."),
});

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {

    const prompt = `Generate the interview report for a candidate with the follwing details:
    Resume: ${resume}
    Self Description: ${selfDescription}
    Job Description: ${jobDescription}`



  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: z.toJSONSchema(interviewReportSchema),
    },
  });

    const parsed = JSON.parse(response.text);
    const validated = interviewReportSchema.parse(parsed);
    return validated;
  
}

module.exports = generateInterviewReport;
