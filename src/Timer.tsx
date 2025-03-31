import './Timer.css';

import { useState, useEffect, useRef } from 'react';

import TimerDisplay from './components/TimerDisplay/TimerDisplay';
import IconButton from './components/IconButton/IconButton';
import StepDisplay from './components/StepDisplay/StepDisplay';

import { displayTime } from './utils/DisplayTime';

import { steps } from './data/stepData';

import restartIcon from './assets/restartIcon.svg';
import buttonSound from './assets/buttonSound.mp3';
import alarmSound from './assets/alarmSound.mp3';


export default function Timer() {
    const [stepIndex, setStepIndex] = useState(0);
    const [seconds, setSeconds] = useState(steps[0].duration);

    const [isActive, setIsActive] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    const buttonSoundRef = useRef<HTMLAudioElement | null>(null);
    const alarmSoundRef = useRef<HTMLAudioElement | null>(null);


    const playButtonSound = () => {
        if (!buttonSoundRef.current) {
            buttonSoundRef.current = new Audio(buttonSound);
            buttonSoundRef.current.volume = 0.3;
        }
        if (buttonSoundRef.current) {
            buttonSoundRef.current.currentTime = 0;
            buttonSoundRef.current.play();
        }
    }

    const playAlarmSound = () => {
        if (!alarmSoundRef.current) {
            alarmSoundRef.current = new Audio(alarmSound);
            alarmSoundRef.current.volume = 0.3;
        }
        if (alarmSoundRef.current) {
            alarmSoundRef.current.currentTime = 0;
            alarmSoundRef.current.play();
        }
    }

    const handleNextStep = () => {
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

    const handleStartStop = () => {
        playButtonSound();
        setIsActive(!isActive);
    }

    const handleRedo = () => {
        playButtonSound();
        setSeconds(steps[stepIndex].duration);
        setIsActive(false);
        setHasStarted(false);
    }

    const handleSkip = () => {
        playButtonSound();
        handleNextStep();
    }

    const handleRestart = () => {
        playButtonSound();
        setIsActive(false);
        setStepIndex(0);
        setSeconds(steps[0].duration);
        setHasStarted(false);
    }

    // Count down time
    useEffect(() => {
        if (!isActive) return;

        let localSeconds = seconds;

        const interval = setInterval(() => {
            localSeconds--;

            if (localSeconds <= 0) {
                playAlarmSound();
                clearInterval(interval);
                handleNextStep();
            }
            else {
                setSeconds(localSeconds);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isActive]);

    // Add keybindings
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.code === 'Space') {
                const focusedElement = document.activeElement;

                if (focusedElement && focusedElement.tagName === 'BUTTON') {
                    return;
                }

                e.preventDefault();
                handleStartStop();
            } 
            else if (e.code === 'ArrowLeft') {
                e.preventDefault();
                handleRedo();
            } 
            else if (e.code === 'ArrowRight') {
                e.preventDefault();
                handleSkip();
            }
            else if (e.code === 'ArrowUp') {
                e.preventDefault();
                handleRestart();
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleStartStop, handleRedo, handleSkip, handleRestart]);

    useEffect(() => {
        if (isActive && !hasStarted) {
            setHasStarted(true);
        }
    }, [isActive]);

    useEffect(() => {
        setIsInitialized(true);
    }, []);


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
            <TimerDisplay 
                seconds={seconds}
                stepColor={steps[stepIndex].color}
                stepName={steps[stepIndex].name}
                isActive={isActive}
                handleRedo={handleRedo}
                handleStartStop={handleStartStop}
                handleSkip={handleSkip}
            />

            <StepDisplay 
                steps={steps} 
                activeIndex={stepIndex} 
                seconds={seconds} 
                totalDuration={totalDuration}
            />

            <IconButton iconSrc={restartIcon} alt="Restart Button" onClick={handleRestart}/>
        </div>
    );
}