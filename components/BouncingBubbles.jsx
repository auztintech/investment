import React from "react";

// Helper to generate random bubbles
const generateBubbles = (count, colors) =>
  Array.from({ length: count }).map(() => ({
    size: `${Math.random() * 30 + 20}px`,
    x: Math.random() * 90,
    delay: Math.random() * 5,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

const Bubble = ({ size, x, delay, color }) => (
  <div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      left: `${x}%`,
      bottom: "-10%",
      backgroundColor: color,
      animation: `bounce 6s ease-in-out ${delay}s infinite`,
    }}
  />
);

export default function BouncingBubbles({
  count = 10,
  colors = ["#4f46e5", "#3b82f6", "#60a5fa"],
}) {
  const bubbles = generateBubbles(count, colors); // generate bubbles once

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((b, idx) => (
        <Bubble key={idx} {...b} />
      ))}

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-200px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
