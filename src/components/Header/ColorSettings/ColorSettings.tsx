import './ColorSettings.css';

import { useState } from 'react';

const isValidHexColor = (color: string): boolean => {
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexRegex.test(color);
};

interface ColorSettingsProps {
    stepColors: {work: string, break: string};
    onChangeColor: (type: string, color: string) => void;
}

export default function ColorSettings({
    stepColors,
    onChangeColor
} : ColorSettingsProps) {

    const [inputValues, setInputValues] = useState<{work: string, break: string}>(stepColors);

    const handleInputChange = (type: keyof typeof stepColors, e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValues((prevValues) => ({
            ...prevValues,
            [type]: newValue
        }));
    };

    return (
        <div className='settingsSection'>
            <div className='settingsHeading settingsHeading2'>Change Step Colors</div>
            <div className='colorSettingsItemContainer'>
                {(Object.keys(stepColors) as Array<keyof typeof stepColors>).map((key) => {
                    const currentInputValue = inputValues[key];
                    const isInputValid = isValidHexColor(currentInputValue);

                    return (
                        <div key={key} className='colorSettingsItem'>
                            <div
                                className='colorSettingsBox'
                                style={{ backgroundColor: isInputValid ? currentInputValue : stepColors[key] }}
                            ></div>
                            <label htmlFor={`colorSettingsInput-${key}`}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                            <input
                                className={`colorSettingsInput ${!isInputValid ? 'invalid' : ''}`}
                                id={`colorSettingsInput-${key}`}
                                type='text'
                                value={currentInputValue}
                                onChange={(e) => handleInputChange(key, e)}
                            />
                            <button
                                onClick={() => onChangeColor(key, inputValues[key])}
                                disabled={!isInputValid}
                            >
                                Set
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}