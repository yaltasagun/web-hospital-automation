import { DOCTOR_DATA, DEPARTMENTS } from '../data/constants';
import { PlusIcon } from '../components/Icons';

export default function Doctors() {
  return (
    <div>
      <div className="page-actions">
        <div className="filter-bar">
          <select className="filter-select">
            <option>All Departments</option>
            {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
        <button className="btn-primary"><PlusIcon /> Add Doctor</button>
      </div>

      <div className="doc-grid">
        {DOCTOR_DATA.map((doc, i) => (
          <div key={i} className="doc-card" style={{ animationDelay: `${i * 0.05}s` }}>
            <div
              className="doc-av"
              style={{ background: `${doc.color}22`, color: doc.color }}
            >
              {doc.init}
            </div>
            <div className="doc-name">{doc.name}</div>
            <div className="doc-dept">{doc.dept} · {doc.exp} experience</div>
            <div className="doc-stats">
              <div className="doc-stat">
                <strong style={{ color: doc.color }}>{doc.patients}</strong>
                <span>Patients</span>
              </div>
              <div className="doc-stat">
                <strong style={{ color: '#f59e0b' }}>★ {doc.rating}</strong>
                <span>Rating</span>
              </div>
            </div>
            <div className="doc-actions">
              <button className="btn-ghost btn-sm">Profile</button>
              <button className="btn-primary btn-sm">Appoint</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
