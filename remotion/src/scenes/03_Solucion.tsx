import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Scene } from "../components/Scene";
import { CodeWindow, kw, num, plain } from "../components/CodeWindow";
import { colors, fonts } from "../theme";

/**
 * 2:15 - 4:00 → la regla de oro: nunca guardar dinero como decimal, guardar
 * siempre como entero en la unidad más pequeña (centavos). Reusa el mismo
 * carrito de la escena anterior pero en centavos — el contraste directo
 * (mismo escenario, escena anterior vs esta) es lo que vende la solución.
 */
export const SolucionScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const codeStart = 45;
  const codeOpacity = interpolate(frame, [codeStart, codeStart + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const resultStart = codeStart + 70;
  const resultOpacity = interpolate(
    frame,
    [resultStart, resultStart + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const ruleStart = resultStart + 45;
  const ruleOpacity = interpolate(
    frame,
    [ruleStart, ruleStart + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const cartLines = [
    [kw("let "), plain("totalCents = "), num("0"), plain(";")],
    [plain("totalCents += "), num("1999"), plain(";")],
    [plain("totalCents += "), num("1999"), plain(";")],
    [plain("totalCents += "), num("1999"), plain(";")],
  ];

  return (
    <Scene label="03 — la solución">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 36,
          padding: "0 40px",
        }}
      >
        <div style={{ opacity: titleOpacity, textAlign: "center", maxWidth: 900 }}>
          <div style={{ fontSize: 26, color: colors.textDim, marginBottom: 10 }}>
            La regla de los sistemas bancarios:
          </div>
          <div style={{ fontSize: 38, fontWeight: 700, color: colors.text, lineHeight: 1.4 }}>
            Nunca guardes dinero como decimal.
            <br />
            Guárdalo como{" "}
            <span style={{ color: colors.ok }}>entero</span>, en la unidad
            más pequeña de la moneda.
          </div>
        </div>

        {codeOpacity > 0 ? (
          <div style={{ opacity: codeOpacity, display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
            <div style={{ fontSize: 24, color: colors.textDim }}>
              Mismo carrito. $19.99 → <span style={{ color: colors.ok }}>1999</span> centavos.
            </div>
            <CodeWindow
              title="carrito.js"
              width={760}
              fontSize={28}
              lines={cartLines}
              dot="ok"
            />
          </div>
        ) : null}

        {resultOpacity > 0 ? (
          <div
            style={{
              opacity: resultOpacity,
              fontFamily: fonts.mono,
              fontSize: 42,
              display: "flex",
              alignItems: "baseline",
              gap: 16,
            }}
          >
            <span style={{ color: colors.textDim }}>console.log(totalCents)</span>
            <span style={{ color: colors.textFaint }}>→</span>
            <span
              style={{
                color: colors.ok,
                fontWeight: 700,
                textShadow: `0 0 20px ${colors.okDim}`,
              }}
            >
              5997
            </span>
            <span style={{ color: colors.textDim, fontSize: 26 }}>exacto. siempre.</span>
          </div>
        ) : null}

        {ruleOpacity > 0 ? (
          <div
            style={{
              opacity: ruleOpacity,
              marginTop: 6,
              maxWidth: 820,
              textAlign: "center",
              fontSize: 26,
              color: colors.textDim,
              lineHeight: 1.6,
            }}
          >
            El decimal (<span style={{ color: colors.text }}>$59.97</span>) es solo{" "}
            <span style={{ color: colors.text, fontWeight: 700 }}>presentación</span>.
            Solo conviertes al final, justo antes de mostrarlo en pantalla.
          </div>
        ) : null}
      </div>
    </Scene>
  );
};
