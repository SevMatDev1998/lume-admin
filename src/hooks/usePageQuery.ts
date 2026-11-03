import { useState, useEffect, useCallback } from 'react';

export function useQueryParameter(paramName: string, onChange: (value: any) => void) {
  const [paramValue, setParamValue] = useState<string | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const value = url.searchParams.get(paramName);
    setParamValue(value);
    onChange(value);
  }, [paramName, onChange]);

  const updateQueryParameter = useCallback((newValue: any) => {
    const url = new URL(window.location.href);

    if (newValue) {
      url.searchParams.set(paramName, newValue); // Set the parameter in the URL
    } else {
      url.searchParams.delete(paramName); // Remove the parameter if newValue is null
    }

    window.history.pushState({}, '', url.toString()); // Update the browser history
    setParamValue(newValue); // Update the state
    onChange(newValue); // Trigger the callback with the new value
  }, [paramName, onChange]);

  return { paramValue, updateQueryParameter };
}
