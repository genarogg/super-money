# Guion sincronizado — video "supermoney"

Duración total del video: **1:55 (115s / 6900 frames a 60fps)**, incluyendo
1s de aire inicial (`LEAD_IN_DURATION`, ver `theme.ts`) donde no hay ni
imagen ni voz. Los tiempos de abajo son **absolutos** (ya cuentan ese
segundo de silencio) y ya restan el solape de las transiciones crossZoom
(0.6s cada una).

**Importante:** este guion no coincide en duración con el
`voiceover.mp3` actual (95.0s) — el video real mide ahora 120s. Hay que
regenerar el audio con este texto y luego, si la duración cambia,
reajustar `sceneDurations` en `theme.ts` proporcionalmente (ver sección
final).

**Cambio de esta revisión — el beat de instalación con pnpm ganó voz, y
se corrigió un desincronizado real en el beat de React:**
- El beat "Instalación con pnpm" era puramente visual (sin narración).
  Ahora lleva la línea "Su instalación es muy sencilla: pnpm add
  supermoney." en pantalla y en
  el audio, así que `INSTALL_DUR` subió de 4s a 6s.
- El beat de React tenía un bug de sincronía: por dentro, el ejemplo de
  uso (`<InputMoney ... />`) no empezaba a aparecer hasta el frame 300 y
  la nota final hasta el frame 500, pero `REACT_DUR` solo daba 240 frames
  (8s) — el `Sequence` cortaba el beat antes de que ese contenido llegara
  a mostrarse, así que el video saltaba a "showMoney" mientras la
  narración de React todavía seguía sonando. `REACT_DUR` subió de 8s a
  17s para cubrir su contenido interno completo.
- La escena "04 — supermoney" completa pasó de 53s a 58s (+5s), y el
  video total de 115s a 120s.

| Beat (dentro de supermoney) | Antes | Ahora | Narración estimada |
|---|---|---|---|
| Intro | 4s | 4s | ~3.9s |
| ATM | 9s | 9s | ~9.1s |
| HTML vanilla | 11s | 11s | ~10.4s |
| Instalación pnpm | 4s (sin voz) | **6s (con voz)** | ~2s |
| React | 8s (desincronizado) | **17s (corregido)** | ~11.3s |
| showMoney | 2s | 2s | ~1.7s |
| moneyToString | 4s | 4s | ~3.5s |
| Límite (MAX_SAFE_INTEGER) | 9s | 9s | ~8.3s |
| **Total** | **53s** | **58s** | |

---

## 00 — Intro (0:01 – 0:13)

> Una suma con decimales, una sola vez, casi no se nota. Pero repetida miles de veces, día tras día, el error se acumula — hasta que ya no puedes ignorarlo.

En pantalla: el código `saldo.js` sumando 0.10 durante 3000 días, luego el
contador de días corre y dos saldos ("esperado" vs "real") se separan
visiblemente.

## 01 — El bug (0:12 – 0:24)

> Escribe en la consola: cero punto uno, más cero punto dos. El resultado no es cero punto tres — trae un cuatro perdido al final. Bienvenido al punto flotante.

## 02 — Por qué pasa (0:24 – 0:40)

> Las computadoras guardan decimales en binario, y no todos son exactos. Un carrito de tres productos a diecinueve noventa y nueve no da cincuenta y nueve con noventa y siete... da un número con nueves de más. El error se acumula.

## 03 — La solución (0:39 – 0:56)

> La regla de oro: nunca guardes dinero como decimal. Guárdalo como entero, en la unidad más pequeña. Diecinueve noventa y nueve son mil novecientos noventa y nueve centavos. Sumado tres veces: cinco mil novecientos noventa y siete. Exacto, siempre. El decimal es solo presentación.

## 04 — supermoney (0:56 – 1:49)

### Intro (0:56 – 1:00)
> Ese principio, en una librería, es supermoney. Siempre enteros.

### 1. El input, modo ATM (1:00 – 1:09)
> El input funciona como un cajero: cada tecla arma el monto de derecha a izquierda, y entrega el valor en centavos.

### 2. Un solo HTML, sin build (1:09 – 1:20)
> No necesitas un bundler ni un paso de build: un HTML, un input, un script por CDN. Funciona en PHP, Django, WordPress, donde sea.

En pantalla, el snippet exacto:
```html
<!doctype html>
<html>
<body>
  <input type="money" />
  <script src="https://unpkg.com/supermoney@latest/dist/index.global.js"></script>
  <script>
    superMoney.initMoneyInputs();
  </script>
</body>
</html>
```

### 3. Instalación con pnpm (1:20 – 1:26)
> Su instalación es muy sencilla: pnpm add supermoney.
>
> En pantalla: la frase narrada, luego `pnpm add supermoney`, con nota de
> que también funciona con npm o yarn.

### 4. Con React: un componente controlado (1:23 – 1:34)
> Con React, un componente activa ese input y reenvía sus eventos como props: onChangeCents, onMoneyChange. Se usa como cualquier input controlado, y sigue siempre en enteros.

