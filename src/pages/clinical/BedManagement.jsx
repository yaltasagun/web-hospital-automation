import { useState, useMemo } from 'react';
import { useLang }            from '../../i18n/LangContext';
import { WARDS, generateBeds } from '../../data/clinicalData';

const STATUS_COLORS = {
  Available: 'var(--green)',
  Occupied:  'var(--blue)',
  Cleaning:  'var(--yellow)',
};
const STATUS_BG = {
  Available: 'rgba(16,185,129,0.12)',
  Occupied:  'rgba(59,130,246,0.12)',
  Cleaning:  'rgba(245,158,11,0.12)',
};

export default function BedManagement() {
  const { t, lang }        = useLang();
  const bd                  = t.beds;
  const [wardFilter, setWardFilter] = useState('');
  const [selected, setSelected]     = useState(null);
  const [beds]                      = useState(() => generateBeds());

  const filtered = useMemo(() =>
    wardFilter ? beds.filter(b => b.ward === wardFilter) : beds
  , [beds, wardFilter]);

  const totals = useMemo(() => ({
    total:     filtered.length,
    available: filtered.filter(b => b.status === 'Available').length,
    occupied:  filtered.filter(b => b.status === 'Occupied').length,
    cleaning:  filtered.filter(b => b.status === 'Cleaning').length,
  }), [filtered]);

  return (
    <div>
      {/* Ward summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px', marginBottom: '16px' }}>
        {/* All */}
        <div
          className="card"
          style={{ padding: '14px 16px', cursor: 'pointer', borderLeft: wardFilter === '' ? '3px solid var(--blue)' : '3px solid transparent' }}
          onClick={() => setWardFilter('')}
        >
          <div style={{ fontSize: '11px', color: 'var(--text2)', fontFamily: 'DM Mono,monospace', marginBottom: '4px' }}>{bd.selectWard}</div>
          <div style={{ fontSize: '22px', fontWeight: 800, fontFamily: "'Instrument Serif',serif" }}>{beds.length}</div>
          <div style={{ fontSize: '10px', color: 'var(--text1)' }}>
            <span style={{ color: 'var(--green)' }}>{beds.filter(b => b.status === 'Available').length} {bd.available}</span>
            {' · '}
            <span style={{ color: 'var(--blue)' }}>{beds.filter(b => b.status === 'Occupied').length} {bd.occupied}</span>
          </div>
        </div>

        {WARDS.map(w => {
          const wBeds = beds.filter(b => b.ward === w.id);
          const occ   = wBeds.filter(b => b.status === 'Occupied').length;
          const pct   = Math.round((occ / wBeds.length) * 100);
          return (
            <div
              key={w.id}
              className="card"
              style={{ padding: '14px 16px', cursor: 'pointer', borderLeft: wardFilter === w.id ? `3px solid ${w.color}` : '3px solid transparent', transition: 'all 0.2s' }}
              onClick={() => setWardFilter(wardFilter === w.id ? '' : w.id)}
            >
              <div style={{ fontSize: '11px', color: 'var(--text2)', fontFamily: 'DM Mono,monospace', marginBottom: '4px' }}>{lang === 'tr' ? w.nameTr : w.name}</div>
              <div style={{ fontSize: '22px', fontWeight: 800, fontFamily: "'Instrument Serif',serif", color: w.color }}>{pct}%</div>
              <div style={{ fontSize: '10px', color: 'var(--text1)' }}>{occ} / {wBeds.length} {bd.occupied.toLowerCase()}</div>
              {/* Mini bar */}
              <div style={{ marginTop: '6px', height: '4px', background: 'var(--bg3)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: w.color, borderRadius: '2px', transition: 'width 0.8s ease' }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
        {[
          [bd.totalBeds, totals.total, 'var(--text0)'],
          [bd.available, totals.available, 'var(--green)'],
          [bd.occupied,  totals.occupied,  'var(--blue)'],
          [bd.cleaning,  totals.cleaning,  'var(--yellow)'],
        ].map(([label, val, color]) => (
          <div key={label} style={{ background: 'var(--bg1)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px', fontWeight: 800, fontFamily: "'Instrument Serif',serif", color }}>{val}</span>
            <span style={{ fontSize: '11px', color: 'var(--text1)' }}>{label}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 300px' : '1fr', gap: '14px' }}>
        {/* Bed grid */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">{wardFilter ? (lang === 'tr' ? WARDS.find(w => w.id === wardFilter)?.nameTr : WARDS.find(w => w.id === wardFilter)?.name) : bd.overview}</span>
            {/* Legend */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {Object.entries(STATUS_COLORS).map(([status, color]) => (
                <span key={status} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: 'var(--text2)', fontFamily: 'DM Mono,monospace' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '3px', background: color }} />
                  {bd.statuses[status.toLowerCase()] || status}
                </span>
              ))}
            </div>
          </div>

          {/* Beds by ward */}
          {(wardFilter ? WARDS.filter(w => w.id === wardFilter) : WARDS).map(ward => {
            const wardBeds = filtered.filter(b => b.ward === ward.id);
            return (
              <div key={ward.id} style={{ marginBottom: '18px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: ward.color, fontFamily: 'DM Mono,monospace', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {lang === 'tr' ? ward.nameTr : ward.name}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {wardBeds.map(bed => (
                    <div
                      key={bed.id}
                      title={bed.patient || bd.statuses[bed.status.toLowerCase()] || bed.status}
                      onClick={() => setSelected(selected?.id === bed.id ? null : bed)}
                      style={{
                        width: '44px', height: '44px', borderRadius: '8px', cursor: 'pointer',
                        background: STATUS_BG[bed.status] || 'var(--bg2)',
                        border: selected?.id === bed.id ? `2px solid ${STATUS_COLORS[bed.status]}` : `1px solid ${STATUS_COLORS[bed.status]}33`,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.15s',
                        boxShadow: selected?.id === bed.id ? `0 0 8px ${STATUS_COLORS[bed.status]}55` : 'none',
                      }}
                    >
                      <span style={{ fontSize: '9px', fontFamily: 'DM Mono,monospace', color: STATUS_COLORS[bed.status], fontWeight: 700 }}>{bed.number}</span>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: STATUS_COLORS[bed.status], marginTop: '2px', opacity: 0.7 }} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bed detail panel */}
        {selected && (
          <div className="card" style={{ height: 'fit-content' }}>
            <div className="card-header">
              <span className="card-title">{bd.bedDetail.bedNo} {selected.number}</span>
              <button className="btn-ghost" style={{ fontSize: '11px', padding: '5px 10px' }} onClick={() => setSelected(null)}>×</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ padding: '12px', background: STATUS_BG[selected.status], borderRadius: 'var(--radius-sm)', borderLeft: `3px solid ${STATUS_COLORS[selected.status]}` }}>
                <div style={{ fontSize: '14px', fontWeight: 800, color: STATUS_COLORS[selected.status] }}>
                  {bd.statuses[selected.status.toLowerCase()] || selected.status}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text2)', fontFamily: 'DM Mono,monospace' }}>{selected.id}</div>
              </div>

              {selected.patient ? (
                <>
                  {[[bd.bedDetail.patient, selected.patient], [bd.bedDetail.doctor, selected.doctor], [bd.bedDetail.admitted, selected.admitDate]].map(([l, v]) => (
                    <div key={l} style={{ background: 'var(--bg2)', borderRadius: 'var(--radius-sm)', padding: '8px 10px' }}>
                      <div style={{ fontSize: '10px', color: 'var(--text2)', fontFamily: 'DM Mono,monospace', marginBottom: '2px' }}>{l}</div>
                      <div style={{ fontSize: '12px', fontWeight: 600 }}>{v}</div>
                    </div>
                  ))}
                  <button className="btn-primary" style={{ justifyContent: 'center' }}>{bd.bedDetail.discharge}</button>
                </>
              ) : (
                <button className="btn-primary" style={{ justifyContent: 'center' }}>{bd.bedDetail.assign}</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
