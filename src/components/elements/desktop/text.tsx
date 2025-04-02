"use client"
import { Ref, forwardRef, useEffect, useState, useCallback, ReactNode } from "react";
// Components
import { BlurText } from "../BlurText";
import { motion } from "motion/react";

interface PresentationTextProps {
    className?: string;
    props?: ReactNode;
}

export const PresentationText = forwardRef(({
    className,
    ...props
}: PresentationTextProps, ref: Ref<HTMLDivElement>) => {
    const [text, setText] = useState<{ [key: string]: string }>({
        first: "No existen soluciones",
        second: "perfectas"
    });

    useEffect(() => {
        setTimeout(() => {
            setText({
                first: "Existen soluciones",
                second: "adecuadas, efectivas y eficientes"
            })
        }, 35e2)
    }, []);

    const AnimatedBlurText = useCallback((display_text: string) => {
        if(text)
            return <BlurText text={display_text} direction="bottom" animateBy="words" />
        
        
        return <></>
    }, [text]);

    return (
        <motion.section 
            animate={{
            }}
            ref={ref} 
            className={`${className} w-[50dvw] h-[60dvh] p-4`} 
            {...props}
        >
            <div className="sm:text-[28px] lg:text-[44px] xl:text-[60px] font-semibold leading-tight text-roonder-green">
                {AnimatedBlurText(text.first)}
                <span className="text-roonder-gunmetal">
                    {AnimatedBlurText(text.second)}
                </span>
            </div>
        </motion.section>
    );
});

PresentationText.displayName = "PresentationText";