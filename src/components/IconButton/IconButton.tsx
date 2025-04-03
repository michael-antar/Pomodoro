import './IconButton.css';

interface IconButtonProps {
    iconSrc: string; 
    iconSrcAlt?: string; 
    isToggled?: boolean; 
    alt: string; 
    onClick: () => void; 
    disabled?: boolean; 
    width?: number;
}

export default function IconButton({ 
    iconSrc, 
    iconSrcAlt, 
    isToggled = false, 
    alt, onClick, 
    disabled = false, 
    width = 50 
} : IconButtonProps) {
    
    return (
        <button className='iconButton' onClick={onClick} disabled={disabled} style={{width: width}}>
            <img
                src={isToggled && iconSrcAlt ? iconSrcAlt : iconSrc}
                alt={alt}
                draggable='false'
            />
        </button>
    );
}