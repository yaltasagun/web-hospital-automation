import Badge from '../components/Badge';
import { PlusIcon } from '../components/Icons';
import { LAB_DATA } from '../data/constants';

export default function Laboratory() {
  return (
    <div>
      <div className="page-actions">
        <div className="filter-bar">
          <select className="filter-select">
            <option>All Tests</option>
            <option>Blood Panel</option>
            <option>Urinalysis</option>
            <option>Imaging</option>
            <option>Culture</option>
          </select>
          <select className="filter-select">
            <option>All Statuses</option>
            <option>Pending</option>
            <option>Completed</option>
          </select>
        </div>
        <button className="btn-primary"><PlusIcon /> Request Test</button>
      </div>

      <div className="card table-card">
        <div className="table-hdr">
          <span className="card-title">Lab Results</span>
          <span className="tbl-count">{LAB_DATA.length} records</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Test ID</th><th>Patient</th><th>Type</th>
                <th>Requested</th><th>Doctor</th><th>Status</th><th>Result</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {LAB_DATA.map(l => (
                <tr key={l.id}>
                  <td><span className="pid">{l.id}</span></td>
                  <td>{l.patient}</td>
                  <td>{l.type}</td>
                  <td><span style={{ fontFamily: 'DM Mono,monospace', fontSize: '11px', color: '#94a3b8' }}>{l.date}</span></td>
                  <td>{l.doctor}</td>
                  <td><Badge value={l.status} /></td>
                  <td>
                    {l.result === '—'
                      ? <span style={{ color: '#4b607a' }}>—</span>
                      : <Badge value={l.result} />
                    }
                  </td>
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
