import React from "react";
import { AbsoluteFill } from "remotion";
import type {
  TransitionPresentation,
  TransitionPresentationComponentProps,
} from "@remotion/transitions";

export type CrossZoomProps = {
  /** Escala máxima que alcanza cada escena en el punto álgido de la
   * transición. 1 = sin zoom. Valores típicos: 1.15 - 1.4. */
  strength?: number;
  /** Desenfoque máximo (px) en el punto álgido de la transición, para
   * simular el motion blur del CrossZoom original de GL Transitions. */
  maxBlur?: number;
};

/**
 * Transición "crossZoom": ambas escenas hacen zoom desde/hacia el centro
 * mientras se funden entre sí, con un desenfoque de movimiento que crece y
 * decrece en el punto medio — el equivalente visual del CrossZoom de
 * GL Transitions (gl-transitions.com), reimplementado en CSS/DOM porque
 * Remotion renderiza el video como HTML, no WebGL.
 *
 * La escena SALIENTE se agranda (scale > 1) mientras se desvanece, como si
 * la cámara empujara hacia ella y la dejara atrás. La escena ENTRANTE
 * arranca agrandada y se reduce hasta su tamaño normal mientras aparece,
 * como si emergiera desde el zoom. El blur es máximo a mitad de camino
 * (progress ≈ 0.5) y se disuelve en los extremos, para que ni el frame
 * inicial ni el final se vean borrosos.
 */
const CrossZoomPresentation: React.FC<
  TransitionPresentationComponentProps<CrossZoomProps>
> = ({ children, presentationProgress, presentationDirection, passedProps }) => {
  const { strength = 1.25, maxBlur = 18 } = passedProps;
  const isEntering = presentationDirection === "entering";

  const style = React.useMemo((): React.CSSProperties => {
    // Curva de blur: 0 en los extremos (progress 0 o 1), máxima a la mitad.
    // sin(progress * PI) da exactamente esa forma de campana 0→1→0.
    const blurAmount = Math.sin(presentationProgress * Math.PI) * maxBlur;

    if (isEntering) {
      // Entra: escala de (1 + strength - 1) hacia 1, opacidad 0 → 1.
      const scale = 1 + (1 - presentationProgress) * (strength - 1);
      return {
        opacity: presentationProgress,
        transform: `scale(${scale})`,
        filter: `blur(${blurAmount}px)`,
      };
    }
    // Sale: escala de 1 hacia (1 + strength - 1), opacidad 1 → 0.
    const scale = 1 + presentationProgress * (strength - 1);
    return {
      opacity: 1 - presentationProgress,
      transform: `scale(${scale})`,
      filter: `blur(${blurAmount}px)`,
    };
  }, [isEntering, presentationProgress, strength, maxBlur]);

  return React.createElement(AbsoluteFill, { style }, children);
};

export const crossZoom = (
  props?: CrossZoomProps,
): TransitionPresentation<CrossZoomProps> => {
  return {
    component: CrossZoomPresentation,
    props: props ?? {},
  };
};
