import { useState, useEffect } from 'react';

const START_TIME = 5;

function Timer() {
    const [seconds, setSeconds] = useState(START_TIME);
    const [isActive, setIsActive] = useState(false);
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        if (!isActive || seconds <= 0) return;
    
        const interval = setInterval(() => {
            setSeconds((s) => {
                if (s <= 1) {
                    clearInterval(interval);
                    setIsActive(false);
                    setIsDone(true);
                    return 0;
                }
                return s - 1;
            });
        }, 1000);
    
        return () => clearInterval(interval);
    }, [isActive]);

    function handleStartStop() {
        setIsActive(!isActive);
    }

    function handleReset() {
        setSeconds(START_TIME);
        setIsActive(false);
        setIsDone(false);
    }

    function displayTime(seconds: number) {
        const mm = (seconds < 600 ? '0' : '') + (Math.floor(seconds / 60));
        const ss = ((seconds % 60) < 10 ? '0' : '') + (seconds % 60);
        return `${mm}:${ss}`;
    }

    return (
        <div>
            <h1>Timer: {displayTime(seconds)}</h1>
            <button onClick={handleStartStop}>
                {isActive ? "Stop" : "Start"}
            </button>
            <button onClick={handleReset}>Reset</button>
            <h2>{isDone ? "DONE" : ""}</h2>
        </div>
    )
}

export default Timer;