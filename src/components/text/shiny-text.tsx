import { Ref, forwardRef } from "react";

interface ShinyTextProps {
    text: string;
    disabled?: boolean;
    speed?: number;
    className?: string;
}

export const ShinyText = forwardRef(({
    text, 
    className = "",
    disabled = false,
    speed = 5,
    ...props
}: ShinyTextProps, ref: Ref<HTMLDivElement>) => {
    const animationDuration = `${speed}s`;

    return (
        <div 
            className={`text-roonder-gunmetal bg-clip-text inline-block ${disabled ? '' : 'animate-shine'} ${className}`}
            style={{
                backgroundImage: 'linear-gradient(120deg, rgba(0, 156, 73, 0) 40%, rgba(0, 156, 73, 0.8) 50%, rgba(0, 156, 73, 0) 60%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                animationDuration: animationDuration,
            }}
            ref={ref} 
            {...props} 
        >
            {text}
        </div>
    );
});

ShinyText.displayName = "ShinyText";