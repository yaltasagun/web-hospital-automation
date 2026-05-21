import StatCard from '../components/StatCard';
import Badge    from '../components/Badge';
import { DollarIcon, TrendIcon } from '../components/Icons';
import { FINANCIAL_DATA } from '../data/constants';
import { useLang } from '../i18n/LangContext';

const STATUS_KEY = { 'Paid':'paid', 'Pending':'pending', 'Partial':'partial' };

export default function Financial() {
  const { t } = useLang();
  const ft = t.financial;

  return (
    <div>
      <div className="stats-grid" style={{ marginBottom: '16px' }}>
        <StatCard icon={<DollarIcon />} target="$284K"  label={ft.revenue}  change={ft.changes.revenue}  changeType="up"   accent="var(--green)"  />
        <StatCard icon={<TrendIcon />}  target="$192K"  label={ft.expenses} change={ft.changes.expenses} changeType="down" accent="var(--red)"    />
        <StatCard icon={<TrendIcon />}  target="$92K"   label={ft.profit}   change={ft.changes.profit}   changeType="up"   accent="var(--blue)"   />
        <StatCard icon={<DollarIcon />} target="$18.4K" label={ft.pending}  change={ft.changes.pending}  changeType=""     accent="var(--yellow)" />
      </div>

      <div className="card table-card">
        <div className="table-hdr">
          <span className="card-title">{ft.invoiceTitle}</span>
          <span className="tbl-count">{ft.invoiceCount(FINANCIAL_DATA.length)}</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>{ft.cols.no}</th><th>{ft.cols.patient}</th><th>{ft.cols.service}</th>
                <th>{ft.cols.date}</th><th>{ft.cols.amount}</th><th>{ft.cols.status}</th><th>{ft.cols.actions}</th>
              </tr>
            </thead>
            <tbody>
              {FINANCIAL_DATA.map((inv, i) => (
                <tr key={i}>
                  <td><span className="pid">{inv.no}</span></td>
                  <td>{inv.patient}</td><td>{inv.service}</td>
                  <td><span style={{ fontFamily: 'DM Mono,monospace', fontSize: '11px', color: '#94a3b8' }}>{inv.date}</span></td>
                  <td><strong style={{ fontFamily: 'DM Mono,monospace' }}>${inv.amount.toLocaleString('en-US')}</strong></td>
                  <td><Badge value={t.status[STATUS_KEY[inv.status]] || inv.status} /></td>
                  <td>
                    <div className="tbl-actions">
                      <button className="tbl-btn">{t.common.view}</button>
                      <button className="tbl-btn">{t.common.print}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
