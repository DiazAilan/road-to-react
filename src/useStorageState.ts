import { useState } from "react";
import { useUpdatedEffect } from "./useUpdatedEffect";

export function useStorageState(
  key: string,
  initialState: string
): [string, (newValue: string) => void] {  
  const [value, setValue] = useState(
    localStorage.getItem(key) ?? initialState
  )

  useUpdatedEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key])

  return [value, setValue]
}