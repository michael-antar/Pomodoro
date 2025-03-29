import './Timer.css';

import { useState, useEffect } from 'react';

import TimerDisplay from './components/TimerDisplay/TimerDisplay';
import IconButton from './components/IconButton/IconButton';
import StepDisplay from './components/StepDisplay/StepDisplay';

import { displayTime } from './utils/DisplayTime';

import playIcon from './assets/playIcon.svg';
import pauseIcon from './assets/pauseIcon.svg';
import redoIcon from './assets/redoIcon.svg';
import skipIcon from './assets/skipIcon.svg';
import restartIcon from './assets/restartIcon.svg';

const WORK_STEP = { name: 'pomodoro', duration: 15, color: '#FF6347' };
const SHORT_BREAK_STEP = { name: 'short break', duration: 3, color: '#27BAAE' };
const LONG_BREAK_STEP = { name: 'long break', duration: 6, color: '#34EBA4' };

const initialSteps = [
    {...WORK_STEP, id: 0},
    {...SHORT_BREAK_STEP, id: 1},
    {...WORK_STEP, id: 2},
    {...SHORT_BREAK_STEP, id: 3},
    {...WORK_STEP, id: 4},
    {...SHORT_BREAK_STEP, id: 5},
    {...WORK_STEP, id: 6},
    {...LONG_BREAK_STEP, id: 7}
];

export default function Timer() {
    const [stepIndex, setStepIndex] = useState(0);
    const [seconds, setSeconds] = useState(initialSteps[0].duration);

    const [isActive, setIsActive] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);


    useEffect(() => {
        if (!isActive) return;

        let localSeconds = seconds;

        const interval = setInterval(() => {
            localSeconds--;

            if (localSeconds <= 0) {
                clearInterval(interval);
                handleNextStep();
            }
            else {
                setSeconds(localSeconds);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isActive]);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.code === 'Space') {
                handleStartStop();
            } 
            else if (e.code === 'ArrowLeft') {
                handleRedo();
            } 
            else if (e.code === 'ArrowRight') {
                handleSkip();
            }
            else if (e.code === 'ArrowUp') {
                handleRestart();
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (isActive && !hasStarted) {
            setHasStarted(true);
        }
    }, [isActive]);

    useEffect(() => {
        setIsInitialized(true);
    }, []);


    function handleNextStep() {
        setHasStarted(false);
        setIsActive(false);

        setStepIndex((prevIndex) => {
            const newIndex = prevIndex + 1;

            if (newIndex >= initialSteps.length) {
                handleRestart();
                return 0;
            }

            setSeconds(initialSteps[newIndex].duration);

            return newIndex;
        });
    }

    function handleStartStop() {
        setIsActive(!isActive);
    }

    function handleRedo() {
        setSeconds(initialSteps[stepIndex].duration);
        setIsActive(false);
        setHasStarted(false);
    }

    function handleSkip() {
        handleNextStep();
    }

    function handleRestart() {
        setIsActive(false);
        setStepIndex(0);
        setSeconds(initialSteps[0].duration);
        setHasStarted(false);
    }


    const currentTitle = isInitialized
        ? hasStarted
            ? `${displayTime(seconds)} - ${initialSteps[stepIndex].name}`
            : `Start ${initialSteps[stepIndex].name}`
        : 'Pomodoro Timer';
    document.title = currentTitle;

    const totalDuration = initialSteps.reduce((sum, step) => {
        return sum + step.duration;
    }, 0);


    return (
        <div>
            <div id='timerBox'>
                <h2 id='currentStep' style={{backgroundColor: initialSteps[stepIndex].color}}>{initialSteps[stepIndex].name}</h2>
                <div id='innerTimeBox'>
                    <TimerDisplay seconds={seconds} />
                    
                    <div className='controlPanel'>
                        <IconButton iconSrc={redoIcon} alt="Redo Button" onClick={handleRedo} />
                        <IconButton iconSrc={playIcon} iconSrcAlt={pauseIcon} isToggled={isActive} alt="Play/Pause Button" onClick={handleStartStop} width={80} />
                        <IconButton iconSrc={skipIcon} alt="Skip Button" onClick={handleSkip} />
                    </div>
                </div>
            </div>

            <StepDisplay steps={initialSteps} activeIndex={stepIndex} totalDuration={totalDuration}/>

            <IconButton iconSrc={restartIcon} alt="Restart Button" onClick={handleRestart}/>
        </div>
    );
}