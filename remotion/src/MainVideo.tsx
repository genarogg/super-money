import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { HookScene } from "./scenes/01_Hook";
import { ExplicacionScene } from "./scenes/02_Explicacion";
import { SolucionScene } from "./scenes/03_Solucion";
import { SupermoneyScene } from "./scenes/04_Supermoney";
import { CierreScene } from "./scenes/05_Cierre";
import { sceneDurations, totalDuration } from "./theme";

/**
 * Video completo: "super-money — dinero sin errores de punto flotante".
 * Cada escena vive en su propio Sequence según las duraciones de
 * theme.sceneDurations, en el mismo orden del guion original:
 * gancho → explicación → solución → supermoney → cierre.
 *
 * El voice-over (public/audio/voiceover.mp3, generado con ElevenLabs, voz
 * "Carolina G") dura 95.0s exactos y sceneDurations está calibrado a esa
 * duración — ver guion-supermoney.md para el texto narrado tramo por tramo.
 *
 * Música de fondo (public/audio/background.mp3) suena por debajo de la voz
 * a volumen fijo del 20%, recortada a la duración total del video con un
 * fade-out corto al final para no cortar en seco.
 */
const BG_VOLUME = 0.1;
const BG_FADE_OUT_FRAMES = 30; // 1s de fade-out al cierre

export const MainVideo: React.FC = () => {
  const { hook, explicacion, solucion, supermoney, cierre } = sceneDurations;

  const hookStart = 0;
  const explicacionStart = hookStart + hook;
  const solucionStart = explicacionStart + explicacion;
  const supermoneyStart = solucionStart + solucion;
  const cierreStart = supermoneyStart + supermoney;

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/voiceover.mp3")} />
      <Sequence from={0} durationInFrames={totalDuration} layout="none">
        <Audio
          src={staticFile("audio/background.mp3")}
          volume={(f) =>
            f > totalDuration - BG_FADE_OUT_FRAMES
              ? BG_VOLUME *
                Math.max(0, (totalDuration - f) / BG_FADE_OUT_FRAMES)
              : BG_VOLUME
          }
        />
      </Sequence>
      <Sequence from={hookStart} durationInFrames={hook} layout="none">
        <HookScene />
      </Sequence>
      <Sequence from={explicacionStart} durationInFrames={explicacion} layout="none">
        <ExplicacionScene />
      </Sequence>
      <Sequence from={solucionStart} durationInFrames={solucion} layout="none">
        <SolucionScene />
      </Sequence>
      <Sequence from={supermoneyStart} durationInFrames={supermoney} layout="none">
        <SupermoneyScene />
      </Sequence>
      <Sequence from={cierreStart} durationInFrames={cierre} layout="none">
        <CierreScene />
      </Sequence>
    </AbsoluteFill>
  );
};
