import { useState } from 'react';
import Badge         from '../../components/Badge';
import Modal         from '../../components/Modal';
import { useLang }   from '../../i18n/LangContext';
import { PlusIcon, PrintIcon, TrashIcon } from '../../components/Icons';
import { PRESCRIPTION_DATA } from '../../data/clinicalData';
import { DEPARTMENTS, DOCTORS } from '../../data/constants';

const STATUS_KEY = { Active: 'active', Completed: 'completed' };

const EMPTY_FORM = { patient: '', doctor: '', dept: DEPARTMENTS[0], notes: '', medications: [{ name: '', dose: '', frequency: '', duration: '' }] };

export default function Prescriptions() {
  const { t } = useLang();
  const rx = t.prescriptions;
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected]         = useState(null);
  const [modal, setModal]               = useState(false);
  const [form, setForm]                 = useState(EMPTY_FORM);

  const list = statusFilter
    ? PRESCRIPTION_DATA.filter(p => p.status === statusFilter)
    : PRESCRIPTION_DATA;

  const addMed = () => setForm(f => ({ ...f, medications: [...f.medications, { name: '', dose: '', frequency: '', duration: '' }] }));
  const removeMed = (i) => setForm(f => ({ ...f, medications: f.medications.filter((_, idx) => idx !== i) }));
  const medField = (i, key) => ({
    value: form.medications[i][key],
    onChange: (e) => setForm(f => {
      const meds = [...f.medications];
      meds[i] = { ...meds[i], [key]: e.target.value };
      return { ...f, medications: meds };
    }),
  });

  return (
    <div>
      <div className="page-actions">
        <div className="filter-bar">
          <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="">{rx.allStatuses}</option>
            <option value="Active">{rx.active}</option>
            <option value="Completed">{rx.completed}</option>
          </select>
        </div>
        <button className="btn-primary" onClick={() => setModal(true)}>
          <PlusIcon /> {rx.newBtn}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: '14px' }}>
        {/* Table */}
        <div className="card table-card">
          <div className="table-hdr">
            <span className="card-title">{rx.title}</span>
            <span className="tbl-count">{rx.count(list.length)}</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{rx.cols.id}</th><th>{rx.cols.patient}</th><th>{rx.cols.doctor}</th>
                  <th>{rx.cols.date}</th><th>{rx.cols.dept}</th><th>{rx.cols.meds}</th>
                  <th>{rx.cols.status}</th><th>{rx.cols.actions}</th>
                </tr>
              </thead>
              <tbody>
                {list.map((p, i) => (
                  <tr key={p.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(selected?.id === p.id ? null : p)}>
                    <td><span className="pid">{p.id}</span></td>
                    <td><strong>{p.patient}</strong></td>
                    <td>{p.doctor}</td>
                    <td><span style={{ fontFamily: 'DM Mono,monospace', fontSize: '11px', color: 'var(--text2)' }}>{p.date}</span></td>
                    <td>{p.dept}</td>
                    <td><span style={{ fontFamily: 'DM Mono,monospace', color: 'var(--text2)', fontSize: '11px' }}>{p.medications.length} item{p.medications.length !== 1 ? 's' : ''}</span></td>
                    <td><Badge value={t.status[STATUS_KEY[p.status]] || p.status} /></td>
                    <td>
                      <div className="tbl-actions">
                        <button className="tbl-btn" onClick={e => { e.stopPropagation(); setSelected(p); }}>{t.common.view}</button>
                        <button className="tbl-btn">{t.common.print}</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="card" style={{ height: 'fit-content' }}>
            <div className="card-header">
              <span className="card-title">{rx.detail.title}</span>
              <button className="btn-ghost" style={{ fontSize: '11px', padding: '5px 10px' }} onClick={() => setSelected(null)}>×</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Meta */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {[['Patient', selected.patient], ['Doctor', selected.doctor], ['Date', selected.date], ['Dept', selected.dept]].map(([l, v]) => (
                  <div key={l} style={{ background: 'var(--bg2)', borderRadius: 'var(--radius-sm)', padding: '8px 10px' }}>
                    <div style={{ fontSize: '10px', color: 'var(--text2)', fontFamily: 'DM Mono,monospace', marginBottom: '2px' }}>{l}</div>
                    <div style={{ fontSize: '12px', fontWeight: 600 }}>{v}</div>
                  </div>
                ))}
              </div>

              {/* Medications */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text2)', fontFamily: 'DM Mono,monospace', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                  {rx.detail.medication}
                </div>
                {selected.medications.map((m, i) => (
                  <div key={i} style={{ padding: '10px 12px', background: 'var(--bg2)', borderRadius: 'var(--radius-sm)', marginBottom: '6px', borderLeft: '2px solid var(--blue)' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>{m.name}</div>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: 'var(--text1)', fontFamily: 'DM Mono,monospace' }}>
                      <span>{m.dose}</span>
                      <span>·</span>
                      <span>{m.freq}</span>
                      <span>·</span>
                      <span>{m.duration}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Notes */}
              {selected.notes && (
                <div style={{ background: 'var(--bg2)', borderRadius: 'var(--radius-sm)', padding: '10px 12px' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text2)', fontFamily: 'DM Mono,monospace', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {rx.detail.notes}
                  </div>
                  <div style={{ fontSize: '12px', lineHeight: 1.5 }}>{selected.notes}</div>
                </div>
              )}

              <button className="btn-primary" style={{ justifyContent: 'center' }}>
                <PrintIcon /> {rx.detail.printBtn}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* New Prescription Modal */}
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title={rx.form.title}
        footer={
          <>
            <button className="btn-ghost" onClick={() => setModal(false)}>{t.common.cancel}</button>
            <button className="btn-primary" onClick={() => setModal(false)}><PlusIcon /> {t.common.save}</button>
          </>
        }
      >
        <div className="form-row">
          <div className="form-group">
            <label>{rx.form.patient}</label>
            <input className="form-input" value={form.patient} onChange={e => setForm(f => ({ ...f, patient: e.target.value }))} placeholder={rx.form.placeholders.patient} />
          </div>
          <div className="form-group">
            <label>{rx.form.doctor}</label>
            <select className="form-input" value={form.doctor} onChange={e => setForm(f => ({ ...f, doctor: e.target.value }))}>
              <option value="">{t.common.select}</option>
              {DOCTORS.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>{rx.form.dept}</label>
          <select className="form-input" value={form.dept} onChange={e => setForm(f => ({ ...f, dept: e.target.value }))}>
            {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>

        {/* Medication rows */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text2)', fontFamily: 'DM Mono,monospace', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
            {rx.detail.medication}
          </div>
          {form.medications.map((m, i) => (
            <div key={i} style={{ background: 'var(--bg2)', borderRadius: 'var(--radius-sm)', padding: '12px', marginBottom: '8px', position: 'relative' }}>
              <div className="form-group" style={{ marginBottom: '8px' }}>
                <label>{rx.form.medName}</label>
                <input className="form-input" {...medField(i, 'name')} placeholder={rx.form.placeholders.medName} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>{rx.form.dose}</label>
                  <input className="form-input" {...medField(i, 'dose')} placeholder={rx.form.placeholders.dose} />
                </div>
                <div className="form-group">
                  <label>{rx.form.frequency}</label>
                  <input className="form-input" {...medField(i, 'frequency')} placeholder={rx.form.placeholders.frequency} />
                </div>
              </div>
              <div className="form-group">
                <label>{rx.form.duration}</label>
                <input className="form-input" {...medField(i, 'duration')} placeholder={rx.form.placeholders.duration} />
              </div>
              {form.medications.length > 1 && (
                <button
                  onClick={() => removeMed(i)}
                  style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--red)', fontSize: '11px', fontFamily: 'Syne,sans-serif', fontWeight: 600 }}
                >
                  {rx.form.removeMed}
                </button>
              )}
            </div>
          ))}
          <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center', fontSize: '11px' }} onClick={addMed}>
            <PlusIcon /> {rx.form.addMed}
          </button>
        </div>

        <div className="form-group">
          <label>{rx.form.notes}</label>
          <textarea className="form-input" rows="2" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder={rx.form.placeholders.notes} />
        </div>
      </Modal>
    </div>
  );
}
