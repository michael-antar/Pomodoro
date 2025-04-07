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
        <div id='volumeSettings'>
            <h3 id='volumeSettingsTitle'>Volume</h3>
            <div id='buttonVolumeSettings'>
                <label>Button Volume:</label>
                <span className='volumeValue'>{(Number(buttonVolume) * 100).toFixed(0)}%</span>
                <input
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
            <div id='alarmVolumeSettings'>
                <label>Alarm Volume:</label>
                <span className='volumeValue'>{(Number(alarmVolume) * 100).toFixed(0)}%</span>
                <input
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
    );
}