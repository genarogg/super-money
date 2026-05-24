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
import initMoneyInputs from 'supermoney';
initMoneyInputs();
```

### 2. Usar en HTML

```html
<input type="money" currency="USD" decimals="2" />
```

## API

### initMoneyInputs()

Inicializa todos los inputs de dinero en el DOM y observa los que se agreguen dinámicamente.

### showMoney(value, decimals, symbol?)

Muestra un valor entero (cents) como cadena de dinero formateado.

```typescript
import { showMoney } from 'supermoney';

showMoney(123456, 2, '$'); // "$ 1,234.56
showMoney(1234, 0, '€'); // "€ 1,234"
```

## Atributos del input

| Atributo   | Tipo   | Descripción                              |
|------------|--------|------------------------------------------|
| type       | string | Siempre "money"                         |
| currency   | string | Código de moneda (ej: USD, EUR, COP)   |
| decimals   | number | Número de decimales (default: 2)         |
| min        | number | Valor mínimo permitido                     |
| max        | number | Valor máximo permitido                     |

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
  currency="USD"
  decimals="2"
  id="mi-input"
/>

<script type="module">
  import initMoneyInputs, { showMoney } from 'supermoney';
  initMoneyInputs();

  const input = document.getElementById('mi-input');
  input.addEventListener('money-input', (e) => {
    console.log('Valor entero:', e.detail.value);
  });
</script>
```

## Licencia

MIT
