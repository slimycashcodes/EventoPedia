import React from "react";
import { useMousePosition } from "../hooks/useMousePosition";

const Flashlight: React.FC = () => {
  const { x, y } = useMousePosition();

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{
        background: `radial-gradient(600px at ${x}px ${y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
      }}
    />
  );
};

export default Flashlight;
