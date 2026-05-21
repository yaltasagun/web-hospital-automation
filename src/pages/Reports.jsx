import BarChart   from '../components/BarChart';
import DonutChart from '../components/DonutChart';
import { DEPARTMENTS } from '../data/constants';
import { useLang } from '../i18n/LangContext';

const MONTHLY_ADMISSIONS = [980, 1050, 1120, 890, 1200, 1284];
const MONTHLY_DISCHARGES = [940, 1010, 1080, 860, 1150, 1240];
const DEPT_PERCENTS      = [28, 22, 18, 12, 10, 10];
const DEPT_COLORS        = ['#3b82f6', '#ef4444', '#10b981', '#8b5cf6', '#f59e0b', '#f97316'];

export default function Reports() {
  const { t } = useLang();
  const rt = t.reports;
  const sm = rt.summary;

  const SUMMARY_LEFT  = [[sm.totalAdmissions, '1,284'], [sm.avgStay, '4.2 days'], [sm.surgeries, '98.7%']];
  const SUMMARY_RIGHT = [[sm.satisfaction, '94.2%'], [sm.revenue, '$284K'], [sm.expenses, '$192K']];

  return (
    <div className="reports-grid">
      <div className="card">
        <div className="card-header">
          <span className="card-title">{rt.monthlyStats}</span>
          <div style={{ display: 'flex', gap: '10px' }}>
            {[['#3b82f6', rt.admissions], ['#10b981', rt.discharges]].map(([c, l]) => (
              <span key={l} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: '#94a3b8', fontFamily: 'DM Mono,monospace' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />{l}
              </span>
            ))}
          </div>
        </div>
        <div style={{ height: '190px' }}>
          <BarChart data={[MONTHLY_ADMISSIONS, MONTHLY_DISCHARGES]} colors={['#3b82f6', '#10b981']} labels={rt.months} />
        </div>
      </div>

      <div className="card">
        <div className="card-header"><span className="card-title">{rt.deptDist}</span></div>
        <div style={{ marginTop: '8px' }}>
          <DonutChart data={DEPT_PERCENTS} colors={DEPT_COLORS} labels={DEPARTMENTS} />
        </div>
      </div>

      <div className="card full-span">
        <div className="card-header">
          <span className="card-title">{rt.summaryTitle}</span>
          <button className="btn-primary" style={{ fontSize: '11px', padding: '6px 12px' }}>{rt.downloadPdf}</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0 32px' }}>
          {[SUMMARY_LEFT, SUMMARY_RIGHT].map((group, gi) => (
            <div key={gi} className="summary-items">
              {group.map(([label, val]) => (
                <div key={label} className="summary-item"><span>{label}</span><strong>{val}</strong></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
