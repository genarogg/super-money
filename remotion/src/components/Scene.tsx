import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, fonts } from "../theme";

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
 */
export const Scene: React.FC<Props> = ({ children, label }) => {
  return (
    <AbsoluteFill
      style={{
        background: colors.bg,
        backgroundImage: `radial-gradient(${colors.border} 1px, transparent 1px)`,
        backgroundSize: "36px 36px",
        fontFamily: fonts.display,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {label ? (
        <div
          style={{
            position: "absolute",
            top: 56,
            left: 64,
            fontFamily: fonts.mono,
            fontSize: 20,
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
