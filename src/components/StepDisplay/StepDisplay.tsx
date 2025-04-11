import './StepDisplay.css'

import { Step } from '../../types';

interface StepDisplayProps {
    steps: Step[];
    stepColors: {work: string, break: string};
    activeIndex: number; 
    seconds: number; 
    totalDuration: number;
}

export default function StepDisplay({ 
    steps,
    stepColors,
    activeIndex, 
    seconds, 
    totalDuration 
} : StepDisplayProps) {
    
    return (
        <div id="stepDisplay">
            <div id="stepDisplayRow">
                <h2 id="stepDisplayTitle">Steps</h2>
                <div id="progressBarContainer">
                    <div id="progressBar" style={{width: `${(1 - seconds / steps[activeIndex].duration) * 100}%`}}></div>
                </div>
            </div>
            
            <div id="stepItemContainer">
                {steps.map((step, index) => {
                    return (
                        <div 
                            className={`stepItem${index === activeIndex ? " active" : ""}`}
                            style={{width: `${step.duration / totalDuration * 100}%`, backgroundColor: stepColors[step.type as keyof typeof stepColors]}}
                            key={step.id}
                        >
                        </div>
                    );
                })}
            </div>
        </div>
    );
}