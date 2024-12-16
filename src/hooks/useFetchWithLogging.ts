import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const getTimestamp = () => new Date().toISOString();

const saveApiLogToLocalStorage = (logMessage: string, response: Response, result: unknown) => {
    const timestamp = getTimestamp();
    const apiResponseLog = {
        timestamp,
        message: 'API Request: Successful',
        status: response.status,
        data: result,
    };

    console.log(apiResponseLog);

    const previousLogs = JSON.parse(localStorage.getItem('apiResponseLogs') || '[]');

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

const fetchAndLogData = async <T>(
    url: string,
    logMessage: string,
    setStatus: (status: number) => void,
    setData: Dispatch<SetStateAction<T | null>>,
    setError: Dispatch<SetStateAction<Error | null>>
) => {
    try {
        const response = await fetch(url);
        setStatus(response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result: T = await response.json();
        saveApiLogToLocalStorage(logMessage, response, result);
        setData(result);
    } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        const timestamp = getTimestamp();
        console.error('Failed to fetch data:', err);
        console.log({ timestamp, message: 'API Request: Request failed', payload: err });
    }
};

const useFetchWithLogging = <T>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState<number | null>(null);

    useEffect(() => {
        const startFetching = () => {
            setIsLoading(true);
            const timestamp = getTimestamp();
            const logMessage = { timestamp, message: 'API Request: Fetching data', payload: url };
            console.log(logMessage);

            fetchAndLogData(url, JSON.stringify(logMessage), setStatus, setData, setError).finally(() => setIsLoading(false));
        };

        startFetching();
    }, [url]);

    return { data, error, isLoading, status };
};

export default useFetchWithLogging;
