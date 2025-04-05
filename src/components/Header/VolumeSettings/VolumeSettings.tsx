import './VolumeSettings.css'

interface VolumeSettingsProps {
    buttonVolume: number;
    onChangeButtonVolume: (volume: number) => void;
    alarmVolume: number;
    onChangeAlarmVolume: (volume: number) => void;
}

export default function VolumeSettings({
    buttonVolume,
    onChangeButtonVolume,
    alarmVolume,
    onChangeAlarmVolume
} : VolumeSettingsProps) {



    return (
        <div id='volumeSettings'>
            <h3 id='volumeSettingsTitle'>Volume</h3>
            <div id='buttonVolumeSettings'>
                <label>Button Volume: {buttonVolume.toFixed(2)}</label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={buttonVolume}
                    onChange={(e) => onChangeButtonVolume(parseFloat(e.target.value))}
                />
            </div>
            <div id='alarmVolumeSettings'>
                <label>Alarm Volume: {alarmVolume.toFixed(2)}</label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={alarmVolume}
                    onChange={(e) => onChangeAlarmVolume(parseFloat(e.target.value))}
                />
            </div>
        </div>
    );
}