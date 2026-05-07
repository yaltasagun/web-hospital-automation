/**
 * Pure-SVG grouped bar chart — no external library.
 *
 * Props:
 *   data    {number[][]} - e.g. [[a1,a2,...], [b1,b2,...]] one array per series
 *   colors  {string[]}   - One colour per series
 *   labels  {string[]}   - X-axis labels (one per group)
 */
export default function BarChart({ data, colors, labels }) {
  const W = 400, H = 120, PAD = 8;
  const BAR_W = 18, GAP = 28;
  const seriesCount = data.length;
  const max = Math.max(...data.flat());

  return (
    <svg viewBox={`0 0 ${W} ${H + 20}`} style={{ width: '100%', height: '100%' }}>
      {labels.map((label, i) => {
        const groupX = PAD + i * (seriesCount * BAR_W + (seriesCount - 1) * 2 + GAP);

        return (
          <g key={i}>
            {data.map((series, s) => {
              const barH = (series[i] / max) * (H - PAD);
              const x    = groupX + s * (BAR_W + 2);
              return (
                <rect
                  key={s}
                  x={x} y={H - barH}
                  width={BAR_W} height={barH}
                  fill={colors[s]} rx="4" opacity="0.85"
                />
              );
            })}

            <text
              x={groupX + (seriesCount * BAR_W) / 2}
              y={H + 14}
              textAnchor="middle"
              fill="#4b607a"
              fontSize="9"
              fontFamily="DM Mono, monospace"
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