En pantalla: `import { InputMoney } from "supermoney";` y el ejemplo de uso
`<InputMoney id="precio" symbol="$" decimals={2} valueCents={priceCents}
onChangeCents={setPriceCents} onMoneyChange={...} />`.

### 5. Mostrarlo formateado — showMoney (1:34 – 1:36)
> showMoney lo muestra formateado.

### 6. El monto en letras — moneyToString (1:36 – 1:40)
> moneyToString lo convierte a letras, para una factura.

### 7. El límite real (1:40 – 1:49)
> Y el límite real es Number punto MAX_SAFE_INTEGER — donde hasta un entero deja de ser exacto en JavaScript.

## 05 — Cierre (1:48 – 1:55)

> La regla no es "cuidado con los decimales". Es: no calcules con decimales. Guarda enteros. Supermoney.

---

## Texto corrido (para pegar en ElevenLabs / TTS)

```
Una suma con decimales, una sola vez, casi no se nota. Pero repetida miles de veces, día tras día, el error se acumula — hasta que ya no puedes ignorarlo.

Escribe en la consola: cero punto uno, más cero punto dos. El resultado no es cero punto tres — trae un cuatro perdido al final. Bienvenido al punto flotante.

Las computadoras guardan decimales en binario, y no todos son exactos. Un carrito de tres productos a diecinueve noventa y nueve no da cincuenta y nueve con noventa y siete... da un número con nueves de más. El error se acumula.

La regla de oro: nunca guardes dinero como decimal. Guárdalo como entero, en la unidad más pequeña. Diecinueve noventa y nueve son mil novecientos noventa y nueve centavos. Sumado tres veces: cinco mil novecientos noventa y siete. Exacto, siempre. El decimal es solo presentación.

Ese principio, en una librería, es supermoney. Siempre enteros.

El input funciona como un cajero: cada tecla arma el monto de derecha a izquierda, y entrega el valor en centavos.

No necesitas un bundler ni un paso de build: un HTML, un input, un script por CDN. Funciona en PHP, Django, WordPress, donde sea.

Su instalación es muy sencilla: pnpm add supermoney.

Con React, un componente activa ese input y reenvía sus eventos como props: onChangeCents, onMoneyChange. Se usa como cualquier input controlado, y sigue siempre en enteros.

showMoney lo muestra formateado. moneyToString lo convierte a letras, para una factura.

Y el límite real es Number punto MAX_SAFE_INTEGER — donde hasta un entero deja de ser exacto en JavaScript.

La regla no es "cuidado con los decimales". Es: no calcules con decimales. Guarda enteros. Supermoney.
```

**Cambios respecto al guion anterior:**
- "super... money" (con pausa dramática) → "supermoney" (una sola palabra,
  sin pausa), tanto en la línea de la escena 04 como en el cierre — para
  que coincida con cómo se pronuncia en el resto del video y con el nombre
  real del paquete npm.
- Se agregaron los tiempos absolutos de cada línea, ya considerando el
  segundo de aire inicial (`LEAD_IN_DURATION`) y el solape de las 5
  transiciones crossZoom (0.6s cada una).
- Se documentó en el beat "2. Un solo HTML" el snippet exacto que aparece
  ahora en pantalla (CDN de unpkg, `superMoney.initMoneyInputs()`).
- Se documentó en el beat "4. Con React" que el snippet en pantalla ya no
  es el wrapper manual de ~115 líneas, sino el import directo `import {
  InputMoney } from "supermoney"`.
- Se rebalancearon las duraciones internas de "04 — supermoney" (ver
  tabla arriba) para que cada beat tenga el tiempo real que necesita su
  línea narrada, en vez de arrastrar el timing viejo del snippet largo.
- **Nuevo:** el beat "3. Instalación con pnpm" ganó la línea narrada "Su
  instalación es muy sencilla." — dejó de ser un beat mudo.
- **Nuevo:** se corrigió un desincronizado real en el beat "4. Con React":
  su contenido interno (el ejemplo de uso y la nota final) no cabía en la
  duración del `Sequence` y se cortaba antes de tiempo. Ver la nota en
  `04_Supermoney.tsx` y en `theme.ts` para el detalle técnico.

---

## Cómo generar y ajustar el audio

1. Copia el bloque "Texto corrido" de arriba a tu TTS.
2. Genera el audio y medí la duración exacta:
   ```
   ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 voiceover.mp3
   ```
3. Reemplaza `public/audio/voiceover.mp3` con el nuevo archivo.
4. Si la duración final no da exactamente **120s (7200 frames a 60fps)**,
   redistribuye `sceneDurations` en `src/theme.ts` (y las constantes
   internas `INTRO_DUR / ATM_DUR / HTML_DUR / INSTALL_DUR / REACT_DUR /
   SHOW_DUR / STRING_DUR / LIMIT_DUR` en `src/scenes/04_Supermoney.tsx`)
   proporcionalmente a la nueva duración total. `videoDuration` en
   `theme.ts` se recalcula solo a partir de `sceneDurations`, no hace
   falta tocarlo directamente.
