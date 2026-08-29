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

// Duraciones ajustadas al audio real del voice-over generado en ElevenLabs.
// Ver guion-supermoney.md para el texto narrado tramo por tramo y el
// texto corrido listo para regenerar el audio.
//
// NOTA: supermoney se reajustó de 53s a 58s. Dos causas:
//   1. El beat de instalación con pnpm dejó de ser mudo: ahora lleva la
//      línea "su instalación es muy sencilla..." narrada, así que
//      INSTALL_DUR pasó de 4s a 6s (antes era un beat puramente visual
//      sin voz, ver guion-supermoney.md).
//   2. El beat de React estaba desincronizado: por dentro, el
//      <InputMoney /> no aparecía hasta el frame 300 y la nota final hasta
//      el 500, pero REACT_DUR solo daba 240 frames (8s) — el Sequence
//      cortaba el beat antes de que ese contenido llegara a mostrarse, y
//      el video saltaba a "showMoney" mientras la narración de React
//      seguía sonando. REACT_DUR subió de 8s a 17s para cubrir su propio
//      contenido interno completo.
// (ver INTRO_DUR..LIMIT_DUR en 04_Supermoney.tsx para el detalle de cada
// sub-beat)
export const sceneDurations = {
  intro: 12 * FPS, // NUEVA — el mismo error, repetido con el tiempo (3000 días de 0.10)
  hook: 12 * FPS, // 0:00 - 0:12 → gancho: 0.1 + 0.2
  explicacion: 16 * FPS, // problema explicado + ejemplo del carrito
  solucion: 17 * FPS, // guardar todo en enteros
  supermoney: 54 * FPS, // qué es supermoney: input, HTML vanilla, instalación pnpm (con voz), integración React (import { InputMoney } from "supermoney"), showMoney, moneyToString, límite — timing por beat recalculado a la narración real; 54s = suma exacta de los 8 sub-beats en 04_Supermoney.tsx (INTRO 4 + ATM 8 + HTML 10 + INSTALL 6 + REACT 11 + SHOW 2 + STRING 4 + LIMIT 9)
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

// 1s de aire al inicio, antes de que arranque cualquier imagen o sonido.
// Sin esto el video (y la voz) entran en el frame 0 exacto, lo cual se
// siente apresurado al reproducir — un segundo de negro/silencio le da al
// espectador un respiro antes del primer corte.
export const LEAD_IN_DURATION = 1 * FPS;

// Duración real de la composición ya con el solape de las transiciones
// descontado — es lo que debe usar <Composition durationInFrames> en
// Root.tsx y lo que debe cubrir el audio de fondo en MainVideo.tsx.
export const videoDuration =
  LEAD_IN_DURATION + totalDuration - TRANSITION_COUNT * TRANSITION_DURATION;
