import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Scene } from "../components/Scene";
import { CodeWindow, kw, num, plain } from "../components/CodeWindow";
import { colors, fonts } from "../theme";
import { useOrientation } from "../useOrientation";

/**
 * 0:45 - 2:15 → por qué pasa (binario vs decimal) + el ejemplo clásico del
 * carrito de 3 productos a $19.99 que da 59.96999999999999.
 * Dividida en dos beats dentro de la misma escena: (a) frase-concepto,
 * (b) el código del carrito con el resultado corrupto resaltado.
 */
export const ExplicacionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { isVertical, scale } = useOrientation();

  // Beat A: frase de concepto (0.1 no se puede escribir exacto en binario)
  const beatAOpacity = interpolate(frame, [0, 30, 380, 420], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Beat B: el código del carrito, entra cuando A se está yendo
  const beatBStart = 400;
  const beatBOpacity = interpolate(
    frame,
    [beatBStart, beatBStart + 40],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const bFrame = frame - beatBStart;

  const cartLines = [
    <React.Fragment key="l0">{kw("let ")}{plain("total = ")}{num("0")}{plain(";")}</React.Fragment>,
    <React.Fragment key="l1">{plain("total += ")}{num("19.99")}{plain(";")}</React.Fragment>,
    <React.Fragment key="l2">{plain("total += ")}{num("19.99")}{plain(";")}</React.Fragment>,
    <React.Fragment key="l3">{plain("total += ")}{num("19.99")}{plain(";")}</React.Fragment>,
  ];

  return (
    <Scene label="02 — por qué pasa">
      {beatAOpacity > 0 && bFrame < 0 ? (
        <div
          style={{
            opacity: beatAOpacity,
            maxWidth: isVertical ? 900 : 980,
            textAlign: "center",
            padding: "0 60px",
          }}
        >
          <p
            style={{
              fontSize: 40 * scale,
              lineHeight: 1.6,
              color: colors.text,
              fontWeight: 600,
            }}
          >
            Las computadoras guardan decimales en{" "}
            <span style={{ color: colors.accent }}>binario</span>.
          </p>
          <p style={{ fontSize: 32 * scale, lineHeight: 1.6, color: colors.textDim }}>
            Así como 1/3 no es exacto en base 10, <br />
            <span style={{ color: colors.text }}>0.1</span> no es exacto en
            base 2. Se guarda <span style={{ color: colors.error }}>aproximado</span>.
          </p>
        </div>
      ) : null}

      {beatBOpacity > 0 ? (
        <div
          style={{
            opacity: beatBOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 40 * scale,
          }}
        >
          <div style={{ fontSize: 30 * scale, color: colors.textDim, textAlign: "center" }}>
            Un carrito con 3 productos a <span style={{ color: colors.text }}>$19.99</span>
          </div>
          <CodeWindow
            title="carrito.js"
            width={760}
            fontSize={28}
            lines={cartLines}
          />

          {bFrame > 120 ? (
            <ResultLine frame={bFrame - 120} />
          ) : null}
        </div>
      ) : null}
    </Scene>
  );
};

const ResultLine: React.FC<{ frame: number }> = ({ frame }) => {
  const { isVertical, scale } = useOrientation();
  const opacity = interpolate(frame, [0, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shake =
    frame < 80
      ? Math.sin(frame * 0.7) * interpolate(frame, [0, 20, 80], [4, 4, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${shake}px)`,
        fontFamily: fonts.mono,
        fontSize: 42 * scale,
        display: "flex",
        flexDirection: isVertical ? "column" : "row",
        alignItems: isVertical ? "center" : "baseline",
        gap: isVertical ? 8 : 16,
        textAlign: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
        <span style={{ color: colors.textDim }}>console.log(total)</span>
        <span style={{ color: colors.textFaint }}>→</span>
        <span style={{ color: colors.error, fontWeight: 700 }}>
          59.96999999999999
        </span>
      </div>
      <span style={{ color: colors.textDim, fontSize: 26 * scale }}>
        no es{" "}
        <span style={{ color: colors.ok, fontFamily: fonts.mono }}>59.97</span>
      </span>
    </div>
  );
};
