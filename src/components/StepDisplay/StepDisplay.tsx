import './StepDisplay.css'

export default function StepDisplay( 
    { steps, activeIndex, seconds, totalDuration }
    : { steps: { name: string; duration: number; color: string; id: number; }[]; activeIndex: number; seconds: number; totalDuration: number; }) {
    return (
        <div id="stepDisplay">
            <div id="stepDisplayRow">
                <h2 id="stepDisplayTitle">Steps</h2>
                <div id="progressBarContainer">
                    <div id="progressBar" style={{width: `${(1 - seconds / steps[activeIndex].duration) * 100}%`, backgroundColor: steps[activeIndex].color}}></div>
                </div>
            </div>
            
            <div id="stepItemContainer">
                {steps.map(step => {
                    return <div 
                            className={`stepItem${step.id === activeIndex ? " active" : ""}`}
                            style={{width: `${step.duration / totalDuration * 100}%`, backgroundColor: step.color}}
                            key={step.id}
                        >
                        </div>
                })}
            </div>
        </div>
    );
}