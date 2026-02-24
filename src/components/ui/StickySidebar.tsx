"use client";

import { useEffect, useRef, useState } from "react";

export default function StickySidebar({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [hasShadow, setHasShadow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const isStuck = rect.top <= 140;
      setHasShadow(isStuck);
    };

    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-shadow duration-300 ${
        hasShadow ? "shadow-lg" : "shadow-sm"
      }`}
    >
      {children}
    </div>
  );
}
