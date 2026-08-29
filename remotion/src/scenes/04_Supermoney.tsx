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
 * Duraciones recalculadas a partir de la duración real narrada de cada
 * línea del guion (ver guion-supermoney.md), no de valores heredados:
 *   - REACT_DUR subió de 8s a 17s: el beat tiene contenido interno
 *     (wrapperStart=30, usageStart=300, noteStart=500 frames) que superaba
 *     los 240 frames (8s) disponibles, así que el <InputMoney /> y la nota
 *     final nunca llegaban a mostrarse — el Sequence cortaba el beat a la
 *     mitad y el video saltaba a "showMoney" mientras la narración de
 *     React seguía sonando. 17s (510 frames) cubre hasta noteStart + fade
 *     + un margen de lectura antes de cortar.
 *   - INSTALL_DUR subió de 4s a 6s: dejó de ser un beat puramente visual
 *     (ver nota en InstallBeat) y ahora lleva narración de ~3.5s más aire.
 *   - LIMIT_DUR subió de 3s a 9s: la frase de Number.MAX_SAFE_INTEGER
 *     dura ~8.3s narrada y antes se cortaba con solo 3s disponibles.
 *   - ATM_DUR y HTML_DUR subieron ligeramente (6s→9s, 8s→11s) para cubrir
 *     su narración real (~9.1s y ~10.4s) con un pequeño margen de aire.
 * La suma total ya NO es 53s (sceneDurations.supermoney en theme.ts debe
 * actualizarse a la nueva suma) — ver ese archivo.
 */
const INTRO_DUR = 4 * FPS;
const ATM_DUR = 8 * FPS;
const HTML_DUR = 10 * FPS;
const INSTALL_DUR = 6 * FPS;
const REACT_DUR = 11 * FPS;
const SHOW_DUR = 2 * FPS;
const STRING_DUR = 4 * FPS;
const LIMIT_DUR = 9 * FPS;

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

const fadeIn = (frame: number, dur = 30) =>
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
  const keyFrames = [80, 110, 140, 170];

  const eventStart = 260;
  const eventOpacity = interpolate(
    frame,
    [eventStart, eventStart + 30],
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

  const codeStart = 40;
  const codeOpacity = interpolate(
    frame,
    [codeStart, codeStart + 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const noteStart = codeStart + 260;
  const noteOpacity = interpolate(
    frame,
    [noteStart, noteStart + 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Un solo archivo .html, sin bundler, sin npm install: <script> por CDN
  // + auto-inicialización de los inputs money del DOM. Este es el ejemplo
  // que demuestra que supermoney funciona en CUALQUIER stack — PHP, Django,
  // WordPress, un HTML servido por Python, lo que sea — porque no depende
  // de nada más que el navegador cargando un <script>.
  const htmlLines = [
    [plain("<!doctype html>")],
    [plain("<html>")],
    [plain("<body>")],
    [
      plain('  <input type="'),
      str("money"),
      plain('" />'),
    ],
    [
      plain('  <script src="'),
      str("https://unpkg.com/supermoney@latest/dist/index.global.js"),
      plain('"></script>'),
    ],
    [
      plain("  <script>"),
    ],
    [plain("    "), fn("superMoney"), plain("."), fn("initMoneyInputs"), plain("();")],
    [plain("  </script>")],
    [plain("</body>")],
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
          carga en el DOM y ya — funciona igual en PHP, Django, WordPress o
          cualquier backend que sirva HTML.
        </div>
      ) : null}
    </div>
  );
};

const InstallBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = fadeIn(frame);

  // Línea narrada: "Su instalación es muy sencilla..." — este beat dejó de
  // ser mudo, así que el texto sale primero y da tiempo a leerse/oírse
  // antes de que entre el código de terminal.
  const lineOpacity = interpolate(
    frame,
    [0, 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const codeStart = 60;
  const codeOpacity = interpolate(
    frame,
    [codeStart, codeStart + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const noteStart = codeStart + 110;
  const noteOpacity = interpolate(
    frame,
    [noteStart, noteStart + 20],
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
      <div
        style={{
          opacity: lineOpacity,
          fontSize: 26,
          color: colors.text,
          textAlign: "center",
          maxWidth: 720,
        }}
      >
        Su instalación es muy sencilla: pnpm add supermoney.
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

  // Momento A: el import directo desde supermoney — ya no hay wrapper
  // manual que armar, el componente MoneyInput se importa listo para usar.
  const wrapperStart = 30;
  const wrapperOpacity = interpolate(
    frame,
    [wrapperStart, wrapperStart + 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Momento B: el <InputMoney /> ya integrado en un formulario JSX.
  // (usageStart se acortó respecto al original: el import de una sola
  // línea no necesita los ~11s que antes ocupaba el scroll del wrapper
  // manual de 115 líneas)
  const usageStart = 300;
  const usageOpacity = interpolate(
    frame,
    [usageStart, usageStart + 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const wrapperExitOpacity = interpolate(
    frame,
    [usageStart - 30, usageStart],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const noteStart = usageStart + 200;
  const noteOpacity = interpolate(
    frame,
    [noteStart, noteStart + 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const wrapperLines = [
    [
      kw("import"),
      plain(" { InputMoney } "),
      kw("from"),
      plain(" "),
      str("\"supermoney\""),
      plain(";"),
    ],
  ];

  const usageLines = [
    [plain("<"), fn("InputMoney")],
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
              title="import"
              width={620}
              fontSize={22}
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

  const codeStart = 20;
  const codeOpacity = interpolate(
    frame,
    [codeStart, codeStart + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const resultStart = codeStart + 50;
  const resultOpacity = interpolate(
    frame,
    [resultStart, resultStart + 30],
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

  const codeStart = 20;
  const codeOpacity = interpolate(
    frame,
    [codeStart, codeStart + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const resultStart = codeStart + 50;
  const resultOpacity = interpolate(
    frame,
    [resultStart, resultStart + 30],
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
