import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Scene } from "../components/Scene";
import { CodeWindow, plain } from "../components/CodeWindow";
import { colors, fonts } from "../theme";

/**
 * 0:00 - 0:45 del guion → "Abre la consola y escribe esto: 0.1 + 0.2"
 * El resultado 0.30000000000000004 aparece como si la consola lo hubiera
 * evaluado, con un golpe de énfasis en rojo sobre los dígitos "de más".
 */
export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const inputLine = [plain("0.1 + 0.2")];

  // El resultado aparece después de una pequeña pausa, como si la consola
  // "pensara" un instante antes de mostrar el número raro.
  const resultDelay = 80;
  const resultSpring = spring({
    frame: frame - resultDelay,
    fps,
    config: { damping: 14, mass: 0.5 },
  });
  const resultOpacity = interpolate(resultSpring, [0, 1], [0, 1]);
  const resultScale = interpolate(resultSpring, [0, 1], [0.85, 1]);

  // Los dígitos "de más" (todo después de 0.3) laten en rojo para que el ojo
  // los encuentre de inmediato.
  const pulse = Math.sin((frame - resultDelay) / 12) * 0.5 + 0.5;

  // Titular final, entra tarde para no competir con el número
  const titleDelay = 160;
  const titleOpacity = interpolate(
    frame,
    [titleDelay, titleDelay + 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <Scene label="01 — el bug">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 46 }}>
        <CodeWindow
          title="console"
          width={780}
          fontSize={34}
          lines={[inputLine]}
          dot="neutral"
        />

        {resultOpacity > 0 ? (
          <div
            style={{
              opacity: resultOpacity,
              transform: `scale(${resultScale})`,
              fontFamily: fonts.mono,
              fontSize: 56,
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            <span style={{ color: colors.textDim, fontSize: 32 }}>{"// "}</span>
            <span style={{ color: colors.text }}>0.3</span>
            <span
              style={{
                color: colors.error,
                textShadow: `0 0 ${16 + pulse * 20}px ${colors.error}`,
              }}
            >
              0000000000000004
            </span>
          </div>
        ) : null}

        <div style={{ opacity: titleOpacity, textAlign: "center" }}>
          <div
            style={{
              fontSize: 30,
              color: colors.textDim,
              maxWidth: 760,
              lineHeight: 1.5,
            }}
          >
            ¿Esperabas <span style={{ color: colors.text, fontWeight: 700 }}>0.3</span>?
          </div>
        </div>
      </div>
    </Scene>
  );
};
