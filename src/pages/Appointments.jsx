import { useState } from 'react';
import Badge        from '../components/Badge';
import Modal        from '../components/Modal';
import MiniCalendar from '../components/MiniCalendar';
import { PlusIcon } from '../components/Icons';
import { DEPARTMENTS, DOCTORS, APPT_TYPES } from '../data/constants';

const EMPTY_FORM = { patient: '', time: '', doctor: '', dept: DEPARTMENTS[0], type: APPT_TYPES[0], notes: '' };

export default function Appointments({ appointments, setAppointments }) {
  const [modal, setModal] = useState(false);
  const [form,  setForm]  = useState(EMPTY_FORM);

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm(f => ({ ...f, [key]: e.target.value })),
  });

  const handleSave = () => {
    if (!form.patient || !form.time || !form.doctor) {
      alert('Please fill in all required fields (*).');
      return;
    }
    setAppointments(prev =>
      [{ id: Date.now(), ...form, status: 'Waiting' }, ...prev]
        .sort((a, b) => a.time.localeCompare(b.time))
    );
    setModal(false);
    setForm(EMPTY_FORM);
  };

  return (
    <div>
      {/* Actions bar */}
      <div className="page-actions">
        <div className="filter-bar">
          <input type="date" className="filter-select" defaultValue={new Date().toISOString().split('T')[0]} />
          <select className="filter-select">
            <option>All Doctors</option>
            {DOCTORS.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
        <button className="btn-primary" onClick={() => setModal(true)}>
          <PlusIcon /> New Appointment
        </button>
      </div>

      {/* Two-column layout */}
      <div className="appt-grid">
        {/* Mini calendar */}
        <div className="card">
          <div className="card-header"><span className="card-title">Calendar</span></div>
          <MiniCalendar />
        </div>

        {/* Appointment table */}
        <div className="card table-card">
          <div className="table-hdr">
            <span className="card-title">Appointment List</span>
            <span className="tbl-count">{appointments.length} appointments</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Time</th><th>Patient</th><th>Doctor</th>
                  <th>Department</th><th>Type</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a, i) => (
                  <tr key={a.id ?? i}>
                    <td><strong style={{ fontFamily: 'DM Mono,monospace' }}>{a.time}</strong></td>
                    <td>{a.patient}</td>
                    <td>{a.doctor}</td>
                    <td>{a.dept}</td>
                    <td>{a.type}</td>
                    <td><Badge value={a.status} /></td>
                    <td>
                      <div className="tbl-actions">
                        <button className="tbl-btn">Details</button>
                        <button className="tbl-btn danger">Cancel</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* New Appointment Modal */}
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title="New Appointment"
        footer={
          <>
            <button className="btn-ghost" onClick={() => setModal(false)}>Cancel</button>
            <button className="btn-primary" onClick={handleSave}>Save</button>
          </>
        }
      >
        <div className="form-row">
          <div className="form-group"><label>Patient Name *</label><input className="form-input" {...field('patient')} placeholder="Patient name" /></div>
          <div className="form-group"><label>Date</label><input className="form-input" type="date" defaultValue={new Date().toISOString().split('T')[0]} /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Time *</label><input className="form-input" type="time" {...field('time')} /></div>
          <div className="form-group">
            <label>Doctor *</label>
            <select className="form-input" {...field('doctor')}>
              <option value="">Select</option>
              {DOCTORS.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Department</label>
            <select className="form-input" {...field('dept')}>
              {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Type</label>
            <select className="form-input" {...field('type')}>
              {APPT_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>Notes</label>
          <textarea className="form-input" rows="2" {...field('notes')} placeholder="Additional notes..." />
        </div>
      </Modal>
    </div>
  );
}
