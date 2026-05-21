import { PlusIcon } from '../components/Icons';
import { PHARMACY_DATA, PRESCRIPTIONS } from '../data/constants';
import { useLang } from '../i18n/LangContext';

export default function Pharmacy() {
  const { t } = useLang();
  const ph = t.pharmacy;

  return (
    <div>
      <div className="page-actions">
        <div className="filter-bar">
          <select className="filter-select">
            <option>{ph.allMedications}</option>
            <option>{ph.antibiotics}</option>
            <option>{ph.analgesics}</option>
            <option>{ph.vitamins}</option>
          </select>
        </div>
        <button className="btn-primary"><PlusIcon /> {ph.prescriptionBtn}</button>
      </div>

      <div className="pharm-grid">
        <div className="card table-card">
          <div className="table-hdr">
            <span className="card-title">{ph.inventoryTitle}</span>
            <span className="tbl-count">{PHARMACY_DATA.length}</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{ph.cols.medication}</th><th>{ph.cols.category}</th><th>{ph.cols.stock}</th>
                  <th>{ph.cols.minStock}</th><th>{ph.cols.unitPrice}</th><th>{ph.cols.status}</th>
                </tr>
              </thead>
              <tbody>
                {PHARMACY_DATA.map((med, i) => {
                  const low = med.stock < med.min;
                  return (
                    <tr key={i}>
                      <td><strong>{med.name}</strong></td>
                      <td>{med.category}</td>
                      <td style={{ color: low ? 'var(--red)' : 'inherit', fontWeight: low ? 700 : 400, fontFamily: 'DM Mono,monospace' }}>{med.stock}</td>
                      <td style={{ fontFamily: 'DM Mono,monospace', color: '#94a3b8' }}>{med.min}</td>
                      <td style={{ fontFamily: 'DM Mono,monospace' }}>${med.price.toFixed(2)}</td>
                      <td>
                        {low
                          ? <span className="badge badge-low">{ph.lowStock}</span>
                          : <span className="badge badge-instock">{ph.inStock}</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><span className="card-title">{ph.prescriptionsTitle}</span></div>
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
