import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, fonts } from "../theme";
import { useOrientation } from "../useOrientation";

type Props = {
  children: React.ReactNode;
  /** Etiqueta pequeña arriba a la izquierda, ej: "01 — el bug" */
  label?: string;
};

/**
 * Fondo compartido de todas las escenas: casi negro sólido con una malla
 * de puntos muy tenue (referencia a "grid" de hoja de cálculo / ledger).
 * Deliberadamente estático — nada de gradientes animados — para que la
 * única cosa que se mueve en pantalla sea el contenido que realmente
 * importa (números, código).
 *
 * El fondo (AbsoluteFill) siempre cubre el 100% del lienzo de la
 * composición activa, sea 1920×1080 o 1080×1920 — no hay barras: la malla
 * y el color colors.bg se extienden hasta los bordes en ambas
 * orientaciones porque MainVideoVertical ya no escala un 16:9 dentro de un
 * lienzo más grande, sino que renderiza esta misma Scene directamente al
 * tamaño de la composición vertical.
 */
export const Scene: React.FC<Props> = ({ children, label }) => {
  const { isVertical, scale } = useOrientation();

  return (
    <AbsoluteFill
      style={{
        background: colors.bg,
        backgroundImage: `radial-gradient(${colors.border} 1px, transparent 1px)`,
        backgroundSize: `${36 * scale}px ${36 * scale}px`,
        fontFamily: fonts.display,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {label ? (
        <div
          style={{
            position: "absolute",
            top: isVertical ? 40 : 56,
            left: isVertical ? 40 : 64,
            fontFamily: fonts.mono,
            fontSize: 20 * scale,
            letterSpacing: 1,
            color: colors.textDim,
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>
      ) : null}
      {children}
    </AbsoluteFill>
  );
};
