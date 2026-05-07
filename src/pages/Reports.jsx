import BarChart   from '../components/BarChart';
import DonutChart from '../components/DonutChart';
import { DEPARTMENTS } from '../data/constants';

const MONTHLY_ADMISSIONS = [980, 1050, 1120, 890, 1200, 1284];
const MONTHLY_DISCHARGES = [940, 1010, 1080, 860, 1150, 1240];
const MONTH_LABELS       = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
const DEPT_PERCENTS      = [28, 22, 18, 12, 10, 10];
const DEPT_COLORS        = ['#3b82f6', '#ef4444', '#10b981', '#8b5cf6', '#f59e0b', '#f97316'];

const SUMMARY_LEFT  = [['Total Admissions (This Month)', '1,284'], ['Average Length of Stay', '4.2 days'], ['Successful Surgeries', '98.7%']];
const SUMMARY_RIGHT = [['Patient Satisfaction', '94.2%'], ['Monthly Revenue', '$284K'], ['Monthly Expenses', '$192K']];

export default function Reports() {
  return (
    <div className="reports-grid">
      {/* Bar chart */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Monthly Patient Statistics</span>
          <div style={{ display: 'flex', gap: '10px' }}>
            {[['#3b82f6', 'Admissions'], ['#10b981', 'Discharges']].map(([c, l]) => (
              <span key={l} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: '#94a3b8', fontFamily: 'DM Mono,monospace' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />{l}
              </span>
            ))}
          </div>
        </div>
        <div style={{ height: '190px' }}>
          <BarChart
            data={[MONTHLY_ADMISSIONS, MONTHLY_DISCHARGES]}
            colors={['#3b82f6', '#10b981']}
            labels={MONTH_LABELS}
          />
        </div>
      </div>

      {/* Donut chart */}
      <div className="card">
        <div className="card-header"><span className="card-title">Department Distribution</span></div>
        <div style={{ marginTop: '8px' }}>
          <DonutChart data={DEPT_PERCENTS} colors={DEPT_COLORS} labels={DEPARTMENTS} />
        </div>
      </div>

      {/* Summary — spans full width */}
      <div className="card full-span">
        <div className="card-header">
          <span className="card-title">Summary Report</span>
          <button className="btn-primary" style={{ fontSize: '11px', padding: '6px 12px' }}>
            Download PDF
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0 32px' }}>
          {[SUMMARY_LEFT, SUMMARY_RIGHT].map((group, gi) => (
            <div key={gi} className="summary-items">
              {group.map(([label, val]) => (
                <div key={label} className="summary-item">
                  <span>{label}</span>
                  <strong>{val}</strong>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
