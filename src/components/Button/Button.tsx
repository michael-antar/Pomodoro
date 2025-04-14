import './Button.css';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

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

    const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
    const [showTooltip, setShowTooltip] = useState(false);

    const showTimeoutId = useRef<number | null>(null);
    const mousePositionRef = useRef({ x: 0, y: 0 });

    const TOOLTIP_DELAY = 1000;
    const TOOLTIP_OFFSET = 10;

    // Handles position of tooltip relative to mouse and shows it
    const calculateAndSetTooltipStyle = (clientX: number, clientY: number) => {
        const screenWidth = window.innerWidth;

        const newTop = clientY + TOOLTIP_OFFSET;

        const baseStyle: React.CSSProperties = {
            top: `${newTop}px`
        }

        // Mouse on right half, show tooltip on left
        if (clientX > screenWidth / 2) {
            const newRight = screenWidth - clientX;

            setTooltipStyle({
                ...baseStyle,
                right: `${newRight}px`,
                left: 'auto'
            });
        }
        // Mouse on left half, show tooltip on right
        else {
            const newLeft = clientX + TOOLTIP_OFFSET;

            setTooltipStyle({
                ...baseStyle,
                left: `${newLeft}px`,
                right: 'auto'
            });
        }

        setShowTooltip(true);
    };

    const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
        mousePositionRef.current = { x: event.clientX, y: event.clientY};

        if (showTimeoutId.current) window.clearTimeout(showTimeoutId.current);

        showTimeoutId.current = window.setTimeout(() => {
            calculateAndSetTooltipStyle(event.clientX, event.clientY);
        }, TOOLTIP_DELAY);
    }

    const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
        mousePositionRef.current = { x: event.clientX, y: event.clientY};

        if (showTimeoutId.current) {
            window.clearTimeout(showTimeoutId.current);
            showTimeoutId.current = null;
        } 

        if (showTooltip) setShowTooltip(false);

        showTimeoutId.current = window.setTimeout(() => {
            calculateAndSetTooltipStyle(event.clientX, event.clientY);
        }, TOOLTIP_DELAY);
    }

    const handleMouseLeave = () => {
        if (showTimeoutId.current) {
            window.clearTimeout(showTimeoutId.current);
            showTimeoutId.current = null;
        }

        setShowTooltip(false);
    }
    

    useEffect(() => {
        return () => {
            if (showTimeoutId.current) window.clearTimeout(showTimeoutId.current);
        };
    }, [])
    

    return (
        <button
            onClick={onClick} 
            disabled={disabled} 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            className={className}
            style={style}
        >
            {children}
            {tooltip && showTooltip && createPortal(
                <span className="tooltip-text" style={tooltipStyle}>{tooltip}</span>,
                document.body
            )}
        </button>
    );
}