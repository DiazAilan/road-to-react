import { useEffect, useRef } from "react";

export function useUpdatedEffect(callback: Function, dependencies: any[]): void {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      callback();
    }
  }, dependencies)
}
