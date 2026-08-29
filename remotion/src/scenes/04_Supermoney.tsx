import React from "react";
import { interpolate, Sequence, useCurrentFrame } from "remotion";
import { Scene } from "../components/Scene";
import { CodeWindow, comment, fn, kw, num, plain, str } from "../components/CodeWindow";
import { AtmInputDemo } from "../components/AtmInputDemo";
import { colors, fonts, FPS } from "../theme";

/**
 * 4:00 - 6:30 → qué resuelve supermoney: input ATM, HTML vanilla, integración
 * React, showMoney, moneyToString, y el límite real (MAX_SAFE_INTEGER). Se
 * divide en sub-secuencias internas con Sequence para que cada sub-tema
 * tenga su propio "frame 0" sin tener que hacer aritmética de offsets a
 * mano en cada componente.
 *
 * Duraciones ajustadas al voice-over real (voiceover.mp3) — ver
 * guion-supermoney.md para el texto exacto narrado en cada beat.
 */
const INTRO_DUR = 4 * FPS;
const ATM_DUR = 6 * FPS;
const HTML_DUR = 8 * FPS;
const INSTALL_DUR = 6 * FPS;
const REACT_DUR = 10 * FPS;
const SHOW_DUR = 3 * FPS;
const STRING_DUR = 3 * FPS;
const LIMIT_DUR = 3 * FPS;

export const SupermoneyScene: React.FC = () => {
  return (
    <Scene label="04 — supermoney">
      <Sequence from={0} durationInFrames={INTRO_DUR} layout="none">
        <IntroBeat />
      </Sequence>
      <Sequence from={INTRO_DUR} durationInFrames={ATM_DUR} layout="none">
        <AtmBeat />
      </Sequence>
      <Sequence from={INTRO_DUR + ATM_DUR} durationInFrames={HTML_DUR} layout="none">
        <HtmlVanillaBeat />
      </Sequence>
      <Sequence
        from={INTRO_DUR + ATM_DUR + HTML_DUR}
        durationInFrames={INSTALL_DUR}
        layout="none"
      >
        <InstallBeat />
      </Sequence>
      <Sequence
        from={INTRO_DUR + ATM_DUR + HTML_DUR + INSTALL_DUR}
        durationInFrames={REACT_DUR}
        layout="none"
      >
        <ReactBeat />
      </Sequence>
      <Sequence
        from={INTRO_DUR + ATM_DUR + HTML_DUR + INSTALL_DUR + REACT_DUR}
        durationInFrames={SHOW_DUR}
        layout="none"
      >
        <ShowMoneyBeat />
      </Sequence>
      <Sequence
        from={INTRO_DUR + ATM_DUR + HTML_DUR + INSTALL_DUR + REACT_DUR + SHOW_DUR}
        durationInFrames={STRING_DUR}
        layout="none"
      >
        <MoneyToStringBeat />
      </Sequence>
      <Sequence
        from={
          INTRO_DUR + ATM_DUR + HTML_DUR + INSTALL_DUR + REACT_DUR + SHOW_DUR + STRING_DUR
        }
        durationInFrames={LIMIT_DUR}
        layout="none"
      >
        <LimitBeat />
      </Sequence>
    </Scene>
  );
};

const fadeIn = (frame: number, dur = 15) =>
  interpolate(frame, [0, dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const IntroBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = fadeIn(frame);
  return (
    <div style={{ opacity, textAlign: "center", maxWidth: 920, padding: "0 50px" }}>
      <div style={{ fontSize: 26, color: colors.textDim, marginBottom: 14 }}>
        Ese principio empaquetado en una librería:
      </div>
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 64,
          fontWeight: 700,
          color: colors.text,
        }}
      >
        super<span style={{ color: colors.ok }}>money</span>
      </div>
      <div style={{ fontSize: 28, color: colors.textDim, marginTop: 18, lineHeight: 1.5 }}>
        Inputs de dinero para la web. Siempre en enteros.
        <br />
        Nunca deja que el punto flotante se cuele.
      </div>
    </div>
  );
};

const AtmBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = fadeIn(frame);
  // teclas: 1, 9, 9, 9 → $19.99, espaciadas para que se vean entrar una por una
  const keyFrames = [40, 55, 70, 85];

  const eventStart = 130;
  const eventOpacity = interpolate(
    frame,
    [eventStart, eventStart + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const eventLines = [
    [
      plain("input.addEventListener("),
      str("'money-input'"),
      plain(", (e) => {"),
    ],
    [plain("  console.log(e.detail.value); "), comment("// 1999")],
    [plain("});")],
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 34 }}>
      <div style={{ opacity: titleOpacity, fontSize: 30, color: colors.text, fontWeight: 600 }}>
        1. El input, modo ATM
      </div>
      <AtmInputDemo keyFrames={keyFrames} />
      {eventOpacity > 0 ? (
        <div style={{ opacity: eventOpacity }}>
          <CodeWindow title="listener.js" width={640} fontSize={22} lines={eventLines} dot="ok" />
        </div>
      ) : null}
    </div>
  );
};

const HtmlVanillaBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = fadeIn(frame);

  const codeStart = 20;
  const codeOpacity = interpolate(
    frame,
    [codeStart, codeStart + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const noteStart = codeStart + 130;
  const noteOpacity = interpolate(
    frame,
    [noteStart, noteStart + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Un solo archivo .html, sin bundler, sin npm install: <script> por CDN
  // + auto-inicialización de los inputs money del DOM. Este es el ejemplo
  // que demuestra que supermoney funciona en CUALQUIER stack — PHP, Rails,
  // WordPress, un HTML servido por Python, lo que sea — porque no depende
  // de nada más que el navegador cargando un <script>.
  const htmlLines = [
    [plain("<!doctype html>")],
    [plain("<html>")],
    [plain("  <body>")],
    [plain("    "), comment("<!-- el input tipo ATM -->")],
    [
      plain('    <input type="'),
      str("money"),
      plain('" decimals="'),
      str("2"),
      plain('" />'),
    ],
    [plain("")],
    [
      plain('    <script src="'),
      str("https://cdn.jsdelivr.net/npm/supermoney/dist/supermoney.umd.js"),
      plain('"></script>'),
    ],
    [
      plain("    <script>"),
    ],
    [plain("      "), fn("supermoney"), plain("."), fn("initMoneyInputs"), plain("();")],
    [plain("    </script>")],
    [plain("  </body>")],
    [plain("</html>")],
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
      <div style={{ opacity: titleOpacity, fontSize: 30, color: colors.text, fontWeight: 600 }}>
        2. Un solo HTML, sin build
      </div>
      {codeOpacity > 0 ? (
        <div style={{ opacity: codeOpacity }}>
          <CodeWindow
            title="index.html"
            width={780}
            fontSize={19}
            lines={htmlLines}
            dot="ok"
          />
        </div>
      ) : null}
      {noteOpacity > 0 ? (
        <div
          style={{
            opacity: noteOpacity,
            maxWidth: 820,
            textAlign: "center",
            fontSize: 24,
            color: colors.textDim,
            lineHeight: 1.6,
            padding: "0 30px",
          }}
        >
          Sin <span style={{ color: colors.text }}>npm install</span>, sin
          bundler. El{" "}
          <span style={{ color: colors.accent }}>{"<script>"}</span> se
          carga en el DOM y ya — funciona igual en PHP, Rails, WordPress o
          cualquier backend que sirva HTML.
        </div>
      ) : null}
    </div>
  );
};

const InstallBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = fadeIn(frame);

  const codeStart = 15;
  const codeOpacity = interpolate(
    frame,
    [codeStart, codeStart + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const noteStart = codeStart + 80;
  const noteOpacity = interpolate(
    frame,
    [noteStart, noteStart + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Si el proyecto ya usa un bundler (pnpm workspaces, Vite, etc.), este es
  // el camino de instalación estándar — la alternativa al <script> por CDN
  // del beat anterior.
  const installLines = [
    [comment("# instalar como dependencia del proyecto")],
    [plain("pnpm add "), fn("supermoney")],
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
      <div style={{ opacity: titleOpacity, fontSize: 30, color: colors.text, fontWeight: 600 }}>
        Con un bundler: instalación por pnpm
      </div>
      {codeOpacity > 0 ? (
        <div style={{ opacity: codeOpacity }}>
          <CodeWindow
            title="terminal"
            width={640}
            fontSize={26}
            lines={installLines}
            dot="ok"
          />
        </div>
      ) : null}
      {noteOpacity > 0 ? (
        <div
          style={{
            opacity: noteOpacity,
            maxWidth: 820,
            textAlign: "center",
            fontSize: 24,
            color: colors.textDim,
            lineHeight: 1.6,
            padding: "0 30px",
          }}
        >
          Funciona igual con{" "}
          <span style={{ color: colors.text }}>npm</span> o{" "}
          <span style={{ color: colors.text }}>yarn</span>. Documentación
          completa, API y ejemplos en{" "}
          <span style={{ color: colors.accent, fontFamily: fonts.mono }}>
            npmjs.com/package/supermoney
          </span>
          .
        </div>
      ) : null}
    </div>
  );
};

const ReactBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = fadeIn(frame);

  // Momento A: el wrapper MoneyInput.tsx (activateMoneyInput + eventos DOM
  // reenviados como props de React). Se queda en pantalla y luego el
  // componente entero se desliza para dar paso al ejemplo de uso.
  const wrapperStart = 15;
  const wrapperOpacity = interpolate(
    frame,
    [wrapperStart, wrapperStart + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Momento B: el <MoneyInput /> ya integrado en un formulario JSX.
  const usageStart = 140;
  const usageOpacity = interpolate(
    frame,
    [usageStart, usageStart + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const wrapperExitOpacity = interpolate(
    frame,
    [usageStart - 15, usageStart],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const noteStart = usageStart + 100;
  const noteOpacity = interpolate(
    frame,
    [noteStart, noteStart + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const wrapperLines = [
    [
      kw("const"),
      plain(" ctrl "),
      plain("= "),
      fn("activateMoneyInput"),
      plain("(input);"),
    ],
    [plain("")],
    [
      plain("input."),
      fn("addEventListener"),
      plain("("),
      str("'money-input'"),
      plain(", (e) => {"),
    ],
    [plain("  "), fn("onChangeCents"), plain("?.(e.detail.value);")],
    [plain("});")],
    [plain("")],
    [
      plain("input."),
      fn("addEventListener"),
      plain("("),
      str("'money-change'"),
      plain(", (e) => {"),
    ],
    [
      plain("  "),
      fn("onMoneyChange"),
      plain("?.(e.detail.value, e.detail.formatted);"),
    ],
    [plain("});")],
  ];

  const usageLines = [
    [plain("<"), fn("MoneyInput")],
    [
      plain("  id="),
      str('"precio"'),
    ],
    [
      plain("  symbol="),
      str('"$"'),
    ],
    [
      plain("  decimals={"),
      num("2"),
      plain("}"),
    ],
    [
      plain("  valueCents={priceCents}"),
    ],
    [
      plain("  onChangeCents={setPriceCents}"),
    ],
    [
      plain("  onMoneyChange={(cents, formatted) =>"),
    ],
    [
      plain("    "),
      fn("console"),
      plain("."),
      fn("log"),
      plain("("),
      str("'Monto confirmado:'"),
      plain(", cents, formatted)"),
    ],
    [plain("  }")],
    [plain("/>")],
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
      <div style={{ opacity: titleOpacity, fontSize: 30, color: colors.text, fontWeight: 600 }}>
        3. Con React: un componente controlado
      </div>

      <div style={{ position: "relative", width: 780, height: 470 }}>
        {wrapperOpacity > 0 && wrapperExitOpacity > 0 ? (
          <div
            style={{
              opacity: Math.min(wrapperOpacity, wrapperExitOpacity),
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <CodeWindow
              title="MoneyInput.tsx"
              width={760}
              fontSize={19}
              lines={wrapperLines}
              dot="ok"
            />
          </div>
        ) : null}

        {usageOpacity > 0 ? (
          <div
            style={{
              opacity: usageOpacity,
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <CodeWindow
              title="FormularioPrecio.tsx"
              width={620}
              fontSize={19}
              lines={usageLines}
              dot="ok"
            />
          </div>
        ) : null}
      </div>

      {noteOpacity > 0 ? (
        <div
          style={{
            opacity: noteOpacity,
            maxWidth: 820,
            textAlign: "center",
            fontSize: 22,
            color: colors.textDim,
            lineHeight: 1.6,
            padding: "0 30px",
          }}
        >
          <span style={{ color: colors.text }}>valueCents</span> entra y
          sale siempre en enteros — React nunca toca el punto flotante,
          solo lo muestra formateado con{" "}
          <span style={{ color: colors.accent }}>symbol="$"</span>.
        </div>
      ) : null}
    </div>
  );
};

const ShowMoneyBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = fadeIn(frame);

  const codeStart = 10;
  const codeOpacity = interpolate(
    frame,
    [codeStart, codeStart + 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const resultStart = codeStart + 25;
  const resultOpacity = interpolate(
    frame,
    [resultStart, resultStart + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const lines = [
    [fn("showMoney"), plain("("), num("123456"), plain(", { "), plain("decimals: "), num("2"), plain(", "), plain("symbol: "), str("'$'"), plain(" });")],
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 34 }}>
      <div style={{ opacity: titleOpacity, fontSize: 30, color: colors.text, fontWeight: 600 }}>
        3. Mostrarlo formateado
      </div>
      {codeOpacity > 0 ? (
        <div style={{ opacity: codeOpacity }}>
          <CodeWindow title="mostrar.js" width={800} fontSize={26} lines={lines} />
        </div>
      ) : null}
      {resultOpacity > 0 ? (
        <div
          style={{
            opacity: resultOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div style={{ fontFamily: fonts.mono, fontSize: 48, fontWeight: 700, color: colors.ok }}>
            "1,234.56 $"
          </div>
          <div style={{ fontSize: 22, color: colors.textDim, maxWidth: 640, textAlign: "center" }}>
            El entero completo — los últimos 2 dígitos son los centavos
          </div>
        </div>
      ) : null}
    </div>
  );
};

const MoneyToStringBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = fadeIn(frame);

  const codeStart = 10;
  const codeOpacity = interpolate(
    frame,
    [codeStart, codeStart + 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const resultStart = codeStart + 25;
  const resultOpacity = interpolate(
    frame,
    [resultStart, resultStart + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const lines = [
    [fn("moneyToString"), plain("("), num("123456"), plain(");")],
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
      <div style={{ opacity: titleOpacity, fontSize: 30, color: colors.text, fontWeight: 600 }}>
        4. El monto en letras
      </div>
      {codeOpacity > 0 ? (
        <div style={{ opacity: codeOpacity }}>
          <CodeWindow title="factura.js" width={700} fontSize={26} lines={lines} />
        </div>
      ) : null}
      {resultOpacity > 0 ? (
        <div
          style={{
            opacity: resultOpacity,
            maxWidth: 820,
            textAlign: "center",
            fontFamily: fonts.mono,
            fontSize: 26,
            color: colors.ok,
            lineHeight: 1.6,
            padding: "0 30px",
          }}
        >
          "Mil doscientos treinta y cuatro Bolívares con cincuenta y seis
          céntimos"
        </div>
      ) : null}
    </div>
  );
};

const LimitBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = fadeIn(frame);
  return (
    <div style={{ opacity, textAlign: "center", maxWidth: 900, padding: "0 50px" }}>
      <div style={{ fontSize: 24, color: colors.textDim, marginBottom: 14 }}>
        El tope absoluto no es arbitrario:
      </div>
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 40,
          fontWeight: 700,
          color: colors.accent,
        }}
      >
        Number.MAX_SAFE_INTEGER
      </div>
      <div style={{ fontFamily: fonts.mono, fontSize: 26, color: colors.textDim, marginTop: 10 }}>
        9,007,199,254,740,991
      </div>
      <div style={{ fontSize: 22, color: colors.textDim, marginTop: 20, lineHeight: 1.5 }}>
        El punto donde hasta un entero deja de representarse exacto en JS.
      </div>
    </div>
  );
};
