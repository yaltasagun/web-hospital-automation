import { PlusIcon } from '../components/Icons';

const HOSPITAL_FIELDS = [
  ['Hospital Name', 'MediCore Hospital'],
  ['Address',       '42 Republic Ave, Antalya'],
  ['Phone',         '+90 242 000 0000'],
  ['Email',         'info@medicore.com'],
  ['Bed Capacity',  '450'],
];

const TOGGLE_ITEMS = [
  ['Emergency case alerts',      true ],
  ['Appointment reminders',      true ],
  ['Lab result notifications',   true ],
  ['Stock level warnings',       false],
  ['Financial reports',          false],
];

const SYS_INFO = [
  ['Version',     'v3.2.1'      ],
  ['Last Update', 'Mar 26, 2026'],
  ['License',     'Enterprise'  ],
];

const USERS = [
  { av: 'AY', name: 'Dr. Ahmet Yılmaz', role: 'Administrator', active: true  },
  { av: 'NK', name: 'Nurse Kadir',       role: 'Nurse',         active: true  },
  { av: 'SE', name: 'Selin Erdem',       role: 'Secretary',     active: true  },
  { av: 'MK', name: 'Mert Kılıç',        role: 'Lab Technician',active: false },
];

export default function Settings({ theme, setTheme }) {
  return (
    <div className="settings-grid">
      {/* General */}
      <div className="card">
        <div className="settings-section">General Settings</div>
        <div className="settings-form">
          {HOSPITAL_FIELDS.map(([label, defaultVal]) => (
            <div key={label} className="form-group">
              <label>{label}</label>
              <input className="form-input" defaultValue={defaultVal} />
            </div>
          ))}
          <button className="btn-primary">Save Changes</button>
        </div>
      </div>

      {/* Notifications */}
      <div className="card">
        <div className="settings-section">Notification Settings</div>
        <div className="toggle-list">
          {TOGGLE_ITEMS.map(([label, checked]) => (
            <div key={label} className="toggle-item">
              <span>{label}</span>
              <label className="toggle">
                <input type="checkbox" defaultChecked={checked} />
                <span className="slider" />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Theme & System Info */}
      <div className="card">
        <div className="settings-section">Theme &amp; Appearance</div>
        <div className="theme-opts">
          {['Dark', 'Light'].map(t => (
            <button
              key={t}
              className={`theme-opt${theme === t ? ' active' : ''}`}
              onClick={() => setTheme(t)}
            >
              {t} Theme
            </button>
          ))}
        </div>

        <div className="settings-section" style={{ marginTop: '18px' }}>System Info</div>
        <div className="sys-info">
          {SYS_INFO.map(([label, val]) => (
            <div key={label} className="sys-item">
              <span>{label}</span>
              <strong>{val}</strong>
            </div>
          ))}
          <div className="sys-item">
            <span>Server Status</span>
            <strong className="online">● Online</strong>
          </div>
        </div>
      </div>

      {/* User Management */}
      <div className="card">
        <div className="settings-section">User Management</div>
        <div className="user-mgmt-list">
          {USERS.map(u => (
            <div key={u.name} className="user-mgmt-row">
              <div className="user-mgmt-av">{u.av}</div>
              <div className="user-mgmt-info">
                <strong>{u.name}</strong>
                <span>{u.role}</span>
              </div>
              <span className={`badge ${u.active ? 'badge-active' : 'badge-cancelled'}`}>
                {u.active ? 'Active' : 'Inactive'}
              </span>
            </div>
          ))}
        </div>
        <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}>
          <PlusIcon /> Add User
        </button>
      </div>
    </div>
  );
}
