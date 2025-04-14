import './TimerButton.css';

import Button from '../Button';

interface TimerButtonProps {
    onClick: () => void; 
    disabled?: boolean; 
    tooltip?: string;
    style?: React.CSSProperties;
    className?: string;
    iconSrc: string; 
    iconSrcAlt?: string; 
    isToggled?: boolean; 
    alt: string;
}

export default function TimerButton({
    onClick,
    disabled,
    tooltip,
    style,
    className,
    iconSrc,
    iconSrcAlt,
    isToggled = false,
    alt,
} : TimerButtonProps) {

    return (
        <Button
            onClick={onClick}
            disabled={disabled}
            tooltip={tooltip}
            className={`timerButton ${className}`}
            style={style}
        >
            <img
                src={isToggled && iconSrcAlt ? iconSrcAlt : iconSrc}
                alt={alt}
                draggable='false'
            />
        </Button>
    );
}

