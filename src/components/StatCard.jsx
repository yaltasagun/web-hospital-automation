import useCounter from '../hooks/useCounter';

/**
 * Animated stat card.
 *
 * Props:
 *   icon        {ReactNode} - Icon element
 *   target      {number|string} - If number, animates from 0; otherwise displayed as-is
 *   label       {string}    - Description below the value
 *   change      {string}    - Change text e.g. "↑ 12 this week"
 *   changeType  {string}    - 'up' | 'down' | '' for colour class
 *   accent      {string}    - CSS colour for left border & icon
 */
export default function StatCard({ icon, target, label, change, changeType = '', accent }) {
  const animatedVal = useCounter(typeof target === 'number' ? target : 0);
  const display = typeof target === 'number' ? animatedVal.toLocaleString() : target;

  return (
    <div className="stat-card" style={{ '--accent': accent }}>
      <div className="stat-icon">{icon}</div>
      <div>
        <span className="stat-val">{display}</span>
        <span className="stat-lbl">{label}</span>
        <span className={`stat-chg ${changeType}`}>{change}</span>
      </div>
    </div>
  );
}
