# Guion de voz en off — video "supermoney"

Este es el texto **final y ya locutado** — corresponde exactamente al audio en
`public/audio/voiceover.mp3` (ElevenLabs, voz "Carolina G — Voz femenina
versátil Pro", 95.0 segundos). Las duraciones de las escenas en
`src/theme.ts` y `src/scenes/04_Supermoney.tsx` están calibradas a este
audio, así que si el texto cambia en el futuro hay que regenerar el audio
**y** reajustar `sceneDurations` / las duraciones de sub-beats para que
sigan sumando 95.0s (2850 frames a 30fps).

**Nota:** el beat "Instalación con pnpm" (0:03 dentro de la escena
supermoney) se agregó después de generar el audio y no tiene línea de voz
propia — es un tramo puramente visual con música de fondo. Para que el
video siguiera cuadrando con los 95.0s del audio ya grabado, se le restó
tiempo a `AtmBeat` y `LimitBeat` (que tenían margen de sobra) en vez de
alargar el video total.

Duración total: **1:35** (95s).

---

## 01 — El bug (0:00 – 0:12)

> Escribe en la consola: cero punto uno, más cero punto dos. El resultado no es cero punto tres — trae un cuatro perdido al final. Bienvenido al punto flotante.

## 02 — Por qué pasa (0:12 – 0:28)

> Las computadoras guardan decimales en binario, y no todos son exactos. Un carrito de tres productos a diecinueve noventa y nueve no da cincuenta y nueve con noventa y siete... da un número con nueves de más. El error se acumula.

## 03 — La solución (0:28 – 0:45)

> La regla de oro: nunca guardes dinero como decimal. Guárdalo como entero, en la unidad más pequeña. Diecinueve noventa y nueve son mil novecientos noventa y nueve centavos. Sumado tres veces: cinco mil novecientos noventa y siete. Exacto, siempre. El decimal es solo presentación.

## 04 — supermoney (0:45 – 1:28)

### Intro (0:45 – 0:49)
> Ese principio, en una librería, es super... money. Siempre enteros.

### 1. El input, modo ATM (0:49 – 0:55)
> El input funciona como un cajero: cada tecla arma el monto de derecha a izquierda, y entrega el valor en centavos.

### 2. Un solo HTML, sin build (0:55 – 1:03)
> Ni siquiera necesitas un proyecto: un HTML, un input, un script por CDN. Funciona en PHP, Rails, WordPress, donde sea.

### 3. Instalación con pnpm (1:03 – 1:09)
> *(sin narración — beat puramente visual)*
>
> En pantalla: `pnpm add supermoney`, con nota de que también funciona con npm o yarn, y referencia a la documentación completa en `npmjs.com/package/supermoney`. Suena solo la música de fondo durante este tramo; no hay línea de voz asignada. Si en el futuro se regenera el audio y se quiere narrar este beat, una línea corta como *"Con un bundler, se instala con pnpm add supermoney"* cabe en los 6 segundos disponibles.

### 4. Con React: un componente controlado (1:09 – 1:19)
> Con React, un componente activa ese input y reenvía sus eventos como props: onChangeCents, onMoneyChange. Se usa como cualquier input controlado, y sigue siempre en enteros.

### 5. Mostrarlo formateado — showMoney (1:19 – 1:22)
> showMoney lo muestra formateado.

### 6. El monto en letras — moneyToString (1:22 – 1:25)
> moneyToString lo convierte a letras, para una factura.

### 7. El límite real (1:25 – 1:28)
> Y el límite real es Number punto MAX_SAFE_INTEGER — donde hasta un entero deja de ser exacto en JavaScript.

## 05 — Cierre (1:28 – 1:35)

> La regla no es "cuidado con los decimales". Es: no calcules con decimales. Guarda enteros. Super... money.

---

## Texto corrido (para reusar en ElevenLabs si se regenera el audio)

```
Escribe en la consola: cero punto uno, más cero punto dos. El resultado no es cero punto tres — trae un cuatro perdido al final. Bienvenido al punto flotante.

Las computadoras guardan decimales en binario, y no todos son exactos. Un carrito de tres productos a diecinueve noventa y nueve no da cincuenta y nueve con noventa y siete... da un número con nueves de más. El error se acumula.

La regla de oro: nunca guardes dinero como decimal. Guárdalo como entero, en la unidad más pequeña. Diecinueve noventa y nueve son mil novecientos noventa y nueve centavos. Sumado tres veces: cinco mil novecientos noventa y siete. Exacto, siempre. El decimal es solo presentación.

Ese principio, en una librería, es super... money. Siempre enteros.

El input funciona como un cajero: cada tecla arma el monto de derecha a izquierda, y entrega el valor en centavos.

Ni siquiera necesitas un proyecto: un HTML, un input, un script por CDN. Funciona en PHP, Rails, WordPress, donde sea.

Con React, un componente activa ese input y reenvía sus eventos como props: onChangeCents, onMoneyChange. Se usa como cualquier input controlado, y sigue siempre en enteros.

showMoney lo muestra formateado. moneyToString lo convierte a letras, para una factura.

Y el límite real es Number punto MAX_SAFE_INTEGER — donde hasta un entero deja de ser exacto en JavaScript.

La regla no es "cuidado con los decimales". Es: no calcules con decimales. Guarda enteros. Super... money.
```

## Datos del audio

### Voz en off
- **Archivo:** `public/audio/voiceover.mp3`
- **Duración:** 95.007313s (95.0s redondeado)
- **Fuente:** ElevenLabs — voz "Carolina G — Voz femenina versátil Pro" (pvc, stability 100, similarity 98, style 50)
- **Formato:** MP3, 128 kbps, 44.1 kHz, mono
- **Volumen:** 100% (voz principal)
- **Referenciado en código:** `src/MainVideo.tsx`, vía `<Audio src={staticFile("audio/voiceover.mp3")} />`

### Música de fondo
- **Archivo:** `public/audio/background.mp3`
- **Duración original:** 161.1s (se recorta a los 95.0s del video mediante un `Sequence`)
- **Formato:** MP3, 48 kbps, 44.1 kHz, estéreo
- **Volumen:** 20% fijo, con fade-out de 1s (`BG_FADE_OUT_FRAMES = 30`) en el último segundo del video para no cortar en seco
- **Referenciado en código:** `src/MainVideo.tsx`, vía `<Audio src={staticFile("audio/background.mp3")} volume={...} />` dentro de un `Sequence` de `totalDuration` frames

## Si se necesita regenerar el audio

1. Copia el bloque "Texto corrido" de arriba tal cual a ElevenLabs.
2. Genera el audio y anota la duración exacta con `ffprobe -show_entries format=duration archivo.mp3`.
3. Reemplaza `public/audio/voiceover.mp3` con el nuevo archivo.
4. Si la duración cambió, redistribuye `sceneDurations` en `src/theme.ts` y las constantes `INTRO_DUR/ATM_DUR/HTML_DUR/REACT_DUR/SHOW_DUR/STRING_DUR/LIMIT_DUR` en `src/scenes/04_Supermoney.tsx` proporcionalmente a la nueva duración total (`totalDuration` en `Root.tsx` se recalcula solo, no hace falta tocarlo).
