import './Sidebar.css';

import { useState } from 'react';

import TimerButton from '../Button/TimerButton/TimerButton';
import TaskDisplay from './TaskDisplay/TaskDisplay';
import GraphDisplay from './GraphDisplay/GraphDisplay';

import taskIcon from '../../assets/taskIcon.svg';
import graphIcon from '../../assets/graphIcon.svg';

type ActiveDisplay = 'TaskDisplay' | 'GraphDisplay' | null;

export default function Sidebar() {
    const [activeView, setActiveView] = useState<ActiveDisplay>(null);

    const handleToggleView = (view: 'TaskDisplay' | 'GraphDisplay') => {
        setActiveView(activeView === view ? null : view); // TODO May create issues
    };

    return (
        <div className={`sidebar ${activeView ? 'expanded' : ''}`}>
            <div className='sidebarControls'>
                <TimerButton 
                    onClick={() => handleToggleView('TaskDisplay')}
                    tooltip='Press to open task list'
                    iconSrc={taskIcon}
                    alt='Task list button'
                />
                <TimerButton 
                    onClick={() => handleToggleView('GraphDisplay')}
                    tooltip='Press to open graphs'
                    iconSrc={graphIcon}
                    alt='Graphs button'
                />  
            </div>
            <div className='sidebarContent'>
                {activeView === 'TaskDisplay' && <TaskDisplay />}
                {activeView === 'GraphDisplay' && <GraphDisplay />}
            </div>
        </div>
    );
}