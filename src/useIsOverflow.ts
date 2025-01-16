import { RefObject, useLayoutEffect, useState } from "react";

export const useIsOverflow = (ref: RefObject<HTMLElement>, callback?: (isOverflow: boolean) => void) => {
  const [isOverflow, setIsOverflow] = useState(false);

  useLayoutEffect(() => {
    const { current } = ref;

    const trigger = () => {
      const hasOverflow = current!.scrollHeight > current!.clientHeight;

      setIsOverflow(hasOverflow);

      if (callback) {
        callback(hasOverflow);
      }
    };

    if (current) {
      if ('ResizeObserver' in window) {
        new ResizeObserver(trigger).observe(current);
      }
      
      trigger();
    }
  }, [callback, ref]);

  return isOverflow;
};