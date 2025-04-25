import './Button.css';

interface ButtonProps {
    onClick: () => void; 
    disabled?: boolean; 
    tooltip?: string;
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export default function Button({ 
    onClick, 
    disabled = false, 
    tooltip = '',
    children,
    className= '',
    style
} : ButtonProps) {

    return (
        <button
            className={className}
            style={style}
            title={tooltip}
            disabled={disabled}
            onClick={onClick} 
        >
            {children}
        </button>
    );
}