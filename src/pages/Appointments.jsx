import { useState } from 'react';
import Badge        from '../components/Badge';
import Modal        from '../components/Modal';
import MiniCalendar from '../components/MiniCalendar';
import { PlusIcon } from '../components/Icons';
import { DEPARTMENTS, DOCTORS, APPT_TYPES } from '../data/constants';
import { useLang } from '../i18n/LangContext';

const EMPTY_FORM = { patient: '', time: '', doctor: '', dept: DEPARTMENTS[0], type: APPT_TYPES[0], notes: '' };

const APPT_STATUS_KEY = { 'Completed':'completed', 'Waiting':'waiting', 'In Progress':'inProgress', 'Cancelled':'cancelled' };

export default function Appointments({ appointments, setAppointments }) {
  const { t } = useLang();
  const at = t.appointments;

  const [modal, setModal] = useState(false);
  const [form,  setForm]  = useState(EMPTY_FORM);

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm(f => ({ ...f, [key]: e.target.value })),
  });

  const handleSave = () => {
    if (!form.patient || !form.time || !form.doctor) { alert(t.common.required); return; }
    setAppointments(prev =>
      [{ id: Date.now(), ...form, status: 'Waiting' }, ...prev].sort((a, b) => a.time.localeCompare(b.time))
    );
    setModal(false);
    setForm(EMPTY_FORM);
  };

  return (
    <div>
      <div className="page-actions">
        <div className="filter-bar">
          <input type="date" className="filter-select" defaultValue={new Date().toISOString().split('T')[0]} />
          <select className="filter-select">
            <option>{t.common.allDoctors}</option>
            {DOCTORS.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
        <button className="btn-primary" onClick={() => setModal(true)}>
          <PlusIcon /> {at.newBtn}
        </button>
      </div>

      <div className="appt-grid">
        <div className="card">
          <div className="card-header"><span className="card-title">{at.calendar}</span></div>
          <MiniCalendar />
        </div>

        <div className="card table-card">
          <div className="table-hdr">
            <span className="card-title">{at.title}</span>
            <span className="tbl-count">{at.count(appointments.length)}</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{at.cols.time}</th><th>{at.cols.patient}</th><th>{at.cols.doctor}</th>
                  <th>{at.cols.dept}</th><th>{at.cols.type}</th><th>{at.cols.status}</th><th>{at.cols.actions}</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a, i) => (
                  <tr key={a.id ?? i}>
                    <td><strong style={{ fontFamily: 'DM Mono,monospace' }}>{a.time}</strong></td>
                    <td>{a.patient}</td><td>{a.doctor}</td><td>{a.dept}</td><td>{a.type}</td>
                    <td><Badge value={t.status[APPT_STATUS_KEY[a.status]] || a.status} /></td>
                    <td>
                      <div className="tbl-actions">
                        <button className="tbl-btn">{at.details}</button>
                        <button className="tbl-btn danger">{at.cancel}</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title={at.form.title}
        footer={<><button className="btn-ghost" onClick={() => setModal(false)}>{t.common.cancel}</button><button className="btn-primary" onClick={handleSave}>{t.common.save}</button></>}>
        <div className="form-row">
          <div className="form-group"><label>{at.form.patientName}</label><input className="form-input" {...field('patient')} placeholder={at.form.placeholder.patient} /></div>
          <div className="form-group"><label>{at.form.date}</label><input className="form-input" type="date" defaultValue={new Date().toISOString().split('T')[0]} /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>{at.form.time}</label><input className="form-input" type="time" {...field('time')} /></div>
          <div className="form-group"><label>{at.form.doctor}</label>
            <select className="form-input" {...field('doctor')}><option value="">{t.common.select}</option>{DOCTORS.map(d=><option key={d}>{d}</option>)}</select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>{at.form.dept}</label>
            <select className="form-input" {...field('dept')}>{DEPARTMENTS.map(d=><option key={d}>{d}</option>)}</select>
          </div>
          <div className="form-group"><label>{at.form.type}</label>
            <select className="form-input" {...field('type')}>{APPT_TYPES.map(tp=><option key={tp}>{tp}</option>)}</select>
          </div>
        </div>
        <div className="form-group"><label>{at.form.notes}</label><textarea className="form-input" rows="2" {...field('notes')} placeholder={at.form.placeholder.notes} /></div>
      </Modal>
    </div>
  );
}
