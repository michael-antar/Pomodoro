import { useState, useEffect } from 'react';

const WORK_STEP = { name: 'work', duration: 1500 };
const SHORT_BREAK_STEP = { name: 'short break', duration: 300 };
const LONG_BREAK_STEP = { name: 'long break', duration: 600 };

const initialSteps = [
    {...WORK_STEP, id: 1},
    {...SHORT_BREAK_STEP, id: 2},
    {...WORK_STEP, id: 3},
    {...SHORT_BREAK_STEP, id: 4},
    {...WORK_STEP, id: 5},
    {...SHORT_BREAK_STEP, id: 6},
    {...WORK_STEP, id: 7},
    {...SHORT_BREAK_STEP, id: 8},
    {...LONG_BREAK_STEP, id: 9}
];

function Timer() {
    const [steps, setSteps] = useState(initialSteps);
    const [seconds, setSeconds] = useState(initialSteps[0].duration);

    const [isActive, setIsActive] = useState(false);
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        if (!isActive || seconds <= 0) return;
    
        const interval = setInterval(() => {
            setSeconds((s) => {
                // Timer done
                if (s <= 1) {
                    clearInterval(interval);
                    nextStep();
                    return 0;
                }
                return s - 1;
            });
        }, 1000);
    
        return () => clearInterval(interval);
    }, [isActive]);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (!isDone) {
                if (e.code === 'Space') {
                    handleStartStop();
                } else if (e.code === 'ArrowLeft') {
                    handleRedo();
                } else if (e.code === 'ArrowRight') {
                    handleSkip();
                }
            }
            if (e.code === 'ArrowUp') {
                handleRestart();
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isActive, steps]);

    function nextStep() {
        setIsActive(false);
        setSteps([...steps.slice(1)]);
        if (steps.length > 1) {
            setSeconds(steps[1].duration);
        }
        else {
            setSeconds(0);
            setIsDone(true);
        }
    }

    function handleStartStop() {
        setIsActive(!isActive);
    }

    function handleRedo() {
        setSeconds(steps[0].duration);
        setIsActive(false);
    }

    function handleSkip() {
        nextStep();
    }

    function handleRestart() {
        setSteps(initialSteps);
        setSeconds(initialSteps[0].duration);
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
            <h1>{!isDone ? `Current Step: ${steps[0].name}` : "All Done"}</h1>
            <h1>Timer: {displayTime(seconds)}</h1>
            <button onClick={handleRedo} disabled={isDone}>Redo</button>
            <button onClick={handleStartStop} disabled={isDone}>
                {isActive ? "Stop" : "Start"}
            </button>
            <button onClick={handleSkip} disabled={isDone}>Skip</button>
            <h3>Remaining Steps</h3>
            <ol>
                {steps.slice(1).map(step => {
                    return <li key={step.id}>{step.name}</li>
                })}
            </ol>
            <button onClick={handleRestart}>Restart</button>
        </div>
    )
}

export default Timer;