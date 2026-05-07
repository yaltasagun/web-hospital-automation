import { PlusIcon } from '../components/Icons';
import { PHARMACY_DATA, PRESCRIPTIONS } from '../data/constants';

export default function Pharmacy() {
  return (
    <div>
      <div className="page-actions">
        <div className="filter-bar">
          <select className="filter-select">
            <option>All Medications</option>
            <option>Antibiotics</option>
            <option>Analgesics</option>
            <option>Vitamins</option>
          </select>
        </div>
        <button className="btn-primary"><PlusIcon /> Write Prescription</button>
      </div>

      <div className="pharm-grid">
        {/* Inventory table */}
        <div className="card table-card">
          <div className="table-hdr">
            <span className="card-title">Inventory Status</span>
            <span className="tbl-count">{PHARMACY_DATA.length} items</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Medication</th><th>Category</th><th>Stock</th>
                  <th>Min Stock</th><th>Unit Price</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {PHARMACY_DATA.map((med, i) => {
                  const low = med.stock < med.min;
                  return (
                    <tr key={i}>
                      <td><strong>{med.name}</strong></td>
                      <td>{med.category}</td>
                      <td style={{ color: low ? 'var(--red)' : 'inherit', fontWeight: low ? 700 : 400, fontFamily: 'DM Mono,monospace' }}>
                        {med.stock}
                      </td>
                      <td style={{ fontFamily: 'DM Mono,monospace', color: '#94a3b8' }}>{med.min}</td>
                      <td style={{ fontFamily: 'DM Mono,monospace' }}>${med.price.toFixed(2)}</td>
                      <td>
                        {low
                          ? <span className="badge badge-low">Low Stock</span>
                          : <span className="badge badge-instock">In Stock</span>
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent prescriptions */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Recent Prescriptions</span>
          </div>
          {PRESCRIPTIONS.map((rx, i) => (
            <div key={i} className="rx-item">
              <strong>{rx.patient}</strong>
              <span>{rx.med}</span>
              <em>{rx.doctor} · {rx.date}</em>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
