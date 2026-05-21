import { useState } from 'react';
import Badge            from '../../components/Badge';
import { useLang }      from '../../i18n/LangContext';
import { BackIcon }     from '../../components/Icons';
import {
  VITALS_HISTORY,
  MEDICAL_HISTORY,
  ALLERGIES,
  PRESCRIPTION_DATA,
} from '../../data/clinicalData';

const TABS = ['overview', 'vitals', 'history', 'allergies'];

const SEVERITY_CLASS = { Mild: 'waiting', Moderate: 'waiting', Severe: 'cancelled' };
const HISTORY_COLOR  = {
  Diagnosis: '#ef4444', Lab: '#3b82f6', Consultation: '#10b981',
  Surgery: '#f97316', Admission: '#8b5cf6',
};

export default function PatientProfile({ patient, onBack }) {
  const { t } = useLang();
  const pt = t.profile;
  const [tab, setTab] = useState('overview');

  if (!patient) return null;

  const activeMeds = PRESCRIPTION_DATA.filter(rx => rx.status === 'Active')
    .flatMap(rx => rx.medications.map(m => ({ ...m, patient: rx.patient })))
    .slice(0, 6);

  return (
    <div>
      {/* Back button */}
      <button
        className="btn-ghost"
        onClick={onBack}
        style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}
      >
        <BackIcon /> {pt.backToList}
      </button>

      {/* Header card */}
      <div className="card" style={{ marginBottom: '14px', padding: '20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{
            width: '60px', height: '60px', borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, var(--blue), var(--violet))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '20px', fontWeight: 800, color: 'white',
            fontFamily: "'Instrument Serif', serif",
          }}>
            {patient.first[0]}{patient.last[0]}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.3px', marginBottom: '4px' }}>
              {patient.first} {patient.last}
            </div>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              {[
                [pt.bloodType,    patient.blood],
                [pt.department,   patient.dept],
                [pt.attendingDoc, patient.doctor],
                [pt.admitDate,    patient.date],
              ].map(([label, val]) => (
                <div key={label}>
                  <span style={{ fontSize: '10px', color: 'var(--text2)', fontFamily: 'DM Mono,monospace', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</span>
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>{val || '—'}</div>
                </div>
              ))}
              <div>
                <span style={{ fontSize: '10px', color: 'var(--text2)', fontFamily: 'DM Mono,monospace', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</span>
                <div><Badge value={patient.status} /></div>
              </div>
            </div>
          </div>
          <span className="pid" style={{ fontSize: '13px' }}>{patient.id}</span>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '14px', background: 'var(--bg1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '5px' }}>
        {TABS.map(k => (
          <button
            key={k}
            onClick={() => setTab(k)}
            style={{
              flex: 1, padding: '8px', border: 'none', cursor: 'pointer', borderRadius: '10px',
              background: tab === k ? 'var(--blue)' : 'transparent',
              color: tab === k ? 'white' : 'var(--text1)',
              fontFamily: 'Syne,sans-serif', fontSize: '12px', fontWeight: 700,
              transition: 'all 0.2s',
            }}
          >
            {pt[k]}
          </button>
        ))}
      </div>

      {/* ── Overview ── */}
      {tab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          {/* Latest vitals */}
          <div className="card">
            <div className="card-header"><span className="card-title">{pt.vitals}</span></div>
            {VITALS_HISTORY[0] && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                {[
                  [pt.vitalsCols.bp,     VITALS_HISTORY[0].bp],
                  [pt.vitalsCols.pulse,  VITALS_HISTORY[0].pulse + ' bpm'],
                  [pt.vitalsCols.temp,   VITALS_HISTORY[0].temp + ' °C'],
                  [pt.vitalsCols.spo2,   VITALS_HISTORY[0].spo2 + '%'],
                  [pt.vitalsCols.weight, VITALS_HISTORY[0].weight + ' kg'],
                ].map(([lbl, val]) => (
                  <div key={lbl} style={{ background: 'var(--bg2)', borderRadius: 'var(--radius-sm)', padding: '10px 12px' }}>
                    <div style={{ fontSize: '10px', color: 'var(--text2)', fontFamily: 'DM Mono,monospace', marginBottom: '4px' }}>{lbl}</div>
                    <div style={{ fontSize: '16px', fontWeight: 800, fontFamily: "'Instrument Serif', serif" }}>{val}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Active medications */}
          <div className="card">
            <div className="card-header"><span className="card-title">{pt.activeMeds}</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {activeMeds.slice(0, 4).map((m, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', background: 'var(--bg2)', borderRadius: 'var(--radius-sm)' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 600 }}>{m.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text1)' }}>{m.dose} · {m.freq}</div>
                  </div>
                  <span style={{ fontSize: '10px', color: 'var(--text2)', fontFamily: 'DM Mono,monospace' }}>{m.duration}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Recent history */}
          <div className="card" style={{ gridColumn: '1 / -1' }}>
            <div className="card-header"><span className="card-title">{pt.history}</span></div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {MEDICAL_HISTORY.slice(0, 3).map((h, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: HISTORY_COLOR[h.type] || '#888', flexShrink: 0, boxShadow: `0 0 6px ${HISTORY_COLOR[h.type] || '#888'}` }} />
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>{pt.historyTypes[h.type.toLowerCase()] || h.type}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text1)', marginLeft: '8px' }}>{h.desc}</span>
                  </div>
                  <span style={{ fontSize: '10px', color: 'var(--text2)', fontFamily: 'DM Mono,monospace' }}>{h.doctor}</span>
                  <span style={{ fontSize: '10px', color: 'var(--text2)', fontFamily: 'DM Mono,monospace' }}>{h.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Vitals Tab ── */}
      {tab === 'vitals' && (
        <div className="card table-card">
          <div className="table-hdr"><span className="card-title">{pt.vitals}</span></div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>{Object.values(pt.vitalsCols).map(c => <th key={c}>{c}</th>)}</tr>
              </thead>
              <tbody>
                {VITALS_HISTORY.map((v, i) => (
                  <tr key={i}>
                    <td><span style={{ fontFamily: 'DM Mono,monospace', fontSize: '11px', color: 'var(--text2)' }}>{v.date}</span></td>
                    <td><strong style={{ fontFamily: 'DM Mono,monospace' }}>{v.bp}</strong></td>
                    <td style={{ fontFamily: 'DM Mono,monospace' }}>{v.pulse}</td>
                    <td style={{ fontFamily: 'DM Mono,monospace', color: v.temp > 37.5 ? 'var(--red)' : 'inherit' }}>{v.temp}</td>
                    <td style={{ fontFamily: 'DM Mono,monospace', color: v.spo2 < 95 ? 'var(--red)' : 'inherit' }}>{v.spo2}</td>
                    <td style={{ fontFamily: 'DM Mono,monospace' }}>{v.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── History Tab ── */}
      {tab === 'history' && (
        <div className="card table-card">
          <div className="table-hdr"><span className="card-title">{pt.history}</span></div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>{Object.values(pt.historyCols).map(c => <th key={c}>{c}</th>)}</tr>
              </thead>
              <tbody>
                {MEDICAL_HISTORY.map((h, i) => (
                  <tr key={i}>
                    <td><span style={{ fontFamily: 'DM Mono,monospace', fontSize: '11px', color: 'var(--text2)' }}>{h.date}</span></td>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: HISTORY_COLOR[h.type] || '#888', flexShrink: 0 }} />
                        {pt.historyTypes[h.type.toLowerCase()] || h.type}
                      </span>
                    </td>
                    <td>{h.desc}</td>
                    <td>{h.doctor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Allergies Tab ── */}
      {tab === 'allergies' && (
        <div className="card table-card">
          <div className="table-hdr">
            <span className="card-title">{pt.allergies}</span>
            <span className="tbl-count">{ALLERGIES.length}</span>
          </div>
          {ALLERGIES.length === 0
            ? <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text2)' }}>{pt.noAllergies}</div>
            : (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>{Object.values(pt.allergyCols).map(c => <th key={c}>{c}</th>)}</tr>
                  </thead>
                  <tbody>
                    {ALLERGIES.map((a, i) => (
                      <tr key={i}>
                        <td><strong>{a.substance}</strong></td>
                        <td>{a.reaction}</td>
                        <td><span className={`badge badge-${SEVERITY_CLASS[a.severity] || 'pending'}`}>{pt.severity[a.severity.toLowerCase()] || a.severity}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }
        </div>
      )}
    </div>
  );
}
