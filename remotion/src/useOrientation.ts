import { useVideoConfig } from "remotion";

/**
 * Punto único de verdad sobre la orientación de la composición actual.
 *
 * `scale` es un multiplicador para tamaños que en el diseño original
 * (pensado para 1920×1080) están en píxeles fijos — al multiplicarlos por
 * `scale` en vertical, el texto/código ocupa proporcionalmente el mismo
 * "peso visual" en un lienzo más angosto pero más alto, en vez de dejar
 * huecos o desbordar.
 *
 * `maxContentWidth` es el ancho máximo recomendado para bloques de texto y
 * CodeWindow en la orientación actual, ya con márgenes laterales
 * descontados.
 */
export const useOrientation = () => {
  const { width, height } = useVideoConfig();
  const isVertical = height > width;

  // 1080/1920 vs 1920/1080: la vertical es ~0.75x más angosta relativa a
  // su propio alto que la horizontal, así que escalamos tipografía y
  // componentes un poco hacia arriba (no 1:1) para aprovechar el alto
  // extra sin que las líneas de código se corten de ancho.
  const scale = isVertical ? 1.28 : 1;

  const maxContentWidth = isVertical ? width - 80 : width - 200;

  return { isVertical, width, height, scale, maxContentWidth };
};
