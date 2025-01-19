import { useEffect, useState } from 'react';
import interceptorInstance from './interceptor';
import { AxiosError } from 'axios';  // Import AxiosError



type ResponseData = {
  // Define the actual structure of your response data here
  id: number;
  name: string;
};

export const useAxios = (url: string) => {
  const [data, setData] = useState<ResponseData | null>(null); //useState(null); 
  const [error, setError] = useState<AxiosError | null>(null); // <-- Accept AxiosError or null //useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await interceptorInstance.get<ResponseData>(url);
        setData(response.data);
      } catch (err) {
        // Cast the error to AxiosError to access its properties
        const axiosError = err as AxiosError;
        setError(axiosError);  // Set the error state to AxiosError
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};
