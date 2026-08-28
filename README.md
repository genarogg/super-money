# supermoney

Input de dinero para la web. Modo ATM. Sin errores de punto flotante.

## Características

- ✅ **Store as integer, display as decimal: evita errores de punto flotante
- ✅ Modo ATM: escribe de derecha a izquierda
- ✅ Soporte para múltiples monedas y decimales
- ✅ Funciona con inputs dinámicos

## Instalación

```bash
pnpm add supermoney
```

## Uso básico

### 1. Inicializar la librería

```typescript
import { initMoneyInputs } from 'supermoney';
initMoneyInputs();
```

### 2. Usar en HTML

```html
<input type="money" decimals="2" />
```

## API

### initMoneyInputs()

Inicializa todos los inputs de dinero en el DOM y observa los que se agreguen dinámicamente.

### showMoney(value, options?)

Muestra un valor entero (cents) como cadena de dinero formateado.

| Parámetro  | Tipo                | Descripción                                                                 |
|------------|---------------------|------------------------------------------------------------------------------|
| `value`    | `number`             | Monto a mostrar, siempre como entero cuyos últimos `decimals` dígitos son la parte decimal (ej: `123456` con `decimals: 2` → `1234.56`). Obligatorio. |
| `options.decimals` | `number`     | Decimales del monto. Debe ser un entero ≥ 0; un valor inválido cae a `2` con un aviso por consola. Usa el global de `setMoneyConfig` si se omite. |
| `options.symbol`   | `string`     | Símbolo de moneda a anexar al final (ej: `'$'`). Usa el global de `setMoneyConfig` si se omite. |

```typescript
import { showMoney } from 'supermoney';

showMoney(123456, { decimals: 2, symbol: '$' }); // "1,234.56 $"
showMoney(1234, { decimals: 0, symbol: '€' }); // "1,234 €"
```

> **Nota de migración:** en versiones anteriores `showMoney` recibía argumentos posicionales
> (`showMoney(value, decimals?, symbol?)`). Ahora `decimals` y `symbol` van dentro de un único
> objeto de opciones: `showMoney(value, { decimals?, symbol? })`.

### moneyToString(number, options?)

Convierte un valor entero (centavos) a su representación en texto (letras), en español o inglés.

| Parámetro  | Tipo                | Descripción                                                                 |
|------------|---------------------|------------------------------------------------------------------------------|
| `number`   | `number \| string`  | Monto en centavos enteros (misma convención que `showMoney`). Obligatorio.   |
| `options.lang`     | `"es" \| "en"`      | Idioma de salida. Default: `"es"`.                                          |
| `options.moneda`   | `object`             | Override de `{ plural, singular, centPlural, centSingular }`. Usa los defaults del idioma (o los globales de `setMoneyConfig` en español) si se omite. |
| `options.decimals` | `number`             | Decimales del monto (dónde se separan los "céntimos"). Debe ser un entero ≥ 0; un valor inválido cae a `2` con un aviso por consola. Usa el global de `setMoneyConfig` si se omite. |

```typescript
import { moneyToString } from 'supermoney';

moneyToString(123456);
// "Mil doscientos treinta y cuatro Bolívares con cincuenta y seis céntimos"

moneyToString(123456, { lang: 'en' });
// "One thousand two hundred thirty-four Dollars with fifty-six cents"

moneyToString(150000, {
  lang: 'en',
  moneda: { plural: 'Euros', singular: 'Euro', centPlural: 'cents', centSingular: 'cent' },
});
// "One thousand five hundred Euros with zero cents"
```

> **Nota de migración:** en versiones anteriores `moneyToString` recibía argumentos posicionales
> (`moneyToString(monto, moneda?, decimals?)`). Ahora `lang`, `moneda` y `decimals` van dentro de
> un segundo parámetro de opciones: `moneyToString(number, { lang?, moneda?, decimals? })`.

## Atributos del input

| Atributo   | Tipo   | Descripción                              |
|------------|--------|------------------------------------------|
| type       | string | Siempre "money"                         |
| decimals   | number | Número de decimales (default: 2)         |
| min        | number | Valor mínimo permitido, en la misma unidad entera que `money-input`/`money-change` (centavos, o más precisamente `10^decimals` partes de la unidad). Default: `0`. Ej.: para un mínimo de $1.00, usar `min="100"`, no `min="1"`. |
| max        | number | Valor máximo permitido, en la misma unidad entera que `money-input`/`money-change` (centavos). Default y techo absoluto: `9007199254740991` (`Number.MAX_SAFE_INTEGER`) — un `max` mayor se recorta a este valor, ya que por encima de él los enteros dejan de representarse con precisión exacta en JS. |

`min`/`max` se aplican en todo momento (tecleo, paste, y llamadas a `setCents`/`setValue`), no solo al perder el foco: el valor nunca puede quedar fuera de rango.

## Eventos

- **money-input**: Se dispara cuando el valor cambia. El detalle contiene el valor entero
- **money-change**: Se dispara cuando el valor cambia. El detalle contiene el valor formateado

```typescript
document.querySelector('input[type="money"]').addEventListener('money-input', (e) => {
  console.log(e.detail.value); // Valor entero para base de datos
});
```

## Ejemplo completo

```html
<input
  type="money"
  decimals="2"
  id="mi-input"
/>

<script type="module">
  import { initMoneyInputs, showMoney } from 'supermoney';
  initMoneyInputs();

  const input = document.getElementById('mi-input');
  input.addEventListener('money-input', (e) => {
    console.log('Valor entero:', e.detail.value);
  });
</script>
```

## Licencia

MIT