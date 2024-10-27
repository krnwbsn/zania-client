import { useEffect, useRef } from 'react';

const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      const intervalId = setInterval(() => {
        if (savedCallback.current) savedCallback.current();
      }, delay);
      return () => clearInterval(intervalId);
    }
  }, [delay]);
};

export default useInterval;
