import { useEffect, useState } from "react";

function useDebounceValue(value, time = 550) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, time);

    return () => {
      clearTimeout(timer);
    };
  }, [value, time]);

  return debounceValue;
}

export default useDebounceValue;
