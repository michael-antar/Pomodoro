import './Timer.css';

import { useState, useEffect } from 'react';

import TimerDisplay from './components/TimerDisplay/TimerDisplay';
import IconButton from './components/IconButton/IconButton';
import StepList from './components/StepList/StepList';

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
    {...WORK_STEP, id: 1},
    {...SHORT_BREAK_STEP, id: 2},
    {...WORK_STEP, id: 3},
    {...SHORT_BREAK_STEP, id: 4},
    {...WORK_STEP, id: 5},
    {...SHORT_BREAK_STEP, id: 6},
    {...WORK_STEP, id: 7},
    {...LONG_BREAK_STEP, id: 8}
];

export default function Timer() {
    const [steps, setSteps] = useState(initialSteps);
    const [seconds, setSeconds] = useState(initialSteps[0].duration);
    const [stepColor, setStepColor] = useState(initialSteps[0].color);

    const [title, setTitle] = useState('Pomodoro Timer');

    const [isActive, setIsActive] = useState(false);

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
        document.title = title;
    }, [title])

    function nextStep() {
        if (steps.length === 1) {
            handleRestart();
            return;
        }

        setIsActive(false);

        setSteps([...steps.slice(1)]);

        setSeconds(steps[1].duration);
        setTitle(`Start ${steps[1].name}`);
        setStepColor(steps[1].color);
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
        setIsActive(false);
        setSteps(initialSteps);
        setSeconds(initialSteps[0].duration);
        setTitle(`Start ${initialSteps[0].name}`);
        setStepColor(initialSteps[0].color);
    }

    return (
        <div>
            <div id='timerBox'>
                <h2 id='currentStep' style={{backgroundColor: stepColor}}>{steps[0].name}</h2>
                <div id='innerTimeBox'>
                    <TimerDisplay seconds={seconds} />
                    
                    <div className='controlPanel'>
                        <IconButton iconSrc={redoIcon} alt="Redo Button" onClick={handleRedo} />
                        <IconButton iconSrc={playIcon} iconSrcAlt={pauseIcon} isToggled={isActive} alt="Play/Pause Button" onClick={handleStartStop} width={80} />
                        <IconButton iconSrc={skipIcon} alt="Skip Button" onClick={handleSkip} />
                    </div>
                </div>
            </div>

            <StepList steps={steps.slice(1)}/>

            <IconButton iconSrc={restartIcon} alt="Restart Button" onClick={handleRestart}/>
        </div>
    );
}