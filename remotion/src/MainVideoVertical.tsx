import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { IntroScene } from "./scenes/00_Intro";
import { HookScene } from "./scenes/01_Hook";
import { ExplicacionScene } from "./scenes/02_Explicacion";
import { SolucionScene } from "./scenes/03_Solucion";
import { SupermoneyScene } from "./scenes/04_Supermoney";
import { CierreScene } from "./scenes/05_Cierre";
import { crossZoom } from "./transitions/crossZoom";
import {
  FPS,
  LEAD_IN_DURATION,
  TRANSITION_DURATION,
  sceneDurations,
  videoDuration,
} from "./theme";

/**
 * Versión 9:16 (TikTok / Reels / Shorts) del mismo video.
 *
 * Antes este componente renderizaba <MainVideo /> (pensado para 1920×1080)
 * y lo escalaba dentro de un lienzo 1080×1920, rellenando las bandas
 * sobrantes arriba/abajo con colors.bg — eso se leía como "fondo negro"
 * porque colors.bg (#0a0e14) es casi negro, y las bandas de letterbox
 * quedaban visibles y sin contenido.
 *
 * Ahora esta composición renderiza las MISMAS escenas de forma nativa: cada
 * escena y sus componentes internos (Scene, CodeWindow, AtmInputDemo) leen
 * useOrientation() y adaptan tamaños/layout según el lienzo real
 * (useVideoConfig), así el fondo con malla de puntos y el contenido cubren
 * el 100% de los 1080×1920 sin bandas ni escalado — igual que en 16:9, pero
 * recompuesto para el alto extra en vez de encogido.
 *
 * La estructura de audio, timing y transiciones es un espejo exacto de
 * MainVideo.tsx — solo cambia qué se renderiza dentro de cada
 * TransitionSeries.Sequence (mismas escenas, mismas duraciones).
 */
const BG_VOLUME = 0.1;
const BG_FADE_OUT_FRAMES = 1 * FPS; // 1s de fade-out al cierre

export const MainVideoVertical: React.FC = () => {
  const { intro, hook, explicacion, solucion, supermoney, cierre } =
    sceneDurations;

  return (
    <AbsoluteFill>
      <Sequence from={LEAD_IN_DURATION} layout="none">
        <Audio src={staticFile("audio/voiceover.mp3")} />
      </Sequence>
      <Sequence
        from={LEAD_IN_DURATION}
        durationInFrames={videoDuration - LEAD_IN_DURATION}
        layout="none"
      >
        <Audio
          src={staticFile("audio/background.mp3")}
          volume={(f) =>
            f > videoDuration - LEAD_IN_DURATION - BG_FADE_OUT_FRAMES
              ? BG_VOLUME *
                Math.max(
                  0,
                  (videoDuration - LEAD_IN_DURATION - f) / BG_FADE_OUT_FRAMES,
                )
              : BG_VOLUME
          }
        />
      </Sequence>

      <Sequence from={LEAD_IN_DURATION} layout="none">
        <TransitionSeries>
          <TransitionSeries.Sequence durationInFrames={intro}>
            <IntroScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={crossZoom()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          <TransitionSeries.Sequence durationInFrames={hook}>
            <HookScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={crossZoom()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          <TransitionSeries.Sequence durationInFrames={explicacion}>
            <ExplicacionScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={crossZoom()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          <TransitionSeries.Sequence durationInFrames={solucion}>
            <SolucionScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={crossZoom()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          <TransitionSeries.Sequence durationInFrames={supermoney}>
            <SupermoneyScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={crossZoom()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          <TransitionSeries.Sequence durationInFrames={cierre}>
            <CierreScene />
          </TransitionSeries.Sequence>
        </TransitionSeries>
      </Sequence>
    </AbsoluteFill>
  );
};

