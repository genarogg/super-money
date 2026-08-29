// ─── Tokens de diseño — "super-money" ───────────────────────────────────────
// Estética: terminal real, no gradiente genérico. El video contrasta el
// número flotante que "tiembla" (rojo) contra el entero que nunca falla
// (verde) — esa dualidad es la firma visual de todo el video.

export const colors = {
  bg: "#0a0e14",
  bgPanel: "#11161f",
  bgPanelAlt: "#161c28",
  border: "#22293a",

  text: "#e4e4e7",
  textDim: "#71717a",
  textFaint: "#454854",

  // El bug / el decimal que no cuadra
  error: "#ff5c57",
  errorDim: "#5c2a29",

  // La solución / el entero exacto
  ok: "#5af78e",
  okDim: "#1f4a34",

  // Acento neutro (links, keywords secundarios)
  accent: "#57c7ff",
  accentDim: "#1c3a4d",

  // Sintaxis (paleta tipo terminal, restringida a 5 tonos)
  syntaxKeyword: "#ff6ac1",
  syntaxString: "#5af78e",
  syntaxNumber: "#ffb86c",
  syntaxComment: "#5c6370",
  syntaxFn: "#57c7ff",
} as const;

import { loadedFontFamilies } from "./loadFonts";

export const fonts = {
  display: `"${loadedFontFamilies.display}", Arial, sans-serif`,
  mono: `"${loadedFontFamilies.mono}", "Courier New", monospace`,
} as const;

// Duraciones de escena en frames, a 30fps.
// (el guion en 60fps original era para una intro corta; para un video de
// 6-8 min de duración total, 30fps mantiene el peso de render razonable)
export const FPS = 30;

// Duraciones ajustadas al audio real del voice-over generado en ElevenLabs
// (voiceover.mp3, 95.0s exactos). El beat de instalación por pnpm
// (InstallBeat, dentro de la escena supermoney) es puramente visual y no
// tiene línea de voz propia — se le restó tiempo a otros beats con margen
// (AtmBeat, LimitBeat) para que la escena siga sumando 43s y todo el video
// se mantenga sincronizado con los 95.0s del audio. Ver
// guion-supermoney.md para el texto narrado tramo por tramo.
export const sceneDurations = {
  hook: 12 * FPS, // 0:00 - 0:12 → gancho: 0.1 + 0.2
  explicacion: 16 * FPS, // problema explicado + ejemplo del carrito
  solucion: 17 * FPS, // guardar todo en enteros
  supermoney: 43 * FPS, // qué es supermoney: input, HTML vanilla, instalación pnpm, integración React, showMoney, moneyToString, límite
  cierre: 7 * FPS, // cierre
} as const;

export const totalDuration = Object.values(sceneDurations).reduce(
  (a, b) => a + b,
  0,
);
