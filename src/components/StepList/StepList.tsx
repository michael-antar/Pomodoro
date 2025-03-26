import './StepList.css'

export default function StepList( { steps }: { steps: { id: number; name: string}[] }) {
    return (
        <div id="stepList">
            <h3 id="stepListTitle">Remaining Steps</h3>
            <ul id="stepListItemContainer">
                {steps.map(step => {
                    return <li id="stepListItem" key={step.id}>{step.name}</li>
                })}
            </ul>
        </div>
    );
}