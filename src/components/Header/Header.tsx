import './Header.css';

import { useState } from 'react';
import { createPortal } from 'react-dom';

import restartIcon from '../../assets/restartIcon.svg';
import settingsIcon from '../../assets/settingsIcon.svg';
import closeIcon from '../../assets/closeIcon.svg';

import Button from '../Button/Button.tsx';
import TimerButton from '../Button/TimerButton/TimerButton.tsx';
import StepSettings from './StepSettings/StepSettings.tsx';
import VolumeSettings from './VolumeSettings/VolumeSettings.tsx'

import type { Step } from '../../types.ts';
import ColorSettings from './ColorSettings/ColorSettings.tsx';

interface HeaderProps {
    onRestart: () => void;

    // --- Settings Handlers ---
    steps: Step[];
    stepColors: {work: string, break: string};

    // - Step Settings -
    onAdd: (name: string) => void;
    onReorder: (newSteps: Step[]) => void;
    onChangeDuration: (stepId: number, duration: number) => void;
    onRemove: (removedId: number) => void;

    // - Color Settings -
    onChangeColor: (type: string, color: string) => void;

    // - Volume Settings -
    buttonVolume: number;
    onChangeButtonVolume: (volume: number) => void;
    playButtonSound: () => void;

    alarmVolume: number;
    onChangeAlarmVolume: (volume: number) => void;
    playAlarmSound: () => void;
}

export default function Header({ 
    onRestart,

    // --- Settings Handlers ---
    steps,
    stepColors,

    // - Step Settings -
    onAdd, onReorder, onChangeDuration, onRemove,

    // - Color Settings -
    onChangeColor,

    // - Volume Settings -
    buttonVolume, onChangeButtonVolume, playButtonSound,
    alarmVolume, onChangeAlarmVolume, playAlarmSound,
} : HeaderProps) {

    const [showSettings, setShowSettings] = useState(false);


    return (
        <div className='header'>
            <h2 className='headerHeading'>Pomodoro</h2>
            <div className="headerRight">
                <TimerButton 
                    onClick={onRestart}
                    tooltip='Press to restart steps'
                    iconSrc={restartIcon}
                    // style={{width: '50px'}}
                    alt='Restart Steps Button'
                />
                <TimerButton 
                    onClick={() => setShowSettings(true)}
                    tooltip='Press to open settings'
                    iconSrc={settingsIcon}
                    // style={{width: '50px'}}
                    alt='Open Settings Button'
                />
            </div>
            {showSettings && createPortal(
                <div className='settingsBackdrop' onClick={() => setShowSettings(false)}>
                    <div className='settingsModal' onClick={(e) => e.stopPropagation()}>
                        
                        <div className='settingsHeader'>
                            <div className='settingsHeading settingsHeading1'>Settings</div>
                            <Button
                                onClick={() => setShowSettings(false)}
                                tooltip='Press to close settings'
                                className='settingsCloseButton'
                            >
                                <img
                                    className='settingsCloseButtonIcon'
                                    src={closeIcon}
                                    alt='Close Settings'
                                    draggable='false'
                                />
                            </Button>
                        </div>

                        <hr className='settingsLine' />

                        <StepSettings
                            steps={steps}
                            stepColors={stepColors}
                            onAdd={onAdd}
                            onReorder={onReorder}
                            onChangeDuration={onChangeDuration}
                            onRemove={onRemove}
                        />

                        <hr className='settingsLine' />

                        <ColorSettings
                            stepColors={stepColors}
                            onChangeColor={onChangeColor}
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
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}