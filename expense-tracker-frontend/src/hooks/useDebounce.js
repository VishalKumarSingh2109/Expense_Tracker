import { useState, useEffect } from 'react';

// Delays updating the returned value until `delay` ms have passed
// without the input changing again - used to avoid firing an API
// call on every single keystroke in the search box.
export default function useDebounce(value, delay = 400) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}