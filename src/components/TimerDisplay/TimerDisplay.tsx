import './TimerDisplay.css';

import IconButton from '../IconButton/IconButton';

import { displayTime } from "../../utils/DisplayTime";

import playIcon from '../../assets/playIcon.svg';
import pauseIcon from '../../assets/pauseIcon.svg';
import redoIcon from '../../assets/redoIcon.svg';
import skipIcon from '../../assets/skipIcon.svg';

export default function TimerDisplay(
    { seconds, stepColor, stepName, isActive, handleRedo, handleStartStop, handleSkip } 
    : { seconds: number; stepColor: string; stepName: string; isActive: boolean; handleRedo: () => void; handleStartStop: () => void; handleSkip: () => void}) {
    let ctr = 0;

    return (
        <div id='timerDisplay'>
            <h2 id='timerStep' style={{backgroundColor: stepColor}}>{stepName}</h2>
            <div id='innerTimer'>
                <div id="timeBox">
                    {displayTime(seconds).split('').map((char) => {
                        return <p className={char === ':' ? "colon" : "digit"} key={ctr++}>{char}</p>
                    })}
                </div>
                <div id='timerControls'>
                    <IconButton iconSrc={redoIcon} alt="Redo Button" onClick={handleRedo} />
                    <IconButton iconSrc={playIcon} iconSrcAlt={pauseIcon} isToggled={isActive} alt="Play/Pause Button" onClick={handleStartStop} width={80} />
                    <IconButton iconSrc={skipIcon} alt="Skip Button" onClick={handleSkip} />
                </div>
            </div>
        </div>
    );
}