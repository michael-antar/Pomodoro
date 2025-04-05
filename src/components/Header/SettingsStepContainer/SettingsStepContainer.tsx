import './SettingsStepContainer.css'

import { useState, useRef, useEffect } from 'react';

import DurationInput from './DurationInput/DurationInput';

import dragIcon from '../../../assets/dragIcon.svg';
import trashIcon from '../../../assets/trashIcon.svg';

type Step = { name: string; duration: number; color: string; id: number};

interface SettingsStepContainer {
    steps: Step[];
    onAdd: (name: string) => void;
    onRemove: (removedId: number) => void;
    onReorder: (newSteps: Step[]) => void;
    onChangeDuration: (stepId: number, duration: number) => void;
}

export default function SettingsStepList({
    steps,
    onAdd,
    onRemove,
    onReorder,
    onChangeDuration
} : SettingsStepContainer) {

    const [currentSteps, setCurrentSteps] = useState<Step[]>(steps);
    const draggedItemId = useRef<number | null>(null);
    const dragOverItemId = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const indicatorElementRef = useRef<HTMLElement | null>(null);


    const handleRemoveStep = (removeId: number) => {
        if (steps.length > 1) {
            onRemove(removeId);
        }
        else {
            alert('Cannot remove last step');
        }
    };

    // Triggered when dragging starts on the icon (img)
    const handleDragStart = (e: React.DragEvent<HTMLImageElement>, item: Step) => {
        draggedItemId.current = item.id;
        // Change opacity of parent
        const parentDiv = e.currentTarget.closest('.settingsStepItem') as HTMLElement | null;
        if (parentDiv) {
            try {
                e.dataTransfer.setDragImage(parentDiv, 10, 10);
            }
            catch (error) {
                console.warn("setDragImage failed:", error);
            }

            setTimeout(() => {
                if (parentDiv && draggedItemId.current === item.id) parentDiv.style.opacity = '0.4';
            }, 0);
        }

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', item.id.toString())
    };

    const clearIndicator = () => {
        if (indicatorElementRef.current) {
            indicatorElementRef.current.classList.remove('dragAboveIndicator');
            indicatorElementRef.current.classList.remove('dragBelowIndicator');
            indicatorElementRef.current = null;
            dragOverItemId.current = null
        }
        // Fallback: Clear any indicators that might have been missed
        containerRef.current?.querySelectorAll('.dragAboveIndicator').forEach(el => {
            el.classList.remove('dragAboveIndicator');
        });
        containerRef.current?.querySelectorAll('.dragBelowIndicator').forEach(el => {
            el.classList.remove('dragBelowIndicator');
        });
    };

    // Triggered when dragging enters a drop target
    // Remove all indicators, then add indicator to target
    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, targetItem: Step) => {
        e.preventDefault();
        const currentTargetElement = e.currentTarget as HTMLElement;
        const targetId = targetItem.id;

        if (draggedItemId.current === null || targetId === draggedItemId.current) {
            if (indicatorElementRef.current && indicatorElementRef.current !== currentTargetElement) {
                clearIndicator();
            }
        }

        if (targetId !== dragOverItemId.current) {
            clearIndicator();

            const items = Array.from(currentSteps);
            const draggedIndex = items.findIndex(step => step.id === draggedItemId.current);
            const targetIndex = items.findIndex(step => step.id === targetId);

            currentTargetElement.classList.add(draggedIndex < targetIndex ? 'dragBelowIndicator' : 'dragAboveIndicator')
            indicatorElementRef.current = currentTargetElement;
            dragOverItemId.current = targetId;
        }
    };

    // Triggered continuously while dragging over a drop target
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    // Triggered when dropping onto a drop target
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        clearIndicator();

        const sourceItemId = draggedItemId.current;
        const targetItemId = parseInt(e.currentTarget.id.split('-')[1]);

        if (sourceItemId !== null) {
            const originalDraggedElement = containerRef.current?.querySelector(`#step-${sourceItemId}`) as HTMLElement | null;
            if (originalDraggedElement) originalDraggedElement.style.opacity = '1';
        }

        // Prevent drop on self or ids are missing
        if (sourceItemId === null || targetItemId === null || sourceItemId === targetItemId) {
            console.log("Drop cancelled: same item or missing refs.");
            draggedItemId.current = null;
            return;
        }

        const items = Array.from(currentSteps);
        const draggedIndex = items.findIndex(step => step.id === sourceItemId);
        const targetIndex = items.findIndex(step => step.id === targetItemId);

        const [reorderedItem] = items.splice(draggedIndex, 1);
        items.splice(targetIndex, 0, reorderedItem);

        // Update local state for immediate UI feedback
        setCurrentSteps(items);

        // Notify parent component
        onReorder(items);

        draggedItemId.current = null;
        dragOverItemId.current = null;
    }

    // Triggered when dragging ends on the icon
    const handleDragEnd = (e: React.DragEvent<HTMLImageElement>) => {

        // Reset opacity of parent
        const parentDiv = e.currentTarget.closest('.settingsStepItem') as HTMLElement | null;
        if (parentDiv) {
            parentDiv.style.opacity = '1';
        }

        clearIndicator();
        draggedItemId.current = null;
    };

    useEffect(() => {
        setCurrentSteps(steps);
    }, [steps]);

    return (
        <div className='settingsStepContainer'>
            <h3 id='stepSettingsTitle'>Edit and Rearrange Steps</h3>
            <div id='settingsStepAddButtons'>
                <button id="addPomodoroButton" onClick={() => onAdd('pomodoro')}>
                    Add pomodoro
                </button>
                <button id="addBreakButton" onClick={() => onAdd('break')}>
                    Add break
                </button>
            </div>
            {currentSteps.map((step) => (
                <div
                    key={step.id}
                    id={`step-${step.id}`}
                    className='settingsStepItem'
                    style={{backgroundColor: step.color}}

                    draggable={true}

                    onDragEnter={(e) => handleDragEnter(e, step)}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}

                    onDragStartCapture={(e) => {
                        const isTargetHandle = 
                            (e.target as HTMLElement).tagName.toUpperCase() === 'IMG' 
                            && (e.target as HTMLElement).closest('.settingsStepItem') === e.currentTarget;

                        if (!isTargetHandle) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }}
                >
                    <img
                        src={dragIcon}
                        alt='Drag Handle'
                        onDragStart={(e) => handleDragStart(e, step)}
                        onDragEnd={handleDragEnd}
                    />
                    <span className='settingsStepName'>{step.name}</span>
                    <label>
                        Duration:
                        <DurationInput
                            stepId={step.id}
                            initialDuration={step.duration}
                            onChangeDuration={onChangeDuration}
                            name={`durationInput${step.id}`}
                        />
                    </label>
                    <img
                        src={trashIcon}
                        alt='Remove Step'
                        onClick={() => handleRemoveStep(step.id)}
                    />
                </div>
            ))}
        </div>
    );
}