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

// Duraciones de escena en frames, a 60fps.
// (video a 60fps para mayor fluidez; todas las duraciones siguen
// expresadas como N * FPS, así que el cambio de 30→60 no altera la
// duración en segundos de ninguna escena — solo las animaciones internas
// en números de frame fijos, que se escalaron x2 en cada archivo de escena)
export const FPS = 60;

// Duraciones ajustadas al audio real del voice-over generado en ElevenLabs
// (voiceover.mp3, 95.0s exactos). El beat de instalación por pnpm
// (InstallBeat, dentro de la escena supermoney) es puramente visual y no
// tiene línea de voz propia — se le restó tiempo a otros beats con margen
// (AtmBeat, LimitBeat) para que la escena siga sumando 43s y todo el video
// se mantenga sincronizado con los 95.0s del audio. Ver
// guion-supermoney.md para el texto narrado tramo por tramo.
//
// NOTA: supermoney se extendió a 49s (antes 43s) para dar tiempo al scroll
// del snippet completo de MoneyInput.tsx en el beat de React (+6s). Además
// se agregó la escena `intro` (+12s, sin línea de voz propia todavía). El
// video total ya no coincide con los 95.0s del voiceover.mp3 actual —
// pendiente regenerar/editar el audio para que cuadre con los nuevos 113s.
export const sceneDurations = {
  intro: 12 * FPS, // NUEVA — el mismo error, repetido con el tiempo (3000 días de 0.10)
  hook: 12 * FPS, // 0:00 - 0:12 → gancho: 0.1 + 0.2
  explicacion: 16 * FPS, // problema explicado + ejemplo del carrito
  solucion: 17 * FPS, // guardar todo en enteros
  supermoney: 49 * FPS, // qué es supermoney: input, HTML vanilla, instalación pnpm, integración React (con scroll del archivo completo), showMoney, moneyToString, límite
  cierre: 7 * FPS, // cierre
} as const;

export const totalDuration = Object.values(sceneDurations).reduce(
  (a, b) => a + b,
  0,
);

// Duración de cada transición entre escenas (crossZoom: zoom + blur
// cruzado, ver ./transitions/crossZoom.ts), en frames. Con
// @remotion/transitions, cada transición SOLAPA ese número de frames entre
// la escena saliente y la entrante — la duración final del video es
// totalDuration menos (nº de transiciones × TRANSITION_DURATION).
// 36 frames (0.6s a 60fps) le da tiempo al blur del crossZoom para leerse
// bien — un crossZoom con blur necesita más aire que un fade simple.
// Con 5 escenas hay 4 transiciones: 4 * 36 = 144 frames (~2.4s) menos.
export const TRANSITION_DURATION = 36;
const TRANSITION_COUNT = Object.keys(sceneDurations).length - 1;

// Duración real de la composición ya con el solape de las transiciones
// descontado — es lo que debe usar <Composition durationInFrames> en
// Root.tsx y lo que debe cubrir el audio de fondo en MainVideo.tsx.
export const videoDuration =
  totalDuration - TRANSITION_COUNT * TRANSITION_DURATION;
