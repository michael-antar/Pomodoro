export default function IconButton(
        { iconSrc, iconSrcAlt, isToggled = false, alt, onClick, disabled = false, width, height } 
        : {iconSrc: string; iconSrcAlt?: string; isToggled?: boolean; alt: string; onClick: () => void; disabled?: boolean; width: number; height: number;}) {
    
    return (
        <button onClick={onClick} disabled={disabled}>
            <img 
                src={isToggled && iconSrcAlt ? iconSrcAlt : iconSrc}
                alt={alt}
                width={width}
                height={height}
            />
        </button>
    );
}