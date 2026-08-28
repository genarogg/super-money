import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Props = {
  title: string;
  subtitle: string;
};

export const MainVideo: React.FC<Props> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animación de entrada del título: rebote (spring)
  const titleSpring = spring({
    frame,
    fps,
    config: {
      damping: 12,
      mass: 0.6,
      stiffness: 100,
    },
  });

  const titleScale = interpolate(titleSpring, [0, 1], [0.5, 1]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  // El subtítulo aparece un poco después, con fade-in + desplazamiento
  const subtitleDelay = 20;
  const subtitleProgress = spring({
    frame: frame - subtitleDelay,
    fps,
    config: {
      damping: 15,
    },
  });

  const subtitleOpacity = interpolate(subtitleProgress, [0, 1], [0, 1]);
  const subtitleY = interpolate(subtitleProgress, [0, 1], [20, 0]);

  // Fondo con gradiente que se mueve lentamente
  const gradientAngle = interpolate(frame, [0, 150], [0, 60]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${gradientAngle}deg, #1e1b4b, #7c3aed, #ec4899)`,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          transform: `scale(${titleScale})`,
          opacity: titleOpacity,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: 90,
            color: "white",
            fontWeight: 800,
            margin: 0,
            textShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          {title}
        </h1>
      </div>
      <div
        style={{
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          marginTop: 24,
        }}
      >
        <p
          style={{
            fontSize: 36,
            color: "rgba(255,255,255,0.85)",
            margin: 0,
          }}
        >
          {subtitle}
        </p>
      </div>
    </AbsoluteFill>
  );
};
