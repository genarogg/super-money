import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { MainVideo } from "./MainVideo";
import { colors } from "./theme";

/**
 * Versión 9:16 (TikTok / Reels / Shorts) del mismo video.
 *
 * El diseño de las escenas (00_Intro..05_Cierre) está construido con
 * medidas en px pensadas para un lienzo 1920×1080 (16:9), centradas con
 * flex/AbsoluteFill pero sin usar useVideoConfig() para adaptar tamaños.
 * Reescribir cada escena para que también luzca "nativa" en vertical es un
 * trabajo de diseño en sí mismo (recomposición de layout, no solo escalado).
 *
 * Este componente toma el enfoque robusto mientras tanto: renderiza
 * MainVideo a tamaño 16:9 y lo escala dentro de un lienzo 1080×1920,
 * centrado verticalmente, con el fondo de la escena (colors.bg) rellenando
 * las bandas superior e inferior. Así el vertical sale ya, sin riesgo de
 * recortes ni texto deformado, y sirve como base sólida si más adelante se
 * quiere adaptar cada escena a su propio layout vertical.
 */
const SOURCE_WIDTH = 1920;
const SOURCE_HEIGHT = 1080;

export const MainVideoVertical: React.FC = () => {
  const { width, height } = useVideoConfig();

  const scale = Math.min(width / SOURCE_WIDTH, height / SOURCE_HEIGHT);
  const scaledWidth = SOURCE_WIDTH * scale;
  const scaledHeight = SOURCE_HEIGHT * scale;

  return (
    <AbsoluteFill style={{ background: colors.bg }}>
      <div
        style={{
          position: "absolute",
          top: (height - scaledHeight) / 2,
          left: (width - scaledWidth) / 2,
          width: SOURCE_WIDTH,
          height: SOURCE_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <MainVideo />
      </div>
    </AbsoluteFill>
  );
};
