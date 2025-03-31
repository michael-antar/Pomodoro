import './IconButton.css';

export default function IconButton(
        { iconSrc, iconSrcAlt, isToggled = false, alt, onClick, disabled = false, width = 50 } 
        : {iconSrc: string; iconSrcAlt?: string; isToggled?: boolean; alt: string; onClick: () => void; disabled?: boolean; width?: number;}) {
    
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