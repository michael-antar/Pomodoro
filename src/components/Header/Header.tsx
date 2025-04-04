import './Header.css';

import { useState } from 'react';
import { createPortal } from 'react-dom';

import IconButton from '../../components/IconButton/IconButton';
import SettingsStepList from './SettingsStepList/SettingsStepList';

import restartIcon from '../../assets/restartIcon.svg';
import settingsIcon from '../../assets/settingsIcon.svg';

import { Step } from '../../types.ts';

interface HeaderProps {
    steps: Step[];
    handleRestart: () => void;
    handleChangeDuration: (stepId: number, duration: number) => void;
    handleStepsReorder: (newSteps: Step[]) => void;
}

export default function Header({ 
    steps,
    handleRestart,
    handleChangeDuration, 
    handleStepsReorder 
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
                    <div id='stepSettings'>
                        <h3 id='stepSettingsTitle'>Edit Steps</h3>
                        <SettingsStepList
                            steps={steps}
                            onReorder={handleStepsReorder}
                            onChangeDuration={handleChangeDuration}
                        />
                    </div>
                    <hr className='settingsLine' />
                </div>,
                document.body
            )}
        </div>
    );
}