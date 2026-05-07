import StatCard from '../components/StatCard';
import Badge    from '../components/Badge';
import { DollarIcon, TrendIcon } from '../components/Icons';
import { FINANCIAL_DATA } from '../data/constants';

export default function Financial() {
  return (
    <div>
      {/* KPI cards */}
      <div className="stats-grid" style={{ marginBottom: '16px' }}>
        <StatCard icon={<DollarIcon />} target="$284K"  label="Monthly Revenue"   change="↑ 8.2%"        changeType="up"   accent="var(--green)"  />
        <StatCard icon={<TrendIcon />}  target="$192K"  label="Monthly Expenses"  change="↓ 3.1%"        changeType="down" accent="var(--red)"    />
        <StatCard icon={<TrendIcon />}  target="$92K"   label="Net Profit"        change="↑ 18.4%"       changeType="up"   accent="var(--blue)"   />
        <StatCard icon={<DollarIcon />} target="$18.4K" label="Pending Payments"  change="= 42 invoices" changeType=""     accent="var(--yellow)" />
      </div>

      {/* Invoice table */}
      <div className="card table-card">
        <div className="table-hdr">
          <span className="card-title">Invoice List</span>
          <span className="tbl-count">{FINANCIAL_DATA.length} invoices</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Invoice No</th><th>Patient</th><th>Service</th>
                <th>Date</th><th>Amount</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {FINANCIAL_DATA.map((inv, i) => (
                <tr key={i}>
                  <td><span className="pid">{inv.no}</span></td>
                  <td>{inv.patient}</td>
                  <td>{inv.service}</td>
                  <td><span style={{ fontFamily: 'DM Mono,monospace', fontSize: '11px', color: '#94a3b8' }}>{inv.date}</span></td>
                  <td><strong style={{ fontFamily: 'DM Mono,monospace' }}>${inv.amount.toLocaleString('en-US')}</strong></td>
                  <td><Badge value={inv.status} /></td>
                  <td>
                    <div className="tbl-actions">
                      <button className="tbl-btn">View</button>
                      <button className="tbl-btn">Print</button>
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
