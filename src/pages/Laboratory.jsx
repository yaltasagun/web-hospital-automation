import Badge from '../components/Badge';
import { PlusIcon } from '../components/Icons';
import { LAB_DATA } from '../data/constants';
import { useLang } from '../i18n/LangContext';

const STATUS_KEY = { 'Completed': 'completed', 'Pending': 'pending' };
const RESULT_KEY = { 'Normal': 'normal', 'Abnormal': 'abnormal' };

export default function Laboratory() {
  const { t } = useLang();
  const lt = t.laboratory;

  return (
    <div>
      <div className="page-actions">
        <div className="filter-bar">
          <select className="filter-select">
            <option>{lt.allTests}</option>
            <option>{lt.tests.bloodPanel}</option>
            <option>{lt.tests.urinalysis}</option>
            <option>{lt.tests.imaging}</option>
            <option>{lt.tests.culture}</option>
          </select>
          <select className="filter-select">
            <option>{lt.allStatuses}</option>
            <option>{lt.pending}</option>
            <option>{lt.completed}</option>
          </select>
        </div>
        <button className="btn-primary"><PlusIcon /> {lt.requestBtn}</button>
      </div>

      <div className="card table-card">
        <div className="table-hdr">
          <span className="card-title">{lt.title}</span>
          <span className="tbl-count">{LAB_DATA.length}</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>{lt.cols.id}</th><th>{lt.cols.patient}</th><th>{lt.cols.type}</th>
                <th>{lt.cols.date}</th><th>{lt.cols.doctor}</th><th>{lt.cols.status}</th>
                <th>{lt.cols.result}</th><th>{lt.cols.actions}</th>
              </tr>
            </thead>
            <tbody>
              {LAB_DATA.map(l => (
                <tr key={l.id}>
                  <td><span className="pid">{l.id}</span></td>
                  <td>{l.patient}</td>
                  <td>{t.laboratory.tests[typeKey(l.type)] || l.type}</td>
                  <td><span style={{ fontFamily: 'DM Mono,monospace', fontSize: '11px', color: '#94a3b8' }}>{l.date}</span></td>
                  <td>{l.doctor}</td>
                  <td><Badge value={t.status[STATUS_KEY[l.status]] || l.status} /></td>
                  <td>
                    {l.result === '—'
                      ? <span style={{ color: '#4b607a' }}>—</span>
                      : <Badge value={t.status[RESULT_KEY[l.result]] || l.result} />}
                  </td>
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

function typeKey(type) {
  const map = { 'Blood Panel':'bloodPanel', 'Urinalysis':'urinalysis', 'Imaging':'imaging', 'Culture':'culture' };
  return map[type];
}
