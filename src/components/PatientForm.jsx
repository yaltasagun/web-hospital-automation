import { useState } from 'react';
import Modal        from './Modal';
import { PlusIcon } from './Icons';
import { useLang }  from '../i18n/LangContext';
import { DEPARTMENTS, DOCTORS, STATUSES, BLOOD_GROUPS } from '../data/constants';

const EMPTY_FORM = {
  first: '', last: '', dept: '', doctor: '',
  status: 'Admitted', blood: '', dob: '', phone: '', note: '',
};

/**
 * Patient registration form inside a Modal.
 * Props: open, onClose, onSubmit
 */
export default function PatientForm({ open, onClose, onSubmit }) {
  const { t, lang } = useLang();
  const pf = t.patientForm;

  const [form,   setForm]   = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const field = (key) => ({
    value: form[key],
    onChange: (e) => {
      setForm(f => ({ ...f, [key]: e.target.value }));
      if (errors[key]) setErrors(err => ({ ...err, [key]: undefined }));
    },
  });

  const reset = () => { setForm(EMPTY_FORM); setErrors({}); };

  const validate = () => {
    const next = {};
    if (!form.first.trim())  next.first  = pf.errors.required;
    if (!form.last.trim())   next.last   = pf.errors.required;
    if (!form.dept)          next.dept   = pf.errors.required;
    if (!form.doctor)        next.doctor = pf.errors.required;
    if (form.phone && !/^[+\d\s()-]{7,}$/.test(form.phone)) next.phone = pf.errors.invalidPhone;
    if (form.dob   && new Date(form.dob) > new Date())       next.dob   = pf.errors.futureDate;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const age = form.dob
      ? new Date().getFullYear() - new Date(form.dob).getFullYear()
      : Math.floor(Math.random() * 50) + 20;
    onSubmit({ ...form, age });
    reset();
  };

  const handleCancel = () => { reset(); onClose(); };

  // Translate dept/status options for display but keep English values internally
  const deptOptions   = DEPARTMENTS;
  const statusOptions = STATUSES;

  return (
    <Modal
      open={open}
      onClose={handleCancel}
      title={pf.title}
      footer={
        <>
          <button className="btn-ghost"   onClick={handleCancel}>{t.common.cancel}</button>
          <button className="btn-primary" onClick={handleSave}><PlusIcon /> {t.common.save}</button>
        </>
      }
    >
      <div className="patient-form-grid">
        <FormField label={pf.firstName} error={errors.first}>
          <input className="form-input" {...field('first')} placeholder={pf.placeholders.firstName} />
        </FormField>

        <FormField label={pf.lastName} error={errors.last}>
          <input className="form-input" {...field('last')}  placeholder={pf.placeholders.lastName} />
        </FormField>

        <FormField label={pf.dob} error={errors.dob}>
          <input className="form-input" type="date" {...field('dob')} />
        </FormField>

        <FormField label={pf.bloodType}>
          <select className="form-input" {...field('blood')}>
            <option value="">{t.common.select}</option>
            {BLOOD_GROUPS.map(b => <option key={b}>{b}</option>)}
          </select>
        </FormField>

        <FormField label={pf.department} error={errors.dept}>
          <select className="form-input" {...field('dept')}>
            <option value="">{t.common.select}</option>
            {deptOptions.map(d => <option key={d}>{d}</option>)}
          </select>
        </FormField>

        <FormField label={pf.doctor} error={errors.doctor}>
          <select className="form-input" {...field('doctor')}>
            <option value="">{t.common.select}</option>
            {DOCTORS.map(d => <option key={d}>{d}</option>)}
          </select>
        </FormField>

        <FormField label={pf.status}>
          <select className="form-input" {...field('status')}>
            {statusOptions.map(s => <option key={s}>{s}</option>)}
          </select>
        </FormField>

        <FormField label={pf.phone} error={errors.phone}>
          <input className="form-input" {...field('phone')} placeholder={pf.placeholders.phone} />
        </FormField>

        <FormField label={pf.complaint} full>
          <textarea className="form-input" rows="3" {...field('note')} placeholder={pf.placeholders.complaint} />
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
