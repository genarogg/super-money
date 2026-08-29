import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Scene } from "../components/Scene";
import { CodeWindow, kw, num, plain } from "../components/CodeWindow";
import { colors, fonts } from "../theme";

/**
 * 0:45 - 2:15 → por qué pasa (binario vs decimal) + el ejemplo clásico del
 * carrito de 3 productos a $19.99 que da 59.96999999999999.
 * Dividida en dos beats dentro de la misma escena: (a) frase-concepto,
 * (b) el código del carrito con el resultado corrupto resaltado.
 */
export const ExplicacionScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Beat A: frase de concepto (0.1 no se puede escribir exacto en binario)
  const beatAOpacity = interpolate(frame, [0, 15, 190, 210], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Beat B: el código del carrito, entra cuando A se está yendo
  const beatBStart = 200;
  const beatBOpacity = interpolate(
    frame,
    [beatBStart, beatBStart + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const bFrame = frame - beatBStart;

  const cartLines = [
    [kw("let "), plain("total = "), num("0"), plain(";")],
    [plain("total += "), num("19.99"), plain(";")],
    [plain("total += "), num("19.99"), plain(";")],
    [plain("total += "), num("19.99"), plain(";")],
  ];

  return (
    <Scene label="02 — por qué pasa">
      {beatAOpacity > 0 && bFrame < 0 ? (
        <div
          style={{
            opacity: beatAOpacity,
            maxWidth: 980,
            textAlign: "center",
            padding: "0 60px",
          }}
        >
          <p
            style={{
              fontSize: 40,
              lineHeight: 1.6,
              color: colors.text,
              fontWeight: 600,
            }}
          >
            Las computadoras guardan decimales en{" "}
            <span style={{ color: colors.accent }}>binario</span>.
          </p>
          <p style={{ fontSize: 32, lineHeight: 1.6, color: colors.textDim }}>
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
            gap: 40,
          }}
        >
          <div style={{ fontSize: 30, color: colors.textDim, textAlign: "center" }}>
            Un carrito con 3 productos a <span style={{ color: colors.text }}>$19.99</span>
          </div>
          <CodeWindow
            title="carrito.js"
            width={760}
            fontSize={28}
            lines={cartLines}
          />

          {bFrame > 60 ? (
            <ResultLine frame={bFrame - 60} />
          ) : null}
        </div>
      ) : null}
    </Scene>
  );
};

const ResultLine: React.FC<{ frame: number }> = ({ frame }) => {
  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shake =
    frame < 40
      ? Math.sin(frame * 1.4) * interpolate(frame, [0, 10, 40], [4, 4, 0], {
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
        fontSize: 42,
        display: "flex",
        alignItems: "baseline",
        gap: 16,
      }}
    >
      <span style={{ color: colors.textDim }}>console.log(total)</span>
      <span style={{ color: colors.textFaint }}>→</span>
      <span style={{ color: colors.error, fontWeight: 700 }}>
        59.96999999999999
      </span>
      <span style={{ color: colors.textDim, fontSize: 26 }}>
        {"  "}no es{" "}
        <span style={{ color: colors.ok, fontFamily: fonts.mono }}>59.97</span>
      </span>
    </div>
  );
};
