import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/auth.context.js";

export const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState( null);
    const [reports, setReports] = useState([]);

    useEffect(() => {
        setReport(null);
        setReports([]);
    }, [user]);

    return (
        <InterviewContext.Provider value={{ loading, setLoading, report, setReport, reports, setReports }}>
            {children}
        </InterviewContext.Provider>
    );
};
