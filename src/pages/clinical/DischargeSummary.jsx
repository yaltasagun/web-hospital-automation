import { useState } from 'react';
import Badge         from '../../components/Badge';
import Modal         from '../../components/Modal';
import { useLang }   from '../../i18n/LangContext';
import { PlusIcon, PrintIcon } from '../../components/Icons';
import { DISCHARGE_DATA } from '../../data/clinicalData';

const STATUS_KEY = { Completed: 'completed', Draft: 'pending' };
const CONDITION_KEY = {
  Improved: 'active', Stable: 'completed',
  'Awaiting Surgery': 'waiting', Transferred: 'waiting', Deceased: 'cancelled',
};

export default function DischargeSummary() {
  const { t }     = useLang();
  const dc        = t.discharge;
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState(false);

  const list = filter ? DISCHARGE_DATA.filter(d => d.status === filter) : DISCHARGE_DATA;

  return (
    <div>
      <div className="page-actions">
        <div className="filter-bar">
          <select className="filter-select" value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="">{dc.allStatuses}</option>
            <option value="Completed">{dc.statuses.completed}</option>
            <option value="Draft">{dc.statuses.draft}</option>
          </select>
        </div>
        <button className="btn-primary" onClick={() => setModal(true)}>
          <PlusIcon /> {dc.newBtn}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 420px' : '1fr', gap: '14px' }}>
        {/* Table */}
        <div className="card table-card">
          <div className="table-hdr">
            <span className="card-title">{dc.title}</span>
            <span className="tbl-count">{dc.count(list.length)}</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{dc.cols.id}</th><th>{dc.cols.patient}</th><th>{dc.cols.doctor}</th>
                  <th>{dc.cols.admitDate}</th><th>{dc.cols.dischargeDate}</th>
                  <th>{dc.cols.stayDays}</th><th>{dc.cols.diagnosis}</th>
                  <th>{dc.cols.status}</th><th>{dc.cols.actions}</th>
                </tr>
              </thead>
              <tbody>
                {list.map(d => (
                  <tr key={d.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(selected?.id === d.id ? null : d)}>
                    <td><span className="pid">{d.id}</span></td>
                    <td><strong>{d.patient}</strong></td>
                    <td>{d.doctor}</td>
                    <td><span style={{ fontFamily: 'DM Mono,monospace', fontSize: '11px', color: 'var(--text2)' }}>{d.admitDate}</span></td>
                    <td><span style={{ fontFamily: 'DM Mono,monospace', fontSize: '11px', color: 'var(--text2)' }}>{d.dischargeDate || '—'}</span></td>
                    <td><span style={{ fontFamily: 'DM Mono,monospace', fontSize: '11px' }}>{d.stayDays ? dc.detail.stayDays(d.stayDays) : '—'}</span></td>
                    <td style={{ maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.diagnosis}</td>
                    <td><Badge value={t.status[STATUS_KEY[d.status]] || d.status} /></td>
                    <td>
                      <div className="tbl-actions">
                        <button className="tbl-btn" onClick={e => { e.stopPropagation(); setSelected(d); }}>{t.common.view}</button>
                        <button className="tbl-btn">{t.common.print}</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail */}
        {selected && (
          <div className="card" style={{ height: 'fit-content', maxHeight: '80vh', overflowY: 'auto' }}>
            <div className="card-header">
              <span className="card-title">{dc.detail.title}</span>
              <button className="btn-ghost" style={{ fontSize: '11px', padding: '5px 10px' }} onClick={() => setSelected(null)}>×</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Patient header */}
              <div style={{ padding: '12px', background: 'var(--bg2)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--blue)' }}>
                <div style={{ fontSize: '14px', fontWeight: 800 }}>{selected.patient}</div>
                <div style={{ fontSize: '11px', color: 'var(--text1)' }}>{selected.patientId} · {selected.dept}</div>
              </div>

              {/* Dates */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                {[
                  [dc.cols.admitDate, selected.admitDate],
                  [dc.cols.dischargeDate, selected.dischargeDate || '—'],
                  [dc.cols.stayDays, selected.stayDays ? dc.detail.stayDays(selected.stayDays) : '—'],
                ].map(([l, v]) => (
                  <div key={l} style={{ background: 'var(--bg2)', borderRadius: 'var(--radius-sm)', padding: '8px 10px' }}>
                    <div style={{ fontSize: '10px', color: 'var(--text2)', fontFamily: 'DM Mono,monospace', marginBottom: '2px' }}>{l}</div>
                    <div style={{ fontSize: '12px', fontWeight: 700, fontFamily: 'DM Mono,monospace' }}>{v}</div>
                  </div>
                ))}
              </div>

              {/* Sections */}
              {[
                [dc.detail.diagnosis,    selected.diagnosis],
                [dc.detail.condition,    selected.condition],
                [dc.detail.instructions, selected.instructions],
                [dc.detail.followUpDept, selected.followUpDept],
                [dc.detail.followUp,     selected.followUp || '—'],
              ].map(([label, val]) => (
                <div key={label} style={{ background: 'var(--bg2)', borderRadius: 'var(--radius-sm)', padding: '10px 12px' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text2)', fontFamily: 'DM Mono,monospace', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
                  <div style={{ fontSize: '12px', lineHeight: 1.5 }}>{val}</div>
                </div>
              ))}

              {/* Procedures */}
              {selected.procedures.length > 0 && (
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text2)', fontFamily: 'DM Mono,monospace', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                    {dc.detail.procedures}
                  </div>
                  {selected.procedures.map((p, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '5px 0', borderBottom: i < selected.procedures.length - 1 ? '1px solid var(--border)' : 'none' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--blue)', flexShrink: 0 }} />
                      <span style={{ fontSize: '12px' }}>{p}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Discharge meds */}
              {selected.medications.length > 0 && (
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text2)', fontFamily: 'DM Mono,monospace', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                    {dc.detail.medications}
                  </div>
                  {selected.medications.map((m, i) => (
                    <div key={i} style={{ padding: '8px 10px', background: 'var(--bg2)', borderRadius: 'var(--radius-sm)', marginBottom: '5px', borderLeft: '2px solid var(--green)' }}>
                      <div style={{ fontSize: '12px', fontWeight: 700 }}>{m.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text1)', fontFamily: 'DM Mono,monospace' }}>{m.dose}</div>
                    </div>
                  ))}
                </div>
              )}

              <button className="btn-primary" style={{ justifyContent: 'center' }}>
                <PrintIcon /> {dc.detail.printBtn}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* New Discharge Modal */}
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title={dc.newBtn}
        footer={
          <>
            <button className="btn-ghost" onClick={() => setModal(false)}>{t.common.cancel}</button>
            <button className="btn-primary" onClick={() => setModal(false)}>{t.common.save}</button>
          </>
        }
      >
        <div className="form-row">
          <div className="form-group"><label>{dc.cols.patient}</label><input className="form-input" placeholder="Patient name" /></div>
          <div className="form-group"><label>{dc.cols.doctor}</label><input className="form-input" placeholder="Doctor name" /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>{dc.cols.admitDate}</label><input className="form-input" type="date" /></div>
          <div className="form-group"><label>{dc.cols.dischargeDate}</label><input className="form-input" type="date" /></div>
        </div>
        <div className="form-group"><label>{dc.detail.diagnosis}</label><input className="form-input" placeholder="Primary diagnosis" /></div>
        <div className="form-group"><label>{dc.detail.instructions}</label><textarea className="form-input" rows="3" placeholder="Patient instructions..." /></div>
      </Modal>
    </div>
  );
}
