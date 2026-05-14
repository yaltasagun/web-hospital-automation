import { useState, useMemo } from 'react';
import Badge       from '../components/Badge';
import PatientForm from '../components/PatientForm';
import { PlusIcon, SearchIcon } from '../components/Icons';
import { DEPARTMENTS, STATUSES } from '../data/constants';

const PAGE_SIZE = 10;

export default function Patients({ patients, setPatients }) {
  const [page,        setPage]       = useState(1);
  const [search,      setSearch]     = useState('');
  const [deptFilter,  setDeptFilter] = useState('');
  const [formOpen,    setFormOpen]   = useState(false);

  // ─── Filtered & paginated patient list ───────────────────
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return patients.filter(p => {
      const nameMatch = `${p.first} ${p.last}`.toLowerCase().includes(q) ||
                        p.id.toLowerCase().includes(q);
      const deptMatch = !deptFilter || p.dept === deptFilter;
      return nameMatch && deptMatch;
    });
  }, [patients, search, deptFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageSlice  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // ─── Add new patient (called by PatientForm) ─────────────
  const handleAddPatient = (newPatientData) => {
    const newId = `PAT-${String(patients.length + 1).padStart(4, '0')}`;
    const today = new Date().toLocaleDateString('en-US');
    setPatients(prev => [{ id: newId, ...newPatientData, date: today }, ...prev]);
    setFormOpen(false);
  };

  return (
    <div>
      {/* ─── Action bar ─── */}
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
        <button className="btn-primary" onClick={() => setFormOpen(true)}>
          <PlusIcon /> New Patient
        </button>
      </div>

      {/* ─── Patient table ─── */}
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
          <span>
            {((page - 1) * PAGE_SIZE) + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} / {filtered.length}
          </span>
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

      {/* ─── New Patient form (manages its own state + modal) ─── */}
      <PatientForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleAddPatient}
      />
    </div>
  );
}
