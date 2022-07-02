import { useState, useCallback } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (req, transformData) => {
    setIsLoading(true);
    let response;
    try {
      response = await fetch(req.url, {
        body: req.body ? JSON.stringify(req.body) : null,
        headers: req.headers ? req.headers : {},
        method: req.method ? req.method : 'GET',
      });
    } catch (errorResponse) {
      console.log('error http');
      setIsLoading(false);
      setError(errorResponse.message);
      return;
    }

    // if (!response.ok) {
    //   //throw new Error('Something went wrong!');
    //   console.log('error http');
    //   setIsLoading(false);
    //   setHasError(true);
    //   return;
    // }

    const data = await response.json();
    transformData(data);

    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
