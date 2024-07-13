import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    if (!url) return;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setisLoading(() => {
          !isLoading;
        });
      })
      .catch((error) => {
        setError(error);
        setisLoading(() => {
          !isLoading;
        });
      });
  }, [url]);

  return { data, error, isLoading };
}
