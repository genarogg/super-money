// Bloque de código coloreado (JSX estático) del componente <MoneyInput />,
// pensado para copiar y pegar directo en un proyecto React.
// El import apunta a 'supermoney' (paquete publicado), no a la ruta
// relativa interna que usa este mismo repo para desarrollarlo.
const MoneyInputSnippet = () => (
  <>
    <p>
      <span className="text-pink-400">import</span>
      {' { useRef, useEffect, useCallback } '}
      <span className="text-pink-400">from</span>
      {' '}
      <span className="text-emerald-400">'react'</span>
      {';'}
    </p>
    <p>
      <span className="text-pink-400">import</span>
      {' {'}
      {' activateMoneyInput, initMoneyInputs, '}
      <span className="text-pink-400">type</span>
      {' MoneyInputController, '}
      <span className="text-pink-400">type</span>
      {' MoneyConfig }'}
      {' '}
      <span className="text-pink-400">from</span>
      {' '}
      <span className="text-emerald-400">'supermoney'</span>
      {';'}
    </p>
    <br />

    <p className="text-gray-500">
      {'// ─── init global (se ejecuta una sola vez en toda la app) ───'}
    </p>
    <p>
      <span className="text-pink-400">let</span>
      {' globalInitDone = '}
      <span className="text-amber-400">false</span>
      {';'}
    </p>
    <br />
    <p>
      <span className="text-pink-400">const</span>
      {' ensureGlobalInit = (config'}
      <span className="text-sky-400">?: MoneyConfig</span>
      {') => {'}
    </p>
    <p className="pl-4">
      <span className="text-pink-400">if</span>
      {' (globalInitDone) '}
      <span className="text-pink-400">return</span>
      {';'}
    </p>
    <p className="pl-4">{'globalInitDone = '}<span className="text-amber-400">true</span>{';'}</p>
    <p className="pl-4">
      <span className="text-purple-400">initMoneyInputs</span>
      {'(config);'}
    </p>
    <p>{'};'}</p>
    <br />

    <p className="text-gray-500">{'// ─── Props ───────────────────────────────────────────────'}</p>
    <p>
      <span className="text-pink-400">export</span>
      {' '}
      <span className="text-pink-400">interface</span>
      {' '}
      <span className="text-purple-400">MoneyInputProps</span>
    </p>
    <p className="pl-4">
      <span className="text-pink-400">extends</span>
      {' Omit<'}
      <span className="text-sky-400">React.InputHTMLAttributes</span>
      {'<'}
      <span className="text-sky-400">HTMLInputElement</span>
      {'>, '}
      <span className="text-emerald-400">'onChange'</span>
      {' | '}
      <span className="text-emerald-400">'value'</span>
      {' | '}
      <span className="text-emerald-400">'type'</span>
      {' | '}
      <span className="text-emerald-400">'onBlur'</span>
      {'> {'}
    </p>
    <p className="pl-4 text-gray-500">{'/** Valor controlado, en centavos (123456 = 1.234,56). */'}</p>
    <p className="pl-4">
      {'valueCents'}
      <span className="text-sky-400">{'?: number'}</span>
      {';'}
    </p>
    <p className="pl-4 text-gray-500">{'/** Se llama con el valor en centavos en cada tecla del usuario. */'}</p>
    <p className="pl-4">
      {'onChangeCents'}
      <span className="text-sky-400">{'?: (cents: number) => void'}</span>
      {';'}
    </p>
    <p className="pl-4 text-gray-500">{'/** Se llama al perder el foco con (centavos, texto formateado). */'}</p>
    <p className="pl-4">
      {'onMoneyChange'}
      <span className="text-sky-400">{'?: (cents: number, formatted: string) => void'}</span>
      {';'}
    </p>
    <p className="pl-4 text-gray-500">{'/** Número de decimales. Si no se pasa, usa la config global. */'}</p>
    <p className="pl-4">
      {'decimals'}
      <span className="text-sky-400">{'?: number'}</span>
      {';'}
    </p>
    <p className="pl-4 text-gray-500">{'/** Símbolo de moneda visible (ej: "Bs."). Solo informativo. */'}</p>
    <p className="pl-4">
      {'symbol'}
      <span className="text-sky-400">{'?: string'}</span>
      {';'}
    </p>
    <p className="pl-4 text-gray-500">{'/** Config global de moneda. Solo se aplica en la primera instancia montada. */'}</p>
    <p className="pl-4">
      {'config'}
      <span className="text-sky-400">{'?: MoneyConfig'}</span>
      {';'}
    </p>
    <p>{'}'}</p>
    <br />

    <p className="text-gray-500">{'// ─── Componente ──────────────────────────────────────────'}</p>
    <p>
      <span className="text-pink-400">const</span>
      {' '}
      <span className="text-purple-400">MoneyInput</span>
      {' = ({'}
    </p>
    <p className="pl-4">{'valueCents, onChangeCents, onMoneyChange,'}</p>
    <p className="pl-4">{'decimals, symbol, config,'}</p>
    <p className="pl-4">{'id, className, disabled,'}</p>
    <p className="pl-4">{'...rest'}</p>
    <p>
      {'}: '}
      <span className="text-sky-400">MoneyInputProps</span>
      {') => {'}
    </p>
    <p className="pl-4">
      <span className="text-pink-400">const</span>
      {' inputRef = '}
      <span className="text-purple-400">useRef</span>
      {'<'}
      <span className="text-sky-400">HTMLInputElement</span>
      {'>('}
      <span className="text-amber-400">null</span>
      {');'}
    </p>
    <p className="pl-4">
      <span className="text-pink-400">const</span>
      {' ctrlRef = '}
      <span className="text-purple-400">useRef</span>
      {'<'}
      <span className="text-sky-400">MoneyInputController</span>
      {' | '}
      <span className="text-amber-400">null</span>
      {'>('}
      <span className="text-amber-400">null</span>
      {');'}
    </p>
    <br />
    <p className="pl-4 text-gray-500">{'// Init global + activar este input al montar'}</p>
    <p className="pl-4">
      <span className="text-purple-400">useEffect</span>
      {'(() => {'}
    </p>
    <p className="pl-8">
      <span className="text-purple-400">ensureGlobalInit</span>
      {'(config);'}
    </p>
    <p className="pl-8">
      <span className="text-pink-400">const</span>
      {' input = inputRef.current;'}
    </p>
    <p className="pl-8">
      <span className="text-pink-400">if</span>
      {' (!input) '}
      <span className="text-pink-400">return</span>
      {';'}
    </p>
    <p className="pl-8">
      {'ctrlRef.current = '}
      <span className="text-purple-400">activateMoneyInput</span>
      {'(input);'}
    </p>
    <p className="pl-4">{'}, []);'}</p>
    <br />
    <p className="pl-4 text-gray-500">{'// Sincronizar valueCents externo → input interno (sin disparar eventos)'}</p>
    <p className="pl-4">
      <span className="text-purple-400">useEffect</span>
      {'(() => {'}
    </p>
    <p className="pl-8">
      <span className="text-pink-400">const</span>
      {' ctrl = ctrlRef.current;'}
    </p>
    <p className="pl-8">
      <span className="text-pink-400">if</span>
      {' (!ctrl || valueCents === undefined) '}
      <span className="text-pink-400">return</span>
      {';'}
    </p>
    <p className="pl-8">
      <span className="text-pink-400">if</span>
      {' (ctrl.getCents() !== valueCents) ctrl.setCents(valueCents, '}
      <span className="text-amber-400">false</span>
      {');'}
    </p>
    <p className="pl-4">{'}, [valueCents]);'}</p>
    <br />
    <p className="pl-4 text-gray-500">{'// money-input → onChangeCents (cada tecla, en centavos)'}</p>
    <p className="pl-4">
      <span className="text-pink-400">const</span>
      {' handleMoneyInput = '}
      <span className="text-purple-400">useCallback</span>
      {'('}
    </p>
    <p className="pl-8">
      {'(e: '}
      <span className="text-sky-400">CustomEvent</span>
      {'<{ value: '}
      <span className="text-sky-400">number</span>
      {' }>) => {'}
    </p>
    <p className="pl-12">{'onChangeCents?.(e.detail.value);'}</p>
    <p className="pl-8">{'},'}</p>
    <p className="pl-8">{'[onChangeCents],'}</p>
    <p className="pl-4">{');'}</p>
    <br />
    <p className="pl-4 text-gray-500">{'// money-change → onMoneyChange (al perder el foco)'}</p>
    <p className="pl-4">
      <span className="text-pink-400">const</span>
      {' handleMoneyChange = '}
      <span className="text-purple-400">useCallback</span>
      {'('}
    </p>
    <p className="pl-8">
      {'(e: '}
      <span className="text-sky-400">CustomEvent</span>
      {'<{ value: '}
      <span className="text-sky-400">number</span>
      {'; formatted: '}
      <span className="text-sky-400">string</span>
      {' }>) => {'}
    </p>
    <p className="pl-12">{'onMoneyChange?.(e.detail.value, e.detail.formatted);'}</p>
    <p className="pl-8">{'},'}</p>
    <p className="pl-8">{'[onMoneyChange],'}</p>
    <p className="pl-4">{');'}</p>
    <br />
    <p className="pl-4">
      <span className="text-purple-400">useEffect</span>
      {'(() => {'}
    </p>
    <p className="pl-8">
      <span className="text-pink-400">const</span>
      {' input = inputRef.current;'}
    </p>
    <p className="pl-8">
      <span className="text-pink-400">if</span>
      {' (!input) '}
      <span className="text-pink-400">return</span>
      {';'}
    </p>
    <p className="pl-8">
      {'input.addEventListener('}
      <span className="text-emerald-400">'money-input'</span>
      {', handleMoneyInput '}
      <span className="text-pink-400">as</span>
      {' EventListener);'}
    </p>
    <p className="pl-8">
      {'input.addEventListener('}
      <span className="text-emerald-400">'money-change'</span>
      {', handleMoneyChange '}
      <span className="text-pink-400">as</span>
      {' EventListener);'}
    </p>
    <p className="pl-8">
      <span className="text-pink-400">return</span>
      {' () => {'}
    </p>
    <p className="pl-12">
      {'input.removeEventListener('}
      <span className="text-emerald-400">'money-input'</span>
      {', handleMoneyInput '}
      <span className="text-pink-400">as</span>
      {' EventListener);'}
    </p>
    <p className="pl-12">
      {'input.removeEventListener('}
      <span className="text-emerald-400">'money-change'</span>
      {', handleMoneyChange '}
      <span className="text-pink-400">as</span>
      {' EventListener);'}
    </p>
    <p className="pl-8">{'};'}</p>
    <p className="pl-4">{'}, [handleMoneyInput, handleMoneyChange]);'}</p>
    <br />
    <p className="pl-4">
      <span className="text-pink-400">return</span>
      {' ('}
    </p>
    <p className="pl-8">
      {'<div '}
      <span className="text-sky-400">className</span>
      {'={`money-input-wrapper${className ? ` ${className}` : \'\'}`}>'}
    </p>
    <p className="pl-12">
      {'{symbol && <span '}
      <span className="text-sky-400">className</span>
      {'='}
      <span className="text-emerald-400">"money-input-symbol"</span>
      {'>{symbol}</span>}'}
    </p>
    <p className="pl-12">{'<input'}</p>
    <p className="pl-16">{'{...rest}'}</p>
    <p className="pl-16">
      <span className="text-sky-400">ref</span>
      {'={inputRef}'}
    </p>
    <p className="pl-16">
      <span className="text-sky-400">id</span>
      {'={id}'}
    </p>
    <p className="pl-16">
      <span className="text-sky-400">type</span>
      {'='}
      <span className="text-emerald-400">"money"</span>
    </p>
    <p className="pl-16">
      <span className="text-sky-400">disabled</span>
      {'={disabled}'}
    </p>
    <p className="pl-16">{'{...(decimals !== undefined ? { decimals: String(decimals) } : {})}'}</p>
    <p className="pl-12">{'/>'}</p>
    <p className="pl-8">{'</div>'}</p>
    <p className="pl-4">{');'}</p>
    <p>{'};'}</p>
    <br />
    <p>
      <span className="text-pink-400">export</span>
      {' '}
      <span className="text-pink-400">default</span>
      {' MoneyInput;'}
    </p>
  </>
);

export default MoneyInputSnippet;
