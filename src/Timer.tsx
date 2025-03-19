import { useState, useEffect } from 'react';

import playIcon from './assets/play.svg';
import pauseIcon from './assets/pause.svg';
import redoIcon from './assets/redo.svg';
import skipIcon from './assets/skip.svg';
import restartIcon from './assets/restart.svg';

const WORK_STEP = { name: 'work', duration: 15 };
const SHORT_BREAK_STEP = { name: 'short break', duration: 3 };
const LONG_BREAK_STEP = { name: 'long break', duration: 6 };

const initialSteps = [
    {...WORK_STEP, id: 1},
    {...SHORT_BREAK_STEP, id: 2},
    {...WORK_STEP, id: 3},
    {...SHORT_BREAK_STEP, id: 4},
    {...WORK_STEP, id: 5},
    {...SHORT_BREAK_STEP, id: 6},
    {...WORK_STEP, id: 7},
    {...LONG_BREAK_STEP, id: 8}
];

function Timer() {
    const [steps, setSteps] = useState(initialSteps);
    const [seconds, setSeconds] = useState(initialSteps[0].duration);

    const [isActive, setIsActive] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const [title, setTitle] = useState('Pomodoro Timer');
    const [bgColor, setBgColor] = useState('white');

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
                setTitle(`${displayTime(s - 1)} - ${steps[0].name}`);
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

    useEffect(() => {
        document.title = title;
    }, [title])

    useEffect(() => {
        document.body.style.backgroundColor = bgColor;
    }, [bgColor]);

    function nextStep() {
        setIsActive(false);
        setSteps([...steps.slice(1)]);

        if (steps.length > 1) {
            setSeconds(steps[1].duration);

            setTitle(`Start ${steps[1].name}`);
        }
        else {
            setSeconds(0);
            setIsDone(true);

            setTitle('All done');
        }

        setBgColor(() => {
            if (steps.length <= 1) {
                return "white"
            }
            if (steps[1].name === "work") {
                return "red";
            }
            else if (steps[1].name === "short break") {
                return "lightblue";
            }
            else if (steps[1].name === "long break") {
                return "blue";
            }
            return "white";
        })
    }

    function handleStartStop() {
        setIsActive(!isActive);
    }

    function handleRedo() {
        setSeconds(steps[0].duration);
        setTitle(`Start ${steps[0].name}`);
        setIsActive(false);
    }

    function handleSkip() {
        nextStep();
    }

    function handleRestart() {
        setSteps(initialSteps);
        setSeconds(initialSteps[0].duration);
        setTitle(`Start ${initialSteps[0].name}`);
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
            <button onClick={handleRedo} disabled={isDone}>
                <img src={redoIcon} alt="Redo" width="30" height="30" />
            </button>
            <button onClick={handleStartStop} disabled={isDone}>
                {isActive 
                    ? <img src={pauseIcon} alt="Pause" width="70" height="50" /> 
                    : <img src={playIcon} alt="Play" width="70" height="50" />
                }
            </button>
            <button onClick={handleSkip} disabled={isDone}>
                <img src={skipIcon} alt="Skip" width="30" height="30" />
            </button>
            <h3>Remaining Steps</h3>
            <ol>
                {steps.slice(1).map(step => {
                    return <li key={step.id}>{step.name}</li>
                })}
            </ol>
            <button onClick={handleRestart}>
                <img src={restartIcon} alt="Restart" width="30" height="30" />
            </button>
        </div>
    )
}

export default Timer;