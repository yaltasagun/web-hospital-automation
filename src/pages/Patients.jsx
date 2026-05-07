import { useState, useMemo } from 'react';
import Badge  from '../components/Badge';
import Modal  from '../components/Modal';
import { PlusIcon, SearchIcon } from '../components/Icons';
import { DEPARTMENTS, DOCTORS, STATUSES, BLOOD_GROUPS } from '../data/constants';

const PAGE_SIZE = 10;

const EMPTY_FORM = {
  first: '', last: '', dept: '', doctor: '',
  status: 'Admitted', blood: '', dob: '', phone: '', note: '',
};

export default function Patients({ patients, setPatients }) {
  const [page,   setPage]   = useState(1);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [modal,  setModal]  = useState(false);
  const [form,   setForm]   = useState(EMPTY_FORM);

  // Filtered list
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return patients.filter(p => {
      const nameMatch = `${p.first} ${p.last}`.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
      const deptMatch = !deptFilter || p.dept === deptFilter;
      return nameMatch && deptMatch;
    });
  }, [patients, search, deptFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageSlice  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm(f => ({ ...f, [key]: e.target.value })),
  });

  const handleSave = () => {
    if (!form.first || !form.last || !form.dept || !form.doctor) {
      alert('Please fill in all required fields (*).');
      return;
    }
    const age   = form.dob
      ? new Date().getFullYear() - new Date(form.dob).getFullYear()
      : Math.floor(Math.random() * 50) + 20;
    const today = new Date().toLocaleDateString('en-US');
    const newId = `PAT-${String(patients.length + 1).padStart(4, '0')}`;

    setPatients(prev => [{ id: newId, ...form, age, date: today }, ...prev]);
    setModal(false);
    setForm(EMPTY_FORM);
  };

  return (
    <div>
      {/* Actions bar */}
      <div className="page-actions">
        <div className="filter-bar">
          <select
            className="filter-select"
            value={deptFilter}
            onChange={e => { setDeptFilter(e.target.value); setPage(1); }}
          >
            <option value="">All Departments</option>
            {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
          </select>
          <select className="filter-select">
            <option value="">All Statuses</option>
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <button className="btn-primary" onClick={() => setModal(true)}>
          <PlusIcon /> New Patient
        </button>
      </div>

      {/* Table */}
      <div className="card table-card">
        <div className="table-hdr">
          <span className="card-title">Patient List</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="search-wrap" style={{ padding: '5px 10px' }}>
              <SearchIcon />
              <input
                placeholder="Search patients..."
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                style={{ width: '150px' }}
              />
            </div>
            <span className="tbl-count">{filtered.length} patients</span>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Patient ID</th><th>Full Name</th><th>Age</th>
                <th>Department</th><th>Doctor</th><th>Status</th>
                <th>Admission</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageSlice.map(p => (
                <tr key={p.id}>
                  <td><span className="pid">{p.id}</span></td>
                  <td><strong>{p.first} {p.last}</strong></td>
                  <td>{p.age}</td>
                  <td>{p.dept}</td>
                  <td>{p.doctor}</td>
                  <td><Badge value={p.status} /></td>
                  <td><span style={{ fontFamily: 'DM Mono,monospace', fontSize: '11px', color: '#94a3b8' }}>{p.date}</span></td>
                  <td>
                    <div className="tbl-actions">
                      <button className="tbl-btn">View</button>
                      <button className="tbl-btn">Edit</button>
                      <button className="tbl-btn danger">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-foot">
          <span>{((page - 1) * PAGE_SIZE) + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} / {filtered.length}</span>
          <div className="pagination">
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => (
              <button
                key={i}
                className={`pg-btn${page === i + 1 ? ' active' : ''}`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* New Patient Modal */}
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title="New Patient Registration"
        footer={
          <>
            <button className="btn-ghost" onClick={() => setModal(false)}>Cancel</button>
            <button className="btn-primary" onClick={handleSave}><PlusIcon /> Save</button>
          </>
        }
      >
        <div className="form-row">
          <div className="form-group"><label>First Name *</label><input className="form-input" {...field('first')} placeholder="First name" /></div>
          <div className="form-group"><label>Last Name *</label><input  className="form-input" {...field('last')}  placeholder="Last name"  /></div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Date of Birth</label>
            <input className="form-input" type="date" {...field('dob')} />
          </div>
          <div className="form-group">
            <label>Blood Type</label>
            <select className="form-input" {...field('blood')}>
              <option value="">Select</option>
              {BLOOD_GROUPS.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Department *</label>
            <select className="form-input" {...field('dept')}>
              <option value="">Select</option>
              {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
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
            <label>Status</label>
            <select className="form-input" {...field('status')}>
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input className="form-input" {...field('phone')} placeholder="+1 (555) 000-0000" />
          </div>
        </div>
        <div className="form-group">
          <label>Complaint / Diagnosis</label>
          <textarea className="form-input" rows="3" {...field('note')} placeholder="Symptoms and notes..." />
        </div>
      </Modal>
    </div>
  );
}
