import StatCard    from '../components/StatCard';
import SparkLine   from '../components/SparkLine';
import Badge       from '../components/Badge';
import { PulseIcon, UsersIcon, CalIcon, DocIcon, TrendIcon } from '../components/Icons';
import { DEPT_OCCUPANCY, RECENT_ACTIVITY, TODAY_APPOINTMENTS } from '../data/constants';

const WEEKLY_ADMISSIONS = [32, 41, 38, 55, 47, 62, 48];
const WEEKLY_DISCHARGES = [28, 35, 30, 48, 40, 55, 42];

function ChartLegend({ items }) {
  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      {items.map(([color, label]) => (
        <span
          key={label}
          style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: '#94a3b8', fontFamily: 'DM Mono, monospace' }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
          {label}
        </span>
      ))}
    </div>
  );
}

function ActivityList() {
  return (
    <div className="activity-list">
      {RECENT_ACTIVITY.map((item, i) => (
        <div key={i} className="activity-item">
          <div className="act-dot" style={{ '--c': item.color }} />
          <div className="act-body">
            <div className="act-title">{item.title}</div>
            <div className="act-desc">{item.desc}</div>
          </div>
          <div className="act-time">{item.time}</div>
        </div>
      ))}
    </div>
  );
}

function DeptOccupancy() {
  return (
    <div className="dept-list">
      {DEPT_OCCUPANCY.map(dept => (
        <div key={dept.name}>
          <div className="dept-info">
            <span>{dept.name}</span>
            <span>{dept.pct}%</span>
          </div>
          <div className="dept-bar">
            <div className="dept-fill" style={{ width: `${dept.pct}%`, background: dept.color }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function TodayAppointments() {
  return (
    <div className="today-list">
      {TODAY_APPOINTMENTS.map((appt, i) => (
        <div key={i} className="today-item">
          <div className="today-time">{appt.time}</div>
          <div className="today-body">
            <div className="today-name">{appt.name}</div>
            <div className="today-doc">{appt.doc}</div>
          </div>
          <Badge value={appt.status} />
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  return (
    <div>
      {/* ── Stat Cards ── */}
      <div className="stats-grid">
        <StatCard icon={<UsersIcon />} target={248}  label="Total Patients"       change="↑ 12 this week" changeType="up"   accent="var(--blue)"   />
        <StatCard icon={<CalIcon />}   target={38}   label="Today's Appointments" change="↑ 5 pending"    changeType="up"   accent="var(--green)"  />
        <StatCard icon={<DocIcon />}   target={42}   label="Active Doctors"       change="= 3 on leave"   changeType=""     accent="var(--yellow)" />
        <StatCard icon={<PulseIcon />} target={7}    label="Emergency Cases"      change="↓ 2 resolved"   changeType="down" accent="var(--red)"    />
      </div>

      {/* ── Main Grid ── */}
      <div className="dash-grid">
        {/* Weekly Chart */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Weekly Patient Activity</span>
            <ChartLegend items={[['#3b82f6', 'Admissions'], ['#10b981', 'Discharges']]} />
          </div>
          <div className="chart-wrap">
            <SparkLine data={WEEKLY_ADMISSIONS} color="#3b82f6" fill />
          </div>
        </div>

        {/* Activity feed — spans 2 rows */}
        <div className="card" style={{ gridRow: '1 / 3' }}>
          <div className="card-header">
            <span className="card-title">Recent Activity</span>
            <button className="btn-link">View All</button>
          </div>
          <ActivityList />
        </div>

        {/* Department occupancy */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Department Occupancy</span>
          </div>
          <DeptOccupancy />
        </div>

        {/* Today's appointments */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Today's Appointments</span>
            <button className="btn-link">View All</button>
          </div>
          <TodayAppointments />
        </div>
      </div>
    </div>
  );
}
