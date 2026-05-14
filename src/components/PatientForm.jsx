import { useState } from 'react';
import Modal       from './Modal';
import { PlusIcon } from './Icons';
import { DEPARTMENTS, DOCTORS, STATUSES, BLOOD_GROUPS } from '../data/constants';

const EMPTY_FORM = {
  first:  '', last:   '',
  dept:   '', doctor: '',
  status: 'Admitted',
  blood:  '', dob:    '',
  phone:  '', note:   '',
};

export default function PatientForm({ open, onClose, onSubmit }) {
  const [form,   setForm]   = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  // ─── helpers ─────────────────────────────────────────────
  const field = (key) => ({
    value: form[key],
    onChange: (e) => {
      setForm(f => ({ ...f, [key]: e.target.value }));
      if (errors[key]) setErrors(err => ({ ...err, [key]: undefined }));
    },
  });

  const reset = () => {
    setForm(EMPTY_FORM);
    setErrors({});
  };

  // ─── validation ──────────────────────────────────────────
  const validate = () => {
    const next = {};
    if (!form.first.trim())  next.first  = 'Required';
    if (!form.last.trim())   next.last   = 'Required';
    if (!form.dept)          next.dept   = 'Required';
    if (!form.doctor)        next.doctor = 'Required';

    if (form.phone && !/^[+\d\s()-]{7,}$/.test(form.phone)) {
      next.phone = 'Invalid phone';
    }
    if (form.dob && new Date(form.dob) > new Date()) {
      next.dob = 'Future date';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // ─── handlers ────────────────────────────────────────────
  const handleSave = () => {
    if (!validate()) return;

    const age = form.dob
      ? new Date().getFullYear() - new Date(form.dob).getFullYear()
      : Math.floor(Math.random() * 50) + 20;

    onSubmit({ ...form, age });
    reset();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  // ─── render ──────────────────────────────────────────────
  return (
    <Modal
      open={open}
      onClose={handleCancel}
      title="New Patient Registration"
      footer={
        <>
          <button className="btn-ghost" onClick={handleCancel}>Cancel</button>
          <button className="btn-primary" onClick={handleSave}>
            <PlusIcon /> Save
          </button>
        </>
      }
    >
      <div className="patient-form-grid">
        <FormField label="First Name *" error={errors.first}>
          <input className="form-input" {...field('first')} placeholder="First name" />
        </FormField>

        <FormField label="Last Name *" error={errors.last}>
          <input className="form-input" {...field('last')} placeholder="Last name" />
        </FormField>

        <FormField label="Date of Birth" error={errors.dob}>
          <input className="form-input" type="date" {...field('dob')} />
        </FormField>

        <FormField label="Blood Type">
          <select className="form-input" {...field('blood')}>
            <option value="">Select</option>
            {BLOOD_GROUPS.map(b => <option key={b}>{b}</option>)}
          </select>
        </FormField>

        <FormField label="Department *" error={errors.dept}>
          <select className="form-input" {...field('dept')}>
            <option value="">Select</option>
            {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
          </select>
        </FormField>

        <FormField label="Doctor *" error={errors.doctor}>
          <select className="form-input" {...field('doctor')}>
            <option value="">Select</option>
            {DOCTORS.map(d => <option key={d}>{d}</option>)}
          </select>
        </FormField>

        <FormField label="Status">
          <select className="form-input" {...field('status')}>
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
        </FormField>

        <FormField label="Phone" error={errors.phone}>
          <input className="form-input" {...field('phone')} placeholder="+1 (555) 000-0000" />
        </FormField>

        <FormField label="Complaint / Diagnosis" full>
          <textarea className="form-input" rows="3" {...field('note')} placeholder="Symptoms and notes..." />
        </FormField>
      </div>
    </Modal>
  );
}

function FormField({ label, error, full, children }) {
  return (
    <div className={`form-group${full ? ' form-group-full' : ''}`}>
      <label>{label}</label>
      {children}
      {error && <small className="form-error">{error}</small>}
    </div>
  );
}
