import './Header.css';

import { useState } from 'react';
import { createPortal } from 'react-dom';

import IconButton from '../../components/IconButton/IconButton';
import SettingsStepContainer from './SettingsStepContainer/SettingsStepContainer.tsx';

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
}

export default function Header({ 
    steps,
    handleRestart,
    handleAddStep,
    handleRemoveStep,
    handleChangeDuration, 
    handleReorderSteps 
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
                    <SettingsStepContainer
                        steps={steps}
                        onAdd={handleAddStep}
                        onRemove={handleRemoveStep}
                        onReorder={handleReorderSteps}
                        onChangeDuration={handleChangeDuration}
                    />
                    <hr className='settingsLine' />
                </div>,
                document.body
            )}
        </div>
    );
}