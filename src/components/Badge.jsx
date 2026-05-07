import { BADGE_MAP } from '../data/constants';

/**
 * Renders a coloured status pill.
 * @param {string} value - Status string  'Admitted', 'Completed'
 */
export default function Badge({ value }) {
  const cls = BADGE_MAP[value] || '';
  return <span className={`badge badge-${cls}`}>{value}</span>;
}
