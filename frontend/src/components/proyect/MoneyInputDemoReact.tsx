import { useState } from 'react';
import MoneyInput from './MoneyInput';

const fmtBs = (v: number) =>
    'Bs. ' + v.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export default function MoneyInputDemo() {
    const [costo,  setCosto]  = useState(75464846);
    const [precio, setPrecio] = useState(0);
    const [log,    setLog]    = useState<string[]>([]);

    const ganancia = precio - costo;
    const margen   = precio > 0 ? (ganancia / precio) * 100 : 0;

    const addLog = (name: string, cents: number, formatted: string) => {
        const time = new Date().toLocaleTimeString();
        setLog(prev =>
            [`${time}  money-change · ${name} → ${formatted} (${cents} cents)`, ...prev].slice(0, 4)
        );
    };

    const applyPreset = (c: number, p: number) => {
        setCosto(c);
        setPrecio(p);
    };

    return (
        <div style={{ padding: '1.5rem', maxWidth: 600, fontFamily: 'sans-serif' }}>

            {/* ── Inputs controlados ── */}
            <section style={s.section}>
                <p style={s.sectionLabel}>Inputs controlados</p>

                <div style={s.grid2}>
                    <div>
                        <label style={s.label} htmlFor="bcv-costo">Costo BCV</label>
                        <MoneyInput
                            id="bcv-costo"
                            value={costo}
                            onChange={setCosto}
                            symbol="Bs."
                            decimals={2}
                        />
                    </div>
                    <div>
                        <label style={s.label} htmlFor="bcv-precio">Precio de venta</label>
                        <MoneyInput
                            id="bcv-precio"
                            value={precio}
                            onChange={setPrecio}
                            symbol="Bs."
                            decimals={2}
                        />
                    </div>
                </div>

                <hr style={s.divider} />

                <div style={s.grid2}>
                    <StatCard label="Costo"    value={fmtBs(costo)} />
                    <StatCard label="Precio"   value={fmtBs(precio)} />
                    <StatCard label="Ganancia" value={fmtBs(ganancia)} color={ganancia >= 0 ? 'green' : 'red'} />
                    <StatCard label="Margen"   value={`${margen.toFixed(1)}%`} color={margen >= 0 ? 'green' : 'red'} />
                </div>
            </section>

            {/* ── Setear externamente ── */}
            <section style={s.section}>
                <p style={s.sectionLabel}>Setear valor externamente</p>
                <p style={s.hint}>Simula una carga desde API o preseteados rápidos.</p>
                <div style={s.btnRow}>
                    <button style={s.btn} onClick={() => applyPreset(100, 150)}>
                        Preset: 100 / 150
                    </button>
                    <button style={s.btn} onClick={() => applyPreset(1500.75, 2250)}>
                        Preset: 1.500,75 / 2.250
                    </button>
                    <button style={s.btn} onClick={() => applyPreset(99999.99, 149999)}>
                        Preset máximo
                    </button>
                    <button style={s.btn} onClick={() => { setCosto(0); setPrecio(0); }}>
                        Resetear todo
                    </button>
                </div>
                <pre style={s.code}>{`// estado React\ncosto  = ${costo.toFixed(2)}\nprecio = ${precio.toFixed(2)}`}</pre>
            </section>

            {/* ── Log de eventos money-change ── */}
            <section style={s.section}>
                <p style={s.sectionLabel}>Evento money-change (al perder foco)</p>
                <div style={s.grid2}>
                    <div>
                        <label style={s.label} htmlFor="bcv-log-a">Campo A</label>
                        <MoneyInput
                            id="bcv-log-a"
                            value={0}
                            onChange={() => {}}
                            onMoneyChange={(cents, formatted) => addLog('campo-a', cents, formatted)}
                            symbol="Bs."
                        />
                    </div>
                    <div>
                        <label style={s.label} htmlFor="bcv-log-b">Campo B</label>
                        <MoneyInput
                            id="bcv-log-b"
                            value={0}
                            onChange={() => {}}
                            onMoneyChange={(cents, formatted) => addLog('campo-b', cents, formatted)}
                            symbol="Bs."
                        />
                    </div>
                </div>
                <div style={{ marginTop: 10, fontFamily: 'monospace', fontSize: 12, color: '#888', minHeight: 32 }}>
                    {log.length === 0
                        ? <span>— esperando eventos (escribe y saca el foco) —</span>
                        : log.map((line, i) => <div key={i}>{line}</div>)
                    }
                </div>
            </section>

        </div>
    );
}

function StatCard({ label, value, color }: { label: string; value: string; color?: 'green' | 'red' }) {
    const valueColor = color === 'green' ? '#16a34a' : color === 'red' ? '#dc2626' : 'inherit';
    return (
        <div style={s.statCard}>
            <p style={s.statLabel}>{label}</p>
            <p style={{ ...s.statValue, color: valueColor }}>{value}</p>
        </div>
    );
}

const s = {
    section: {
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        padding: '1.25rem',
        marginBottom: '1rem',
    } satisfies React.CSSProperties,
    sectionLabel: {
        fontSize: 11,
        color: '#9ca3af',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.06em',
        margin: '0 0 12px',
    } satisfies React.CSSProperties,
    hint: {
        fontSize: 13,
        color: '#6b7280',
        margin: '0 0 10px',
    } satisfies React.CSSProperties,
    label: {
        display: 'block',
        fontSize: 13,
        color: '#6b7280',
        marginBottom: 4,
    } satisfies React.CSSProperties,
    grid2: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12,
    } satisfies React.CSSProperties,
    divider: {
        border: 'none',
        borderTop: '1px solid #f3f4f6',
        margin: '12px 0',
    } satisfies React.CSSProperties,
    statCard: {
        background: '#f9fafb',
        borderRadius: 8,
        padding: '0.875rem 1rem',
    } satisfies React.CSSProperties,
    statLabel: {
        fontSize: 12,
        color: '#9ca3af',
        margin: '0 0 4px',
    } satisfies React.CSSProperties,
    statValue: {
        fontSize: 20,
        fontWeight: 500,
        margin: 0,
    } satisfies React.CSSProperties,
    btnRow: {
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap' as const,
        marginBottom: 10,
    } satisfies React.CSSProperties,
    btn: {
        cursor: 'pointer',
        fontSize: 13,
        padding: '5px 12px',
        borderRadius: 8,
        border: '1px solid #d1d5db',
        background: 'transparent',
    } satisfies React.CSSProperties,
    code: {
        fontFamily: 'monospace',
        fontSize: 12,
        background: '#f3f4f6',
        borderRadius: 8,
        padding: '10px 12px',
        color: '#6b7280',
        margin: 0,
    } satisfies React.CSSProperties,
} satisfies Record<string, React.CSSProperties>;
