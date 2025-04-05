import './DurationInput.css';

import { useState, useEffect } from 'react';

interface DurationInputProps {
    stepId: number;
    initialDuration: number;
    onChangeDuration: (stepId: number, duration: number) => void;
    name: string;
}

export default function DurationInput({
    stepId,
    initialDuration,
    onChangeDuration,
    name
} : DurationInputProps) {

    const [displayValue, setDisplayValue] = useState<string>(String(initialDuration));

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        setDisplayValue(inputValue);

        let numericDuration = 1;

        if (inputValue !== "") {
            const parsedValue = parseInt(inputValue);
            if (!isNaN(parsedValue) && parsedValue > 0) {
                numericDuration = parsedValue;
            }
        }

        onChangeDuration(stepId, numericDuration);
    }

    useEffect(() => {
        const currentNumericValue = parseInt(displayValue);

        if (displayValue === "" || isNaN(currentNumericValue) || currentNumericValue !== initialDuration) {
            if (initialDuration !== 1 || (initialDuration === 1 && displayValue !== "")) {
                setDisplayValue(String(initialDuration));
            }
        }
    }, [initialDuration]);

    return (
        <input
            className='durationInput'
            type='number'
            name={name}
            value={displayValue}
            onChange={handleInputChange}
            min='1'
            placeholder='1'
        />
    );
}