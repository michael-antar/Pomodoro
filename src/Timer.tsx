import './Timer.css';

import { useState, useEffect } from 'react';

import TimerDisplay from './components/TimerDisplay/TimerDisplay';
import IconButton from './components/IconButton/IconButton';
import StepDisplay from './components/StepDisplay/StepDisplay';

import { displayTime } from './utils/DisplayTime';

import { steps } from './data/stepData';

import playIcon from './assets/playIcon.svg';
import pauseIcon from './assets/pauseIcon.svg';
import redoIcon from './assets/redoIcon.svg';
import skipIcon from './assets/skipIcon.svg';
import restartIcon from './assets/restartIcon.svg';



export default function Timer() {
    const [stepIndex, setStepIndex] = useState(0);
    const [seconds, setSeconds] = useState(steps[0].duration);

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

            if (newIndex >= steps.length) {
                handleRestart();
                return 0;
            }

            setSeconds(steps[newIndex].duration);

            return newIndex;
        });
    }

    function handleStartStop() {
        setIsActive(!isActive);
    }

    function handleRedo() {
        setSeconds(steps[stepIndex].duration);
        setIsActive(false);
        setHasStarted(false);
    }

    function handleSkip() {
        handleNextStep();
    }

    function handleRestart() {
        setIsActive(false);
        setStepIndex(0);
        setSeconds(steps[0].duration);
        setHasStarted(false);
    }


    const currentTitle = isInitialized
        ? hasStarted
            ? `${displayTime(seconds)} - ${steps[stepIndex].name}`
            : `Start ${steps[stepIndex].name}`
        : 'Pomodoro Timer';
    document.title = currentTitle;

    const totalDuration = steps.reduce((sum, step) => {
        return sum + step.duration;
    }, 0);


    return (
        <div>
            <div id='timerBox'>
                <h2 id='currentStep' style={{backgroundColor: steps[stepIndex].color}}>{steps[stepIndex].name}</h2>
                <div id='innerTimeBox'>
                    <TimerDisplay seconds={seconds} />
                    
                    <div className='controlPanel'>
                        <IconButton iconSrc={redoIcon} alt="Redo Button" onClick={handleRedo} />
                        <IconButton iconSrc={playIcon} iconSrcAlt={pauseIcon} isToggled={isActive} alt="Play/Pause Button" onClick={handleStartStop} width={80} />
                        <IconButton iconSrc={skipIcon} alt="Skip Button" onClick={handleSkip} />
                    </div>
                </div>
            </div>

            <StepDisplay steps={steps} activeIndex={stepIndex} seconds={seconds} totalDuration={totalDuration}/>

            <IconButton iconSrc={restartIcon} alt="Restart Button" onClick={handleRestart}/>
        </div>
    );
}