import { useState, useMemo } from 'react';
import Badge          from '../components/Badge';
import PatientForm    from '../components/PatientForm';
import PatientProfile from './clinical/PatientProfile';
import { PlusIcon, SearchIcon } from '../components/Icons';
import { DEPARTMENTS, STATUSES } from '../data/constants';
import { useLang } from '../i18n/LangContext';

const PAGE_SIZE = 10;

export default function Patients({ patients, setPatients }) {
  const { t } = useLang();
  const pt = t.patients;

  const [page,        setPage]       = useState(1);
  const [search,      setSearch]     = useState('');
  const [deptFilter,  setDeptFilter] = useState('');
  const [formOpen,    setFormOpen]   = useState(false);
  const [profilePat,  setProfilePat] = useState(null);

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

  const handleAddPatient = (data) => {
    const newId = `PAT-${String(patients.length + 1).padStart(4, '0')}`;
    const today = new Date().toLocaleDateString('en-US');
    setPatients(prev => [{ id: newId, ...data, date: today }, ...prev]);
    setFormOpen(false);
  };

  if (profilePat) {
    return <PatientProfile patient={profilePat} onBack={() => setProfilePat(null)} />;
  }

  return (
    <div>
      <div className="page-actions">
        <div className="filter-bar">
          <select className="filter-select" value={deptFilter} onChange={e => { setDeptFilter(e.target.value); setPage(1); }}>
            <option value="">{t.common.allDepts}</option>
            {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
          </select>
          <select className="filter-select">
            <option value="">{t.common.allStatuses}</option>
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <button className="btn-primary" onClick={() => setFormOpen(true)}>
          <PlusIcon /> {pt.newBtn}
        </button>
      </div>

      <div className="card table-card">
        <div className="table-hdr">
          <span className="card-title">{pt.title}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="search-wrap" style={{ padding: '5px 10px' }}>
              <SearchIcon />
              <input
                placeholder={pt.searchPlaceholder}
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                style={{ width: '150px' }}
              />
            </div>
            <span className="tbl-count">{pt.count(filtered.length)}</span>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>{pt.cols.id}</th><th>{pt.cols.name}</th><th>{pt.cols.age}</th>
                <th>{pt.cols.dept}</th><th>{pt.cols.doctor}</th><th>{pt.cols.status}</th>
                <th>{pt.cols.admission}</th><th>{pt.cols.actions}</th>
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
                  <td><Badge value={t.status[statusKey(p.status)]} /></td>
                  <td><span style={{ fontFamily: 'DM Mono,monospace', fontSize: '11px', color: '#94a3b8' }}>{p.date}</span></td>
                  <td>
                    <div className="tbl-actions">
                      <button className="tbl-btn" onClick={() => setProfilePat(p)}>{t.common.view}</button>
                      <button className="tbl-btn">{t.common.edit}</button>
                      <button className="tbl-btn danger">{t.common.delete}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-foot">
          <span>{pt.showing(((page - 1) * PAGE_SIZE) + 1, Math.min(page * PAGE_SIZE, filtered.length), filtered.length)}</span>
          <div className="pagination">
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => (
              <button key={i} className={`pg-btn${page === i + 1 ? ' active' : ''}`} onClick={() => setPage(i + 1)}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      <PatientForm open={formOpen} onClose={() => setFormOpen(false)} onSubmit={handleAddPatient} />
    </div>
  );
}

function statusKey(s) {
  const map = { 'Admitted': 'admitted', 'Follow-up': 'followUp', 'Discharged': 'discharged' };
  return map[s] || 'admitted';
}
