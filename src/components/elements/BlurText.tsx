"use client"
import { useRef, useEffect, useMemo, useState, useCallback } from 'react';
// Components
import { motion, useAnimation } from 'framer-motion';

const AnimatedSpan = motion.span;

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Record<string, string | number>;
  easing?: string; // Framer Motion uses string easing
};

export const BlurText: React.FC<BlurTextProps> = ({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = "linear", // Default to linear easing
}) => {
  const elements = useMemo(() => {
    return animateBy === "words" ? text.split(" ") : text.split("");
  }, [animateBy, text]);
  const [localElements, setLocalElements] = useState(elements);

  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const animatedCount = useRef(0);
  const controls = useAnimation();

  const defaultFrom = useMemo(() => 
    direction === "top" ? 
    { filter: "blur(15px)", opacity: 0, y: -75 } : 
    { filter: "blur(15px)", opacity: 0, y: 75 }
  , [direction]);

  const defaultTo = useMemo(() => ({ filter: "blur(0px)", opacity: 1, y: 0 }), []);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current!);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const animateElements = useCallback(async () => {
    for (let i = 0; i < elements.length; i++) {
      await controls.start({
        ...animationTo || defaultTo,
        transition: { duration: 0.5, delay: i * (delay / 1000), ease: easing },
      });
      animatedCount.current += 1;
    }
  }, [animationTo, controls, defaultTo, delay, easing, elements.length]);

  useEffect(() => {
    if(localElements.length === elements.length){
      animateElements();
    } else {
        controls.start({
          ...animationFrom || defaultFrom,
          transition: { duration: 0.5, delay: elements.length * (delay / 1000), ease: easing },
        });
        setLocalElements(elements);
    }
  }, [inView, elements, controls, animationFrom, animationTo, delay, easing, defaultFrom, defaultTo, animateElements, localElements.length]);

  return (
    <p ref={ref} className={className} style={{ display: "flex", flexWrap: "wrap" }}>
      {elements.map((element, index) => (
        <AnimatedSpan
          key={index}
          initial={animationFrom || defaultFrom}
          animate={controls}
          style={{ display: "inline-block", willChange: "transform, filter, opacity" }}
        >
          {element === " " ? "\u00A0" : element}
          {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
        </AnimatedSpan>
      ))}
    </p>
  );
};