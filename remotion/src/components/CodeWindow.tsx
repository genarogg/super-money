import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fonts } from "../theme";

type Props = {
  title?: string;
  lines: React.ReactNode[];
  /** Frame en el que empieza a aparecer cada línea (una por índice). Si se omite, todas aparecen desde el frame 0 del componente. */
  lineStartFrames?: number[];
  width?: number;
  fontSize?: number;
  dot?: "error" | "ok" | "neutral";
};

/**
 * Ventana estilo terminal/editor. Recibe líneas ya compuestas (con spans de
 * color) para máxima flexibilidad de resaltado de sintaxis manual.
 */
export const CodeWindow: React.FC<Props> = ({
  title = "console",
  lines,
  lineStartFrames,
  width = 900,
  fontSize = 28,
  dot = "neutral",
}) => {
  const frame = useCurrentFrame();

  const dotColor =
    dot === "error" ? colors.error : dot === "ok" ? colors.ok : colors.textFaint;

  return (
    <div
      style={{
        width,
        borderRadius: 14,
        overflow: "hidden",
        background: colors.bgPanel,
        border: `1px solid ${colors.border}`,
        boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 20px",
          background: colors.bgPanelAlt,
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <div style={{ display: "flex", gap: 7 }}>
          <span style={dotStyle("#ff5f56")} />
          <span style={dotStyle("#ffbd2e")} />
          <span style={dotStyle("#27c93f")} />
        </div>
        <span
          style={{
            marginLeft: 8,
            fontFamily: fonts.mono,
            fontSize: 15,
            color: colors.textDim,
          }}
        >
          {title}
        </span>
        <div
          style={{
            marginLeft: "auto",
            width: 8,
            height: 8,
            borderRadius: 999,
            background: dotColor,
            boxShadow: dot !== "neutral" ? `0 0 12px ${dotColor}` : undefined,
          }}
        />
      </div>
      <div
        style={{
          padding: "26px 30px",
          fontFamily: fonts.mono,
          fontSize,
          lineHeight: 1.65,
        }}
      >
        {lines.map((line, i) => {
          const startFrame = lineStartFrames?.[i] ?? 0;
          const localFrame = frame - startFrame;
          const opacity = interpolate(localFrame, [0, 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const x = interpolate(localFrame, [0, 10], [-14, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `translateX(${x}px)`,
                whiteSpace: "pre",
                color: colors.text,
              }}
            >
              {line}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const dotStyle = (bg: string): React.CSSProperties => ({
  width: 13,
  height: 13,
  borderRadius: 999,
  background: bg,
  display: "inline-block",
});

// ─── helpers de sintaxis ────────────────────────────────────────────────────

export const kw = (text: string) => (
  <span style={{ color: colors.syntaxKeyword }}>{text}</span>
);
export const str = (text: string) => (
  <span style={{ color: colors.syntaxString }}>{text}</span>
);
export const num = (text: string) => (
  <span style={{ color: colors.syntaxNumber }}>{text}</span>
);
export const fn = (text: string) => (
  <span style={{ color: colors.syntaxFn }}>{text}</span>
);
export const comment = (text: string) => (
  <span style={{ color: colors.syntaxComment }}>{text}</span>
);
export const plain = (text: string) => (
  <span style={{ color: colors.text }}>{text}</span>
);
export const errorText = (text: string) => (
  <span style={{ color: colors.error, fontWeight: 700 }}>{text}</span>
);
export const okText = (text: string) => (
  <span style={{ color: colors.ok, fontWeight: 700 }}>{text}</span>
);
