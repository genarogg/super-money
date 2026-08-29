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
 * Video completo: "super-money — dinero sin errores de punto flotante".
 * Cada escena vive en su propio TransitionSeries.Sequence según las
 * duraciones de theme.sceneDurations, en orden: intro (el mismo error
 * repetido con el tiempo) → gancho → explicación → solución → supermoney →
 * cierre, encadenadas con una transición crossZoom (zoom + blur cruzado,
 * ver ./transitions/crossZoom.ts) en vez de cortes secos.
 *
 * El voice-over (public/audio/voiceover.mp3, generado con ElevenLabs, voz
 * "Carolina G") dura 95.0s y sceneDurations fue calibrado originalmente a
 * esa duración — ver guion-supermoney.md para el texto narrado tramo por
 * tramo. NOTA: la escena `intro` es nueva y todavía no tiene línea de voz
 * propia (ver comentario en theme.ts) — con ella y las 5 transiciones
 * (antes 4) el video real es más largo que el audio actual; pendiente
 * regenerar/editar el audio para que cuadre con theme.videoDuration.
 *
 * Música de fondo (public/audio/background.mp3) suena por debajo de la voz
 * a volumen fijo del 20%, recortada a la duración total del video con un
 * fade-out corto al final para no cortar en seco.
 *
 * LEAD_IN_DURATION (1s, ver theme.ts) es un colchón de negro/silencio antes
 * de que arranque cualquier cosa — video, voz y música parten todos de
 * `LEAD_IN_DURATION` en vez de 0, así el primer corte no se siente
 * apresurado. La duración total de la composición (videoDuration) ya
 * incluye ese segundo extra.
 */
const BG_VOLUME = 0.1;
const BG_FADE_OUT_FRAMES = 1 * FPS; // 1s de fade-out al cierre

export const MainVideo: React.FC = () => {
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
