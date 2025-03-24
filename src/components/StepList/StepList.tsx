import './StepList.css'

export default function StepList( { steps }: { steps: { id: number; name: string}[] }) {
    return (
        <>
            <h3>Remaining Steps</h3>
            <ol>
                {steps.map(step => {
                    return <li key={step.id}>{step.name}</li>
                })}
            </ol>
        </>
    );
}