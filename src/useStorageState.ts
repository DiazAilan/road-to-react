import { useState, useEffect } from "react";

export function useStorageState(key:string, initialState: string): [string, Function] {
  const [value, setValue] = useState(
    localStorage.getItem(key) ?? initialState
  )
    
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key])

  return [value, setValue]
}