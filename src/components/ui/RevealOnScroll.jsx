import React, { useState, useEffect, useRef } from "react";

const RevealOnScroll = ({ children, className = "", threshold = 0.3 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={elementRef}
      className={`reveal-on-scroll ${isVisible ? "visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;
