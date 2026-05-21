import { useState } from 'react';
import Badge         from '../../components/Badge';
import Modal         from '../../components/Modal';
import { useLang }   from '../../i18n/LangContext';
import { PlusIcon }  from '../../components/Icons';
import { SURGERY_DATA } from '../../data/clinicalData';
import { DEPARTMENTS, DOCTORS } from '../../data/constants';

const STATUS_KEY = {
  Scheduled: 'waiting', Confirmed: 'active',
  'Pending Consent': 'pending', 'In Progress': 'active',
  Completed: 'completed', Cancelled: 'cancelled',
};

const OR_COLORS = { 'OR-1': '#3b82f6', 'OR-2': '#10b981', 'OR-3': '#f59e0b', 'OR-4': '#8b5cf6' };

const EMPTY_FORM = {
  patient: '', surgeon: '', procedure: '',
  dept: DEPARTMENTS[0], date: '', time: '', or: 'OR-1',
  duration: '90', anesthesia: 'General', notes: '',
};

export default function SurgerySchedule() {
  const { t } = useLang();
  const sg = t.surgery;
  const [statusFilter, setStatusFilter] = useState('');
  const [orFilter, setOrFilter]         = useState('');
  const [selected, setSelected]         = useState(null);
  const [modal, setModal]               = useState(false);
  const [form, setForm]                 = useState(EMPTY_FORM);

  const list = SURGERY_DATA.filter(s =>
    (!statusFilter || s.status === statusFilter) &&
    (!orFilter     || s.or === orFilter)
  );

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm(f => ({ ...f, [key]: e.target.value })),
  });

  return (
    <div>
      <div className="page-actions">
        <div className="filter-bar">
          <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="">{sg.allStatuses}</option>
            {Object.entries(sg.statusTypes).map(([k, v]) => <option key={k} value={SURGERY_DATA.find(s => s.status.replace(/\s/g,'').toLowerCase().includes(k.toLowerCase()))?.status || k}>{v}</option>)}
          </select>
          <select className="filter-select" value={orFilter} onChange={e => setOrFilter(e.target.value)}>
            <option value="">{sg.allOrs}</option>
            {sg.orRooms.map(o => <option key={o}>{o.replace('AH-','OR-')}</option>)}
          </select>
        </div>
        <button className="btn-primary" onClick={() => setModal(true)}>
          <PlusIcon /> {sg.newBtn}
        </button>
      </div>

      {/* OR summary bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px', marginBottom: '14px' }}>
        {['OR-1','OR-2','OR-3','OR-4'].map(or => {
          const count = SURGERY_DATA.filter(s => s.or === or).length;
          return (
            <div key={or} className="card" style={{ padding: '14px 16px', borderLeft: `3px solid ${OR_COLORS[or]}`, cursor: 'pointer', borderRadius: 'var(--radius)' }}
              onClick={() => setOrFilter(orFilter === or ? '' : or)}>
              <div style={{ fontSize: '11px', color: 'var(--text2)', fontFamily: 'DM Mono,monospace', marginBottom: '4px' }}>{or}</div>
              <div style={{ fontSize: '22px', fontWeight: 800, fontFamily: "'Instrument Serif',serif", color: OR_COLORS[or] }}>{count}</div>
              <div style={{ fontSize: '10px', color: 'var(--text1)' }}>{sg.count(count)}</div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 360px' : '1fr', gap: '14px' }}>
        {/* Table */}
        <div className="card table-card">
          <div className="table-hdr">
            <span className="card-title">{sg.title}</span>
            <span className="tbl-count">{sg.count(list.length)}</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{sg.cols.id}</th><th>{sg.cols.patient}</th><th>{sg.cols.type}</th>
                  <th>{sg.cols.doctor}</th><th>{sg.cols.date}</th><th>{sg.cols.time}</th>
                  <th>{sg.cols.or}</th><th>{sg.cols.anesthesia}</th>
                  <th>{sg.cols.status}</th><th>{sg.cols.actions}</th>
                </tr>
              </thead>
              <tbody>
                {list.map(s => (
                  <tr key={s.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(selected?.id === s.id ? null : s)}>
                    <td><span className="pid">{s.id}</span></td>
                    <td><strong>{s.patient}</strong></td>
                    <td style={{ maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.type}</td>
                    <td>{s.doctor}</td>
                    <td><span style={{ fontFamily: 'DM Mono,monospace', fontSize: '11px', color: 'var(--text2)' }}>{s.date}</span></td>
                    <td><strong style={{ fontFamily: 'DM Mono,monospace' }}>{s.time}</strong></td>
                    <td><span style={{ color: OR_COLORS[s.or], fontWeight: 700, fontFamily: 'DM Mono,monospace', fontSize: '11px' }}>{s.or}</span></td>
                    <td><span style={{ fontSize: '11px', color: 'var(--text1)' }}>{s.anesthesia}</span></td>
                    <td><Badge value={t.status[STATUS_KEY[s.status]] || sg.statusTypes.scheduled} /></td>
                    <td>
                      <div className="tbl-actions">
                        <button className="tbl-btn" onClick={e => { e.stopPropagation(); setSelected(s); }}>{t.common.view}</button>
                        <button className="tbl-btn">{t.common.edit}</button>
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
          <div className="card" style={{ height: 'fit-content' }}>
            <div className="card-header">
              <span className="card-title">{sg.detail.title}</span>
              <button className="btn-ghost" style={{ fontSize: '11px', padding: '5px 10px' }} onClick={() => setSelected(null)}>×</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ padding: '12px', background: 'var(--bg2)', borderRadius: 'var(--radius-sm)', borderLeft: `3px solid ${OR_COLORS[selected.or]}` }}>
                <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '2px' }}>{selected.type}</div>
                <div style={{ fontSize: '11px', color: 'var(--text1)' }}>{selected.patient}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {[
                  [sg.cols.date, selected.date],
                  [sg.cols.time, selected.time],
                  [sg.cols.or, selected.or],
                  [sg.cols.duration, sg.detail.duration(selected.duration)],
                  [sg.cols.anesthesia, selected.anesthesia],
                  [sg.cols.doctor, selected.doctor],
                ].map(([l, v]) => (
                  <div key={l} style={{ background: 'var(--bg2)', borderRadius: 'var(--radius-sm)', padding: '8px 10px' }}>
                    <div style={{ fontSize: '10px', color: 'var(--text2)', fontFamily: 'DM Mono,monospace', marginBottom: '2px' }}>{l}</div>
                    <div style={{ fontSize: '12px', fontWeight: 600 }}>{v}</div>
                  </div>
                ))}
              </div>

              {/* Team */}
              <div>
                <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text2)', fontFamily: 'DM Mono,monospace', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                  {sg.detail.team}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {selected.team.map((m, i) => (
                    <span key={i} style={{ background: 'var(--bg3)', color: 'var(--text0)', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontFamily: 'DM Mono,monospace' }}>{m}</span>
                  ))}
                </div>
              </div>

              {selected.notes && (
                <div style={{ background: 'var(--bg2)', borderRadius: 'var(--radius-sm)', padding: '10px 12px' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text2)', fontFamily: 'DM Mono,monospace', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {sg.detail.notes}
                  </div>
                  <div style={{ fontSize: '12px', lineHeight: 1.5 }}>{selected.notes}</div>
                </div>
              )}

              <Badge value={t.status[STATUS_KEY[selected.status]] || sg.statusTypes.scheduled} />
            </div>
          </div>
        )}
      </div>

      {/* Schedule Modal */}
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title={sg.form.title}
        footer={
          <>
            <button className="btn-ghost" onClick={() => setModal(false)}>{t.common.cancel}</button>
            <button className="btn-primary" onClick={() => setModal(false)}><PlusIcon /> {t.common.save}</button>
          </>
        }
      >
        <div className="form-row">
          <div className="form-group"><label>{sg.form.patient}</label><input className="form-input" {...field('patient')} /></div>
          <div className="form-group">
            <label>{sg.form.surgeon}</label>
            <select className="form-input" {...field('surgeon')}>
              <option value="">{t.common.select}</option>
              {DOCTORS.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
        </div>
        <div className="form-group"><label>{sg.form.procedure}</label><input className="form-input" {...field('procedure')} /></div>
        <div className="form-row">
          <div className="form-group"><label>{sg.form.date}</label><input className="form-input" type="date" {...field('date')} /></div>
          <div className="form-group"><label>{sg.form.time}</label><input className="form-input" type="time" {...field('time')} /></div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>{sg.form.or}</label>
            <select className="form-input" {...field('or')}>
              {['OR-1','OR-2','OR-3','OR-4'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>{sg.form.anesthesia}</label>
            <select className="form-input" {...field('anesthesia')}>
              {sg.anesthesiaTypes.map(a => <option key={a}>{a}</option>)}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>{sg.form.dept}</label>
            <select className="form-input" {...field('dept')}>
              {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="form-group"><label>{sg.form.duration}</label><input className="form-input" type="number" {...field('duration')} /></div>
        </div>
        <div className="form-group"><label>{sg.form.notes}</label><textarea className="form-input" rows="2" {...field('notes')} /></div>
      </Modal>
    </div>
  );
}
