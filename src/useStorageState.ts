import { useState, useEffect, useRef } from "react";

export function useStorageState(key: string, initialState: string): [string, Function] {
  const isMounted = useRef(false);
  
  const [value, setValue] = useState(
    localStorage.getItem(key) ?? initialState
  )

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      localStorage.setItem(key, value);
    }
  }, [value, key])

  return [value, setValue]
}