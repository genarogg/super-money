import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Scene } from "../components/Scene";
import { colors, fonts } from "../theme";

/**
 * 6:30 - fin → la regla de oro final, dicha en una línea, y el logo de
 * supermoney como remate. Nada de código acá: es el único momento del
 * video donde el mensaje se dice sin ilustrarlo con una consola, a
 * propósito, para que aterrice como conclusión y no como otro ejemplo más.
 */
export const CierreScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ruleSpring = spring({ frame, fps, config: { damping: 16 } });
  const ruleOpacity = interpolate(ruleSpring, [0, 1], [0, 1]);
  const ruleY = interpolate(ruleSpring, [0, 1], [16, 0]);

  const logoDelay = 55;
  const logoSpring = spring({
    frame: frame - logoDelay,
    fps,
    config: { damping: 12, mass: 0.6 },
  });
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);
  const logoScale = interpolate(logoSpring, [0, 1], [0.7, 1]);

  return (
    <Scene>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 60 }}>
        <div
          style={{
            opacity: ruleOpacity,
            transform: `translateY(${ruleY}px)`,
            textAlign: "center",
            maxWidth: 920,
            padding: "0 50px",
          }}
        >
          <div style={{ fontSize: 34, color: colors.textDim, marginBottom: 18, lineHeight: 1.5 }}>
            La regla no es "ten cuidado con los decimales".
          </div>
          <div style={{ fontSize: 46, fontWeight: 800, color: colors.text, lineHeight: 1.4 }}>
            Es: no uses decimales para calcular.
            <br />
            Guarda <span style={{ color: colors.ok }}>enteros</span>.
          </div>
        </div>

        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 56,
              fontWeight: 700,
              color: colors.text,
            }}
          >
            super<span style={{ color: colors.ok }}>money</span>
          </div>
          <div style={{ fontSize: 22, color: colors.textDim }}>
            input · showMoney · moneyToString
          </div>
        </div>
      </div>
    </Scene>
  );
};
