import { PlusIcon } from '../components/Icons';
import { useLang } from '../i18n/LangContext';

const HOSPITAL_DEFAULTS = [
  ['hospitalName', 'MediCore Hospital'],
  ['address',      '42 Republic Ave, Antalya'],
  ['phone',        '+90 242 000 0000'],
  ['email',        'info@medicore.com'],
  ['bedCapacity',  '450'],
];

const TOGGLE_KEYS = ['emergency', 'appointments', 'lab', 'stock', 'financial'];
const TOGGLE_DEFAULTS = [true, true, true, false, false];

const SYS_KEYS = ['version', 'lastUpdate', 'license'];
const SYS_VALS = ['v3.2.1', 'Mar 26, 2026', 'Enterprise'];

const USERS = [
  { av: 'AY', name: 'Dr. Ahmet Yılmaz', roleKey: 'admin',     active: true  },
  { av: 'NK', name: 'Nurse Kadir',       roleKey: 'nurse',     active: true  },
  { av: 'SE', name: 'Selin Erdem',       roleKey: 'secretary', active: true  },
  { av: 'MK', name: 'Mert Kılıç',        roleKey: 'lab',       active: false },
];

export default function Settings({ theme, setTheme }) {
  const { t } = useLang();
  const st = t.settings;

  return (
    <div className="settings-grid">
      {/* General */}
      <div className="card">
        <div className="settings-section">{st.general}</div>
        <div className="settings-form">
          {HOSPITAL_DEFAULTS.map(([key, val]) => (
            <div key={key} className="form-group">
              <label>{st.fields[key]}</label>
              <input className="form-input" defaultValue={val} />
            </div>
          ))}
          <button className="btn-primary">{st.saveChanges}</button>
        </div>
      </div>

      {/* Notifications */}
      <div className="card">
        <div className="settings-section">{st.notifications}</div>
        <div className="toggle-list">
          {TOGGLE_KEYS.map((key, i) => (
            <div key={key} className="toggle-item">
              <span>{st.toggles[key]}</span>
              <label className="toggle">
                <input type="checkbox" defaultChecked={TOGGLE_DEFAULTS[i]} />
                <span className="slider" />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Theme & System Info */}
      <div className="card">
        <div className="settings-section">{st.appearance}</div>
        <div className="theme-opts">
          {[['Dark', st.darkTheme], ['Light', st.lightTheme]].map(([val, label]) => (
            <button key={val} className={`theme-opt${theme === val ? ' active' : ''}`} onClick={() => setTheme(val)}>
              {label}
            </button>
          ))}
        </div>
        <div className="settings-section" style={{ marginTop: '18px' }}>{st.systemInfo}</div>
        <div className="sys-info">
          {SYS_KEYS.map((key, i) => (
            <div key={key} className="sys-item"><span>{st.sys[key]}</span><strong>{SYS_VALS[i]}</strong></div>
          ))}
          <div className="sys-item"><span>{st.sys.server}</span><strong className="online">{st.sys.online}</strong></div>
        </div>
      </div>

      {/* User Management */}
      <div className="card">
        <div className="settings-section">{st.userMgmt}</div>
        <div className="user-mgmt-list">
          {USERS.map(u => (
            <div key={u.name} className="user-mgmt-row">
              <div className="user-mgmt-av">{u.av}</div>
              <div className="user-mgmt-info">
                <strong>{u.name}</strong>
                <span>{st.userRoles[u.roleKey]}</span>
              </div>
              <span className={`badge ${u.active ? 'badge-active' : 'badge-cancelled'}`}>
                {u.active ? st.active : st.inactive}
              </span>
            </div>
          ))}
        </div>
        <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}>
          <PlusIcon /> {st.addUser}
        </button>
      </div>
    </div>
  );
}
