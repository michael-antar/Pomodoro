import './IconButton.css';

import { useState, useRef, useEffect } from 'react';

interface IconButtonProps {
    iconSrc: string; 
    iconSrcAlt?: string; 
    isToggled?: boolean; 
    alt: string; 
    onClick: () => void; 
    disabled?: boolean; 
    size?: number;
    tooltip?: string;
}

export default function IconButton({ 
    iconSrc, 
    iconSrcAlt, 
    isToggled = false, 
    alt, onClick, 
    disabled = false, 
    size = 50,
    tooltip
} : IconButtonProps) {

    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0});
    const [showTooltip, setShowTooltip] = useState(false);

    const showTimeoutId = useRef<number | null>(null);
    const mousePositionRef = useRef({ x: 0, y: 0 });

    const TOOLTIP_DELAY = 1500;

    const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
        mousePositionRef.current = { x: event.clientX, y: event.clientY};

        if (showTimeoutId.current) window.clearTimeout(showTimeoutId.current);

        showTimeoutId.current = window.setTimeout(() => {
            setTooltipPosition({
                top: event.clientY + 10,
                left: event.clientX + 10
            });
            setShowTooltip(true);
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
            setTooltipPosition({
                top: event.clientY + 10,
                left: event.clientX + 10
            });
            setShowTooltip(true);
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
            className='iconButton' 
            onClick={onClick} 
            disabled={disabled} 
            style={{width: size}}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            <img
                src={isToggled && iconSrcAlt ? iconSrcAlt : iconSrc}
                alt={alt}
                draggable='false'
            />
            {tooltip && showTooltip && (
                <span className="tooltip-text" style={{ top: tooltipPosition.top, left: tooltipPosition.left }}>{tooltip}</span>
            )}
        </button>
    );
}