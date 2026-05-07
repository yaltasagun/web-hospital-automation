/**
 * Pure-SVG sparkline / area chart — no external library.
 *
 * Props:
 *   data   {number[]} - Array of values
 *   color  {string}   - Stroke colour
 *   fill   {boolean}  - Whether to show gradient fill area
 */
export default function SparkLine({ data, color, fill = false }) {
  const W = 320, H = 90, PAD = 8;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const xs = data.map((_, i) => PAD + i * (W - 2 * PAD) / (data.length - 1));
  const ys = data.map((v)  => H - PAD - ((v - min) / range) * (H - 2 * PAD));

  const polyline = xs.map((x, i) => `${x},${ys[i]}`).join(' ');
  const area     = `${xs[0]},${H} ${polyline} ${xs[xs.length - 1]},${H}`;
  const gradId   = `spark-${color.replace('#', '')}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.01" />
        </linearGradient>
      </defs>

      {fill && <polygon points={area} fill={`url(#${gradId})`} />}

      <polyline
        points={polyline}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {xs.map((x, i) => (
        <circle key={i} cx={x} cy={ys[i]} r="3" fill={color} />
      ))}
    </svg>
  );
}
