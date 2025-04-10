import './Header.css';

import { useState } from 'react';
import { createPortal } from 'react-dom';

import Button from '../Button/Button.tsx';
import StepSettings from './StepSettings/StepSettings.tsx';
import VolumeSettings from './VolumeSettings/VolumeSettings.tsx'

import { Step } from '../../types.ts';

interface HeaderProps {
    steps: Step[];
    handleRestart: () => void;
    handleAddStep: (name: string) => void;
    handleRemoveStep: (removedId: number) => void;
    handleReorderSteps: (newSteps: Step[]) => void;
    handleChangeDuration: (stepId: number, duration: number) => void;
    playButtonSound: () => void;
    playAlarmSound: () => void;
    buttonVolume: number;
    alarmVolume: number;
    onChangeButtonVolume: (volume: number) => void;
    onChangeAlarmVolume: (volume: number) => void;
}

export default function Header({ 
    steps,
    handleRestart,
    handleAddStep,
    handleRemoveStep,
    handleChangeDuration, 
    handleReorderSteps,
    playButtonSound,
    playAlarmSound,
    buttonVolume,
    alarmVolume,
    onChangeButtonVolume,
    onChangeAlarmVolume
} : HeaderProps) {

    const [showSettings, setShowSettings] = useState(false);


    return (
        <div id='header'>
            <h2 id='headerTitle'>Pomodoro Timer</h2>
            <div id="headerLeftPanel">
                <Button 
                    onClick={handleRestart}
                    tooltip='Press to restart steps'
                >
                    Restart
                </Button>
                <Button 
                    onClick={() =>  setShowSettings(true)}
                    tooltip='Press to open settings'
                >
                    Settings
                </Button>
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
                        playButtonSound={playButtonSound}
                        playAlarmSound={playAlarmSound}
                        buttonVolume={buttonVolume}
                        alarmVolume={alarmVolume}
                        onChangeButtonVolume={onChangeButtonVolume}
                        onChangeAlarmVolume={onChangeAlarmVolume}
                    />

                </div>,
                document.body
            )}
        </div>
    );
}