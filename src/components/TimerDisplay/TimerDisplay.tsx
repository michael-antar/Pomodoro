import './TimerDisplay.css';

import TimerButton from './TimerButton/TimerButton';

import { displayTime } from "../../utils/DisplayTime";

import playIcon from '../../assets/playIcon.svg';
import pauseIcon from '../../assets/pauseIcon.svg';
import redoIcon from '../../assets/redoIcon.svg';
import skipIcon from '../../assets/skipIcon.svg';

interface TimerDisplayProps {
    seconds: number; 
    stepColor: string; 
    stepType: string; 
    isActive: boolean; 
    handleRedo: () => void; 
    handleStartStop: () => void; 
    handleSkip: () => void
}

export default function TimerDisplay({ 
    seconds, 
    stepColor, 
    stepType, 
    isActive, 
    handleRedo, 
    handleStartStop, 
    handleSkip
} : TimerDisplayProps) {
    
    let ctr = 0;

    return (
        <div id='timerDisplay'>
            <h2 id='timerTitle' style={{backgroundColor: stepColor}}>{stepType}</h2>
            <div id='innerTimer'>
                <div id="timeBox">
                    {displayTime(seconds).split('').map((char) => {
                        return <p className={char === ':' ? "colon" : "digit"} key={ctr++}>{char}</p>
                    })}
                </div>
                <div id='timerControls'>
                    <TimerButton
                        onClick={handleRedo}
                        tooltip='Press left arrow to redo step'
                        style={{width: '60px'}}
                        iconSrc={redoIcon} 
                        alt="Redo Button" 
                    />
                    <TimerButton 
                        onClick={handleStartStop}
                        tooltip='Press space to play/pause step'
                        style={{width: '80px'}}
                        iconSrc={playIcon} 
                        iconSrcAlt={pauseIcon} 
                        isToggled={isActive} 
                        alt="Play/Pause Button" 
                    />
                    <TimerButton
                        onClick={handleSkip}
                        tooltip='Press right arrow to skip step'
                        style={{width: '60px'}}
                        iconSrc={skipIcon} 
                        alt="Skip Button" 
                    />
                </div>
            </div>
        </div>
    );
}