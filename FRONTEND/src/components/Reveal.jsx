import { useEffect, useRef, useState } from "react";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  duration = 700,
  distance = 40,
  direction = "up", // up | down | left | right
  scale = 0.97,
  once = true,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Respeta usuarios que prefieren menos animaciones
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);

          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setVisible(false);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [once]);

  let translate = "";

  switch (direction) {
    case "left":
      translate = `translateX(-${distance}px)`;
      break;

    case "right":
      translate = `translateX(${distance}px)`;
      break;

    case "down":
      translate = `translateY(-${distance}px)`;
      break;

    default:
      translate = `translateY(${distance}px)`;
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translate(0,0) scale(1)"
          : `${translate} scale(${scale})`,
        transition: `
          opacity ${duration}ms cubic-bezier(.22,1,.36,1) ${delay}ms,
          transform ${duration}ms cubic-bezier(.22,1,.36,1) ${delay}ms
        `,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}