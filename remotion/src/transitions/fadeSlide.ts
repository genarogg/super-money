import React from "react";
import { AbsoluteFill } from "remotion";
import type {
  TransitionPresentation,
  TransitionPresentationComponentProps,
} from "@remotion/transitions";

export type FadeSlideDirection = "up" | "down";

export type FadeSlideProps = {
  /** Dirección del desplazamiento de la escena que ENTRA. "up" = entra desde
   * abajo hacia su posición final; "down" = entra desde arriba. */
  direction?: FadeSlideDirection;
  /** Desplazamiento máximo en px. Sutil por diseño — no es un slide de
   * pantalla completa, solo un acompañamiento discreto del fundido. */
  distance?: number;
};

/**
 * Transición propia: fundido (opacity) + deslizamiento vertical sutil.
 * Minimalista a propósito — el fundido lleva el peso de la transición y el
 * movimiento es solo un acento de unos pocos píxeles, no un slide completo
 * de pantalla como el `slide()` que trae @remotion/transitions de fábrica.
 *
 * La escena saliente se desvanece y se desplaza levemente hacia el lado
 * contrario de por donde entra la siguiente, dando sensación de continuidad
 * en vez de un corte seco.
 */
const FadeSlidePresentation: React.FC<
  TransitionPresentationComponentProps<FadeSlideProps>
> = ({ children, presentationProgress, presentationDirection, passedProps }) => {
  const { direction = "up", distance = 24 } = passedProps;
  const isEntering = presentationDirection === "entering";
  const sign = direction === "up" ? 1 : -1;

  const style = React.useMemo((): React.CSSProperties => {
    if (isEntering) {
      // Entra: de opacidad 0 → 1, desplazándose desde `distance` px hasta 0.
      const translateY = (1 - presentationProgress) * distance * sign;
      return {
        opacity: presentationProgress,
        transform: `translateY(${translateY}px)`,
      };
    }
    // Sale: de opacidad 1 → 0, desplazándose levemente en sentido contrario.
    const translateY = presentationProgress * (distance * 0.5) * -sign;
    return {
      opacity: 1 - presentationProgress,
      transform: `translateY(${translateY}px)`,
    };
  }, [isEntering, presentationProgress, distance, sign]);

  return React.createElement(AbsoluteFill, { style }, children);
};

export const fadeSlide = (
  props?: FadeSlideProps,
): TransitionPresentation<FadeSlideProps> => {
  return {
    component: FadeSlidePresentation,
    props: props ?? {},
  };
};
