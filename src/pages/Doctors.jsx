import { DOCTOR_DATA, DEPARTMENTS } from '../data/constants';
import { PlusIcon } from '../components/Icons';
import { useLang } from '../i18n/LangContext';

export default function Doctors() {
  const { t } = useLang();
  const dt = t.doctors;

  return (
    <div>
      <div className="page-actions">
        <div className="filter-bar">
          <select className="filter-select">
            <option>{t.common.allDepts}</option>
            {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
        <button className="btn-primary"><PlusIcon /> {dt.addBtn}</button>
      </div>

      <div className="doc-grid">
        {DOCTOR_DATA.map((doc, i) => (
          <div key={i} className="doc-card" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="doc-av" style={{ background: `${doc.color}22`, color: doc.color }}>{doc.init}</div>
            <div className="doc-name">{doc.name}</div>
            <div className="doc-dept">{doc.dept} · {doc.exp} {dt.experience}</div>
            <div className="doc-stats">
              <div className="doc-stat"><strong style={{ color: doc.color }}>{doc.patients}</strong><span>{dt.patients}</span></div>
              <div className="doc-stat"><strong style={{ color: '#f59e0b' }}>★ {doc.rating}</strong><span>{dt.rating}</span></div>
            </div>
            <div className="doc-actions">
              <button className="btn-ghost btn-sm">{dt.profile}</button>
              <button className="btn-primary btn-sm">{dt.appoint}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
