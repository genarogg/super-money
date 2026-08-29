import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fonts } from "../theme";

// Cada tecla presionada y el estado de `cents` resultante — simula
// exactamente el comportamiento real de activateMoneyInput.ts: los dígitos
// entran por la derecha y empujan el resto, como un cajero automático.
const KEYSTROKES = ["1", "9", "9", "9"];

const centsToDisplay = (cents: number): string => {
  const str = String(cents).padStart(3, "0");
  const intPart = str.slice(0, -2) || "0";
  const decPart = str.slice(-2);
  return `${intPart}.${decPart}`;
};

type Props = {
  /** Frame local en el que empieza cada tecla (debe tener mismo length que KEYSTROKES) */
  keyFrames: number[];
};

/**
 * Simula visualmente el input tipo ATM de supermoney: un recuadro de input
 * donde los dígitos entran por la derecha, igual que activateMoneyInput.ts.
 */
export const AtmInputDemo: React.FC<Props> = ({ keyFrames }) => {
  const frame = useCurrentFrame();

  let cents = 0;
  let activeKeyIndex = -1;
  for (let i = 0; i < KEYSTROKES.length; i++) {
    if (frame >= keyFrames[i]) {
      cents = cents * 10 + parseInt(KEYSTROKES[i], 10);
      activeKeyIndex = i;
    }
  }

  const flashFrame = frame - (keyFrames[activeKeyIndex] ?? -999);
  const flash = interpolate(flashFrame, [0, 16, 40], [1, 0.4, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 18,
          color: colors.textDim,
          letterSpacing: 0.5,
        }}
      >
        {'<input type="money" decimals="2" />'}
      </div>
      <div
        style={{
          position: "relative",
          padding: "22px 40px",
          borderRadius: 12,
          background: colors.bgPanel,
          border: `2px solid ${activeKeyIndex >= 0 ? colors.accent : colors.border}`,
          boxShadow:
            flash > 0
              ? `0 0 ${20 + flash * 30}px ${colors.accentDim}`
              : "0 20px 50px rgba(0,0,0,0.4)",
        }}
      >
        <span
          style={{
            fontFamily: fonts.mono,
            fontSize: 52,
            fontWeight: 700,
            color: colors.text,
            letterSpacing: 2,
          }}
        >
          $ {centsToDisplay(cents)}
        </span>
        <span
          style={{
            display: "inline-block",
            width: 3,
            height: 44,
            marginLeft: 8,
            background: colors.accent,
            opacity: Math.sin(frame / 8) > 0 ? 1 : 0,
            verticalAlign: "middle",
          }}
        />
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        {KEYSTROKES.map((k, i) => {
          const pressed = frame >= keyFrames[i];
          const isActive = i === activeKeyIndex;
          return (
            <div
              key={i}
              style={{
                width: 44,
                height: 44,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: fonts.mono,
                fontSize: 22,
                fontWeight: 700,
                color: pressed ? colors.bg : colors.textFaint,
                background: pressed ? colors.accent : colors.bgPanel,
                border: `1px solid ${pressed ? colors.accent : colors.border}`,
                transform: isActive ? "scale(1.12)" : "scale(1)",
                transition: "none",
              }}
            >
              {k}
            </div>
          );
        })}
      </div>
    </div>
  );
};
