import './StepDisplay.css'

export default function StepDisplay( 
    { steps, activeIndex, totalDuration }
    : { steps: { name: string; duration: number; color: string; id: number; }[]; activeIndex: number; totalDuration: number; }) {
    return (
        <div id="stepDisplay">
            <h3 id="stepListTitle">Remaining Steps</h3>
            <div id="stepListItemContainer">
                {steps.map(step => {
                    return <div 
                            className={`stepListItem${step.id === activeIndex ? " activeStepListItem" : ""}`}
                            style={{width: `${step.duration / totalDuration * 100}%`, backgroundColor: step.color}}
                            key={step.id}
                        >
                        </div>
                })}
            </div>
        </div>
    );
}