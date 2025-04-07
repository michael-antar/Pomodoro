import './Timer.css';

import { useState, useEffect, useRef } from 'react';

import Header from './components/Header/Header';
import TimerDisplay from './components/TimerDisplay/TimerDisplay';
import StepDisplay from './components/StepDisplay/StepDisplay';

import { displayTime } from './utils/DisplayTime';

import { initialSteps } from './data/stepData';

import buttonSound from './assets/buttonSound.mp3';
import alarmSound from './assets/alarmSound.mp3';

type Step = { name: string; duration: number; color: string; id: number};


export default function Timer() {
    const [steps, setSteps] = useState(initialSteps);
    const nextId = useRef(8);
    const [stepIndex, setStepIndex] = useState(0);
    const [seconds, setSeconds] = useState(steps[0].duration);

    const [isActive, setIsActive] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    const [buttonVolume, setButtonVolume] = useState(0.3);
    const [alarmVolume, setAlarmVolume] = useState(0.3);

    const buttonSoundRef = useRef<HTMLAudioElement | null>(null);
    const alarmSoundRef = useRef<HTMLAudioElement | null>(null);


    const playButtonSound = () => {
        if (buttonSoundRef.current) {
            buttonSoundRef.current.currentTime = 0;
            buttonSoundRef.current.play();
        }
    }

    const handleButtonVolume = (volume: number) => {
        const newVolume = Math.max(0, Math.min(1, volume));
        setButtonVolume(newVolume);
    }

    const playAlarmSound = () => {
        if (alarmSoundRef.current) {
            alarmSoundRef.current.currentTime = 0;
            alarmSoundRef.current.play();
        }
    }

    const handleAlarmVolume = (volume: number) => {
        const newVolume = Math.max(0, Math.min(1, volume));
        setAlarmVolume(newVolume);
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

    const resetTimer = () => {
        setIsActive(false);
        setStepIndex(0);
        setSeconds(steps[0].duration);
        setHasStarted(false);
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
        resetTimer();
    }

    const handleChangeDuration = (stepId: number, duration: number) => {

        const nextSteps = steps.map((step) => {
            if (step.id === stepId) {
                return {
                    ...step,
                    duration: duration
                }
            }
            else {
                return step;
            }
        });
        setSteps(nextSteps);
    }

    const handleAddStep = (name: string) => {
        const color = name === 'pomodoro' ? '#FF6347' : '#27BAAE';
        const duration = name === 'pomodoro' ? 15 : 6;
        setSteps(
            [...steps,
            { name: name, duration: duration, color: color, id: nextId.current}]
        );
        nextId.current += 1;
    }

    const handleRemoveStep = (removedId: number) => {
        setSteps(
            steps.filter((step) => {
                return step.id !== removedId;
            })
        );
    }

    const handleReorderSteps = (newSteps: Step[]) => {
        setSteps(newSteps);
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
        resetTimer();
    }, [steps])

    useEffect(() => {
        if (isActive && !hasStarted) {
            setHasStarted(true);
        }
    }, [isActive]);

    useEffect(() => {
        setIsInitialized(true);
    }, []);

    // Initializing audios with volumes
    useEffect(() => {
        buttonSoundRef.current = new Audio(buttonSound);
        buttonSoundRef.current.volume = buttonVolume;

        alarmSoundRef.current = new Audio(alarmSound);
        alarmSoundRef.current.volume = alarmVolume;
    }, [])

    useEffect(() => {
        if (buttonSoundRef.current) {
            buttonSoundRef.current.volume = buttonVolume;
        }
    }, [buttonVolume]);

    useEffect(() => {
        if (alarmSoundRef.current) {
            alarmSoundRef.current.volume = alarmVolume;
        }
    }, [alarmVolume]);


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
        <>
            <Header 
                steps={steps} 
                handleRestart={handleRestart}
                handleAddStep={handleAddStep}
                handleRemoveStep={handleRemoveStep}
                handleReorderSteps={handleReorderSteps}
                handleChangeDuration={handleChangeDuration}
                playButtonSound={playButtonSound}
                playAlarmSound={playAlarmSound}
                buttonVolume={buttonVolume}
                alarmVolume={alarmVolume}
                onChangeButtonVolume={handleButtonVolume}
                onChangeAlarmVolume={handleAlarmVolume}
            />

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
        </>
    );
}