import './TimerDisplay.css';
import { displayTime } from "../../utils/DisplayTime";

export default function TimerDisplay({ seconds } : { seconds: number;}) {
    let ctr = 0;

    return (
        <div id="timerDisplay">
            {displayTime(seconds).split('').map((char) => {
                return <p className={char === ':' ? "colon" : "digit"} key={ctr++}>{char}</p>
            })}
        </div>
    );
}