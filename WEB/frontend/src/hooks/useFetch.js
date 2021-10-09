import { useState, useEffect } from 'react';

const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    async function fetchData() {
      fetch(url, { signal: abortCont.signal, ...options })
        .then((res) => {
          if (!res.ok)
            throw Error('could not fetch the data for that resource');
          return res.json();
        })
        .then((data) => {
          setData(data);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          console.log(err.message);
          if (err.name !== 'AbortError') {
            setIsPending(false);
            setError(err.message);
          }
        });
    }

    fetchData();
    return () => abortCont.abort();
  }, [url, options]);

  return { data, isPending, error };
};

export default useFetch;
