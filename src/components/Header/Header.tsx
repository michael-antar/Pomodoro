import './Header.css';

import { useState } from 'react';
import { createPortal } from 'react-dom';

import IconButton from '../IconButton/IconButton';
import SettingsStepList from './SettingsStepList/SettingsStepList';

import settingsIcon from '../../assets/settingsIcon.svg';

type Step = { name: string; duration: number; color: string; id: number};

interface HeaderProps {
    steps: Step[];
    handleChangeDuration: (stepId: number, duration: number) => void;
    handleStepsReorder: (newSteps: Step[]) => void;
}

export default function Header({ 
    steps,
    handleChangeDuration, 
    handleStepsReorder 
} : HeaderProps) {

    const [showSettings, setShowSettings] = useState(false);


    return (
        <div id='header'>
            <h2 id='headerTitle'>Pomodoro Timer</h2>
            <div id="headerLeftPanel">
                <IconButton iconSrc={settingsIcon} alt='Settings Button' onClick={() =>  setShowSettings(true)} />
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