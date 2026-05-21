import StatCard    from '../components/StatCard';
import SparkLine   from '../components/SparkLine';
import Badge       from '../components/Badge';
import { PulseIcon, UsersIcon, CalIcon, DocIcon } from '../components/Icons';
import { DEPT_OCCUPANCY, TODAY_APPOINTMENTS } from '../data/constants';
import { useLang } from '../i18n/LangContext';

const WEEKLY_ADMISSIONS = [32, 41, 38, 55, 47, 62, 48];

const RECENT_ACTIVITY_KEYS = [
  { colorKey: '#3b82f6', key: 'newPatient',    desc: 'Mehmet Kaya — Internal Medicine', time: '2 min ago',  descTr: 'Mehmet Kaya — Dahiliye' },
  { colorKey: '#10b981', key: 'discharged',    desc: 'Ayşe Demir — Orthopedics',        time: '18 min ago', descTr: 'Ayşe Demir — Ortopedi'  },
  { colorKey: '#f59e0b', key: 'labReady',      desc: 'Blood panel — Room 204',          time: '34 min ago', descTr: 'Kan tahlili — Oda 204'   },
  { colorKey: '#ef4444', key: 'emergency',     desc: 'Cardiology — Room 118',           time: '1 hr ago',   descTr: 'Kardiyoloji — Oda 118'   },
  { colorKey: '#8b5cf6', key: 'prescriptions', desc: 'Dr. Şahin — 3 patients',          time: '2 hr ago',   descTr: 'Dr. Şahin — 3 hasta'     },
];

const TODAY_APPTS_DATA = [
  { time: '09:00', name: 'Fatma Yıldız',  docEn: 'Dr. Kaplan • Cardiology',        docTr: 'Dr. Kaplan • Kardiyoloji',        statusKey: 'completed'  },
  { time: '10:30', name: 'Ali Çelik',     docEn: 'Dr. Arslan • Orthopedics',       docTr: 'Dr. Arslan • Ortopedi',           statusKey: 'inProgress' },
  { time: '11:15', name: 'Zeynep Koç',   docEn: 'Dr. Şahin • Neurology',          docTr: 'Dr. Şahin • Nöroloji',            statusKey: 'waiting'    },
  { time: '13:00', name: 'Hasan Öztürk', docEn: 'Dr. Yıldız • Internal Medicine', docTr: 'Dr. Yıldız • Dahiliye',           statusKey: 'waiting'    },
];

export default function Dashboard() {
  const { t, lang } = useLang();

  return (
    <div>
      <div className="stats-grid">
        <StatCard icon={<UsersIcon />} target={248} label={t.dashboard.totalPatients}     change={t.dashboard.change.thisWeek} changeType="up"   accent="var(--blue)"   />
        <StatCard icon={<CalIcon />}   target={38}  label={t.dashboard.todayAppointments} change={t.dashboard.change.pending}  changeType="up"   accent="var(--green)"  />
        <StatCard icon={<DocIcon />}   target={42}  label={t.dashboard.activeDoctors}     change={t.dashboard.change.onLeave}  changeType=""     accent="var(--yellow)" />
        <StatCard icon={<PulseIcon />} target={7}   label={t.dashboard.emergencyCases}    change={t.dashboard.change.resolved} changeType="down" accent="var(--red)"    />
      </div>

      <div className="dash-grid">
        {/* Weekly Chart */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">{t.dashboard.weeklyActivity}</span>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[[' #3b82f6', t.dashboard.admissions], ['#10b981', t.dashboard.discharges]].map(([c, l]) => (
                <span key={l} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: '#94a3b8', fontFamily: 'DM Mono, monospace' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: c.trim() }} />{l}
                </span>
              ))}
            </div>
          </div>
          <div className="chart-wrap">
            <SparkLine data={WEEKLY_ADMISSIONS} color="#3b82f6" fill />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card" style={{ gridRow: '1 / 3' }}>
          <div className="card-header">
            <span className="card-title">{t.dashboard.recentActivity}</span>
            <button className="btn-link">{t.common.viewAll}</button>
          </div>
          <div className="activity-list">
            {RECENT_ACTIVITY_KEYS.map((item, i) => (
              <div key={i} className="activity-item">
                <div className="act-dot" style={{ '--c': item.colorKey }} />
                <div className="act-body">
                  <div className="act-title">{t.dashboard.activity[item.key]}</div>
                  <div className="act-desc">{lang === 'tr' ? item.descTr : item.desc}</div>
                </div>
                <div className="act-time">{item.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Dept Occupancy */}
        <div className="card">
          <div className="card-header"><span className="card-title">{t.dashboard.deptOccupancy}</span></div>
          <div className="dept-list">
            {DEPT_OCCUPANCY.map(dept => (
              <div key={dept.name}>
                <div className="dept-info">
                  <span>{lang === 'tr' ? dept.nameTr : dept.name}</span>
                  <span>{dept.pct}%</span>
                </div>
                <div className="dept-bar">
                  <div className="dept-fill" style={{ width: `${dept.pct}%`, background: dept.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Appointments */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">{t.dashboard.todayAppts}</span>
            <button className="btn-link">{t.common.viewAll}</button>
          </div>
          <div className="today-list">
            {TODAY_APPTS_DATA.map((a, i) => (
              <div key={i} className="today-item">
                <div className="today-time">{a.time}</div>
                <div className="today-body">
                  <div className="today-name">{a.name}</div>
                  <div className="today-doc">{lang === 'tr' ? a.docTr : a.docEn}</div>
                </div>
                <Badge value={t.status[a.statusKey]} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
