/**
 * Pure-SVG donut chart — no external library.
 *
 * Props:
 *   data    {number[]} - Percentage values (must sum ≤ 100)
 *   colors  {string[]} - One colour per slice
 *   labels  {string[]} - Legend labels
 */
export default function DonutChart({ data, colors, labels }) {
  const R = 60, CX = 75, CY = 75, STROKE = 24;
  const total = data.reduce((a, b) => a + b, 0);
  let cumulative = 0;

  const slices = data.map((v, i) => {
    const pct   = v / total;
    const start = cumulative;
    const end   = cumulative + pct;
    cumulative  = end;

    const s  = start * 2 * Math.PI - Math.PI / 2;
    const e  = end   * 2 * Math.PI - Math.PI / 2;
    const x1 = CX + R * Math.cos(s);
    const y1 = CY + R * Math.sin(s);
    const x2 = CX + R * Math.cos(e);
    const y2 = CY + R * Math.sin(e);
    const large = pct > 0.5 ? 1 : 0;

    return { d: `M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2}`, color: colors[i], pct };
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
      <svg viewBox="0 0 150 150" width="130" height="130">
        {slices.map((s, i) => (
          <path key={i} d={s.d} fill="none" stroke={s.color} strokeWidth={STROKE} opacity="0.85" />
        ))}
        <text x={CX} y={CY + 4} textAnchor="middle" fill="#f0f6ff" fontSize="11" fontFamily="Syne, sans-serif" fontWeight="700">
          Dept
        </text>
      </svg>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {labels.map((l, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '11px', fontFamily: 'DM Mono, monospace' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: colors[i], flexShrink: 0 }} />
            <span style={{ color: '#94a3b8' }}>{l}</span>
            <span style={{ color: '#f0f6ff', marginLeft: 'auto' }}>{data[i]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
