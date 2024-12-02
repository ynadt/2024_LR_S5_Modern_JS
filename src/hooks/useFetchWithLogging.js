import { useEffect, useState } from 'react';

const getTimestamp = () => new Date().toISOString();

const saveApiLogToLocalStorage = (logMessage, response, result) => {
    const timestamp = getTimestamp();
    const apiResponseLog = {
        timestamp,
        message: 'API Request: Successful',
        status: response.status,
        data: result,
    };

    console.log(apiResponseLog);

    const previousLogs = JSON.parse(localStorage.getItem('apiResponseLogs')) || [];

    const newLogEntry = {
        request: logMessage,
        response: {
            status: response.status,
            body: result,
            timestamp,
        },
    };

    const updatedLogs = [...previousLogs, newLogEntry];
    localStorage.setItem('apiResponseLogs', JSON.stringify(updatedLogs));
};

const fetchAndLogData = async (url, logMessage, setStatus, setData, setError) => {
    try {
        const response = await fetch(url);
        setStatus(response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        saveApiLogToLocalStorage(logMessage, response, result);
        setData(result);
    } catch (err) {
        setError(err);
        const timestamp = getTimestamp();
        console.error('Failed to fetch data:', err);
        console.log({ timestamp, message: 'API Request: Request failed', payload: err });
    }
};

const useFetchWithLogging = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const startFetching = () => {
            setIsLoading(true);
            const timestamp = getTimestamp();
            const logMessage = { timestamp, message: 'API Request: Fetching data', payload: url };
            console.log(logMessage);

            fetchAndLogData(url, logMessage, setStatus, setData, setError).finally(() => setIsLoading(false));
        };

        startFetching();
    }, [url]);

    return { data, error, isLoading, status };
};

export default useFetchWithLogging;
