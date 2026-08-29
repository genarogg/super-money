import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Scene } from "../components/Scene";
import { CodeWindow, comment, fn, num, plain } from "../components/CodeWindow";
import { colors, fonts } from "../theme";
import { useOrientation } from "../useOrientation";

/**
 * 00 — Intro (nueva, antepone al hook original de 0.1 + 0.2).
 *
 * Narrativa en dos tiempos, dentro de UNA sola escena:
 *   A) el código: un saldo que suma 0.10 en cada "día" (simulando un
 *      depósito diario, interés, o cualquier operación recurrente) —
 *      3000 iteraciones, en un `for`.
 *   B) el tiempo pasando: un contador de días avanza rápido y el saldo
 *      mostrado en grande empieza IGUAL al esperado, pero a partir de
 *      cierto punto se separa visiblemente — el error de cada suma se
 *      va acumulando hasta ser innegable.
 *
 * Los números son reales (calculados con la aritmética de punto flotante
 * de JS), no decorativos: 3000 sumas de 0.1 en JS no dan 300, dan
 * 299.9999999999997 — la separación que se ve en pantalla es ese error.
 */

const DAYS_TOTAL = 3000;
const DAILY_AMOUNT = 0.1;

// Simulación real de punto flotante — el mismo cálculo que haría el motor
// de JS en el navegador de quien mire el video.
const computeFloatBalance = (days: number): number => {
  let total = 0;
  for (let i = 0; i < days; i++) {
    total += DAILY_AMOUNT;
  }
  return total;
};

const codeLines = [
  [comment("// un depósito diario de 0.10, durante años")],
  [
    plain("let saldo = "),
    num("0"),
    plain(";"),
  ],
  [
    fn("for"),
    plain(" (let dia = "),
    num("0"),
    plain("; dia < "),
    num("3000"),
    plain("; dia++) {"),
  ],
  [plain("  saldo += "), num("0.10"), plain(";")],
  [plain("}")],
];

const fadeIn = (frame: number, start: number, dur = 24) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { isVertical, scale } = useOrientation();

  // ── Momento A: el código aparece primero, solo ──────────────────────────
  const codeOpacity = fadeIn(frame, 0);
  const codeExitOpacity = interpolate(frame, [190, 220], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const codeShrink = interpolate(frame, [190, 230], [1, 0.62], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const codeShiftUp = interpolate(frame, [190, 230], [0, -270], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Momento B: el contador de días corre, dos saldos se separan ────────
  const counterStart = 210;
  const counterOpacity = fadeIn(frame, counterStart);

  // El contador de "días" avanza rápido durante ~4.5s y se detiene en 3000.
  const runDuration = 270; // frames en los que el contador corre
  const runProgress = interpolate(
    frame,
    [counterStart, counterStart + runDuration],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  // Easing simple hacia el final (desacelera, como si "llegara" a los 3000).
  const easedProgress = 1 - Math.pow(1 - runProgress, 3);
  const dayCount = Math.round(easedProgress * DAYS_TOTAL);

  const expectedBalance = dayCount * DAILY_AMOUNT; // lo que "debería" dar
  const floatBalance = computeFloatBalance(dayCount); // lo que da JS de verdad
  const drift = floatBalance - expectedBalance;

  // El error real recién se vuelve visible en el string a partir de cierta
  // cantidad de días — antes de eso ambos números se ven "iguales" a simple
  // vista (aunque por debajo ya hay imprecisión). Mostramos el drift solo
  // cuando ya tiene un tamaño legible, para que la revelación tenga peso.
  const driftVisible = Math.abs(drift) > 1e-9;

  // toFixed(13) de un entero exacto (ej. 0, o cualquier suma que por
  // casualidad cierre redonda) deja "0.0000000000000" — el replace de ceros
  // finales lo dejaría en "0." (feo). Si tras recortar ceros sobra un punto
  // colgando, se remueve también.
  const formatFloatBalance = (n: number): string =>
    n.toFixed(13).replace(/0+$/, "").replace(/\.$/, "");
  const driftHighlightStart = counterStart + Math.round(runDuration * 0.55);
  const driftPulse =
    Math.sin((frame - driftHighlightStart) / 10) * 0.5 + 0.5;

  const labelOpacity = fadeIn(frame, counterStart + 20);
  const titleOpacity = fadeIn(frame, counterStart + runDuration + 20);

  return (
    <Scene label="00 — con el tiempo">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40 * scale,
        }}
      >
        {codeOpacity > 0 && codeExitOpacity > 0 ? (
          <div
            style={{
              opacity: Math.min(codeOpacity, codeExitOpacity),
              transform: `scale(${codeShrink}) translateY(${codeShiftUp}px)`,
            }}
          >
            <CodeWindow
              title="saldo.js"
              width={720}
              fontSize={26}
              lines={codeLines}
              dot="neutral"
            />
          </div>
        ) : null}

        {counterOpacity > 0 ? (
          <div
            style={{
              opacity: counterOpacity,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 26 * scale,
              marginTop: -40 * scale,
            }}
          >
            <div
              style={{
                opacity: labelOpacity,
                fontFamily: fonts.mono,
                fontSize: 24 * scale,
                color: colors.textDim,
                letterSpacing: 1,
              }}
            >
              día <span style={{ color: colors.text }}>{dayCount}</span>{" "}
              / {DAYS_TOTAL}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: isVertical ? "column" : "row",
                gap: isVertical ? 34 : 60,
                alignItems: "center",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20 * scale, color: colors.textDim, marginBottom: 10 }}>
                  saldo esperado
                </div>
                <div
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 46 * scale,
                    fontWeight: 700,
                    color: colors.text,
                  }}
                >
                  {expectedBalance.toFixed(2)}
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20 * scale, color: colors.textDim, marginBottom: 10 }}>
                  saldo real (JS)
                </div>
                <div
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 46 * scale,
                    fontWeight: 700,
                    color: driftVisible ? colors.error : colors.text,
                    textShadow: driftVisible
                      ? `0 0 ${14 + driftPulse * 18}px ${colors.error}`
                      : undefined,
                  }}
                >
                  {formatFloatBalance(floatBalance)}
                </div>
              </div>
            </div>

            {driftVisible ? (
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 22 * scale,
                  color: colors.error,
                }}
              >
                diferencia: {drift.toExponential(3)}
              </div>
            ) : (
              <div style={{ fontSize: 22 * scale, color: colors.textFaint }}>
                por ahora, coinciden...
              </div>
            )}
          </div>
        ) : null}

        <div
          style={{
            opacity: titleOpacity,
            textAlign: "center",
            maxWidth: isVertical ? 900 : 820,
            padding: "0 40px",
          }}
        >
          <div style={{ fontSize: 30 * scale, color: colors.text, lineHeight: 1.5 }}>
            Una operación así, sola, casi no se nota.
          </div>
          <div style={{ fontSize: 30 * scale, color: colors.text, lineHeight: 1.5, marginTop: 6 }}>
            Repetida miles de veces —{" "}
            <span style={{ color: colors.error, fontWeight: 700 }}>
              con el tiempo
            </span>
            , se vuelve un problema real.
          </div>
        </div>
      </div>
    </Scene>
  );
};
