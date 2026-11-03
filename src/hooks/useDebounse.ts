import {  useRef, useEffect, useCallback } from 'react';


export function useLazyDebounce(){
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // A debounced setter function
  const setLazyValue = useCallback((cb:()=>void,delay:number) => {
    // Clear any existing timer
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Start a new timer
    timeoutRef.current = setTimeout(() => {
        cb()
    }, delay);
  }, []);

  // Cleanup any pending timeout when the component unmounts or on re-renders
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return setLazyValue;
}
