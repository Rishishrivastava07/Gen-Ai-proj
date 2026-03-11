import {getInterviewReportById, generateInterviewReport, getAllInterviewReports} from '../services/interview.api';
import { InterviewContext } from "../Interview.context.jsx";
import { useContext } from "react";

export const useInterview = () => { 

    const context = useContext(InterviewContext);
    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider");
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context;

    const generatereport = async({ jobDescription, resumeFile, selfDescription }) => {
        setLoading(true);
        try{
            const newReport = await generateInterviewReport({ jobDescription, resumeFile, selfDescription });
            setReport(newReport.interviewReport);
            return newReport.interviewReport;
        } catch (error) {
            console.error("Error generating interview report:", error);
            return null;
        } finally {
            setLoading(false);
        }
    }

    const getReportById = async (interviewId) => {
        setLoading(true);
        try {
            const data = await getInterviewReportById(interviewId);
            setReport(data.interviewReport);
        } catch (error) {
            console.error("Error fetching interview report:", error);
        } finally {
            setLoading(false);
        }
    }

    const getAllReports = async () => {
        setLoading(true);
        try {
            const data = await getAllInterviewReports();
            setReports(data.interviewReports);
        } catch (error) {
            console.error("Error fetching interview reports:", error);
        } finally {
            setLoading(false);
        }
    }

   return { loading, report, reports, generatereport, getReportById, getAllReports };
}
