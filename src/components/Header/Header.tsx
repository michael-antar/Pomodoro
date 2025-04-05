import './Header.css';

import { useState } from 'react';
import { createPortal } from 'react-dom';

import IconButton from '../../components/IconButton/IconButton';
import StepSettings from './StepSettings/StepSettings.tsx';
import VolumeSettings from './VolumeSettings/VolumeSettings.tsx'

import restartIcon from '../../assets/restartIcon.svg';
import settingsIcon from '../../assets/settingsIcon.svg';

import { Step } from '../../types.ts';

interface HeaderProps {
    steps: Step[];
    handleRestart: () => void;
    handleAddStep: (name: string) => void;
    handleRemoveStep: (removedId: number) => void;
    handleReorderSteps: (newSteps: Step[]) => void;
    handleChangeDuration: (stepId: number, duration: number) => void;
    buttonVolume: number;
    onChangeButtonVolume: (volume: number) => void;
    alarmVolume: number;
    onChangeAlarmVolume: (volume: number) => void;
}

export default function Header({ 
    steps,
    handleRestart,
    handleAddStep,
    handleRemoveStep,
    handleChangeDuration, 
    handleReorderSteps,
    buttonVolume,
    onChangeButtonVolume,
    alarmVolume,
    onChangeAlarmVolume
} : HeaderProps) {

    const [showSettings, setShowSettings] = useState(false);


    return (
        <div id='header'>
            <h2 id='headerTitle'>Pomodoro Timer</h2>
            <div id="headerLeftPanel">
                <IconButton 
                    iconSrc={restartIcon} 
                    alt="Restart Button" 
                    onClick={handleRestart}
                    tooltip='Press to restart steps'
                />
                <IconButton 
                    iconSrc={settingsIcon} 
                    alt='Settings Button' 
                    onClick={() =>  setShowSettings(true)}
                    tooltip='Press to open settings'
                />
            </div>
            {showSettings && createPortal(
                <div id='settingsModal'>
                    
                    <div id='settingsTop'>
                        <h3 id='settingsTitle'>Settings</h3>
                        <button id='settingsCloseButton' onClick={() => setShowSettings(false)}>X</button>
                    </div>
                    <hr className='settingsLine' />
                    <StepSettings
                        steps={steps}
                        onAdd={handleAddStep}
                        onRemove={handleRemoveStep}
                        onReorder={handleReorderSteps}
                        onChangeDuration={handleChangeDuration}
                    />
                    <hr className='settingsLine' />
                    <VolumeSettings
                        buttonVolume={buttonVolume}
                        onChangeButtonVolume={onChangeButtonVolume}
                        alarmVolume={alarmVolume}
                        onChangeAlarmVolume={onChangeAlarmVolume}
                    />

                </div>,
                document.body
            )}
        </div>
    );
}