import './VolumeSettings.css'

interface VolumeSettingsProps {
    playButtonSound: () => void;
    playAlarmSound: () => void;
    buttonVolume: number;
    alarmVolume: number;
    onChangeButtonVolume: (volume: number) => void;
    onChangeAlarmVolume: (volume: number) => void;
}

export default function VolumeSettings({
    playButtonSound,
    playAlarmSound,
    buttonVolume,
    alarmVolume,
    onChangeButtonVolume,
    onChangeAlarmVolume
} : VolumeSettingsProps) {


    return (
        <div className='settingsSection'>
            <div className='settingsHeading settingsHeading2'>Volume</div>
            <div className='volumeSettingsItemContainer'>
                <div className='volumeSettingsItem'>
                    <label className='volumeSettingsLabel' htmlFor='buttonVolumeInput'>Button Volume:</label>
                    <input
                        id='buttonVolumeInput'
                        className='volumeSettingsInput'
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={buttonVolume}
                        onChange={(e) => onChangeButtonVolume(parseFloat(e.target.value))}
                        onMouseUp={playButtonSound}
                        onTouchEnd={playButtonSound}
                    />
                </div>
                <div className='volumeSettingsItem'>
                    <label className='volumeSettingsLabel' htmlFor='alarmVolumeInput'>Alarm Volume:</label>
                    <input
                        id='alarmVolumeInput'
                        className='volumeSettingsInput'
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={alarmVolume}
                        onChange={(e) => onChangeAlarmVolume(parseFloat(e.target.value))}
                        onMouseUp={playAlarmSound}
                        onTouchEnd={playAlarmSound}
                    />
                </div>
            </div>
            
        </div>
    );
}