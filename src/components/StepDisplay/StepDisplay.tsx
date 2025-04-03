import './StepDisplay.css'

import { Step } from '../../types';

interface StepDisplayProps {
    steps: Step[];
    activeIndex: number; 
    seconds: number; 
    totalDuration: number;
}

export default function StepDisplay({ 
    steps, 
    activeIndex, 
    seconds, 
    totalDuration 
} : StepDisplayProps) {
    
    return (
        <div id="stepDisplay">
            <div id="stepDisplayRow">
                <h2 id="stepDisplayTitle">Steps</h2>
                <div id="progressBarContainer">
                    <div id="progressBar" style={{width: `${(1 - seconds / steps[activeIndex].duration) * 100}%`, backgroundColor: steps[activeIndex].color}}></div>
                </div>
            </div>
            
            <div id="stepItemContainer">
                {steps.map((step, index) => {
                    return <div 
                            className={`stepItem${index === activeIndex ? " active" : ""}`}
                            style={{width: `${step.duration / totalDuration * 100}%`, backgroundColor: step.color}}
                            key={step.id}
                        >
                        </div>
                })}
            </div>
        </div>
    );
}