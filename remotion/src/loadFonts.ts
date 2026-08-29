// Carga de fuentes vía @remotion/google-fonts: se resuelve antes del
// render (a diferencia de un <style>@import>, que puede no estar listo
// a tiempo en un render headless) y expone el fontFamily exacto a usar.
// Se importa una sola vez desde Root.tsx para que quede registrado antes
// de que cualquier composición se monte.
import { loadFont as loadSora } from "@remotion/google-fonts/Sora";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

const { fontFamily: soraFamily } = loadSora("normal", {
  weights: ["400", "600", "700", "800"],
});

const { fontFamily: monoFamily } = loadMono("normal", {
  weights: ["400", "500", "700"],
});

export const loadedFontFamilies = {
  display: soraFamily,
  mono: monoFamily,
};
