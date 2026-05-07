import { NAV_ITEMS } from '../data/constants';
import { NAV_ICONS, LogoutIcon } from './Icons';

const NAV_GROUPS = ['MAIN MENU', 'MANAGEMENT'];

/**
 * Application sidebar with collapsible behaviour.
 *
 * Props:
 *   activePage  {string}   - Current page id
 *   onNavigate  {function} - Called with page id when a nav item is clicked
 *   collapsed   {boolean}  - Whether the sidebar is in narrow mode
 */
export default function Sidebar({ activePage, onNavigate, collapsed }) {
  return (
    <aside className={`sidebar${collapsed ? ' collapsed' : ''}`}>
      {/* Logo */}
      <div className="sb-logo">
        <div className="sb-logo-mark">
          <svg viewBox="0 0 32 32" fill="none">
            <rect x="13" y="4"  width="6" height="24" rx="3" fill="white" />
            <rect x="4"  y="13" width="24" height="6"  rx="3" fill="white" />
          </svg>
        </div>
        <div className="sb-logo-text">
          <span className="sb-logo-name">MediCore</span>
          <span className="sb-logo-sub">Hospital System</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sb-nav">
        {NAV_GROUPS.map(group => (
          <div key={group} className="sb-group">
            <span className="sb-group-label">{group}</span>

            {NAV_ITEMS.filter(n => n.group === group).map(item => {
              const IconComp = NAV_ICONS[item.id];
              return (
                <button
                  key={item.id}
                  className={`sb-item${activePage === item.id ? ' active' : ''}`}
                  onClick={() => onNavigate(item.id)}
                >
                  {IconComp && <IconComp />}
                  <span className="sb-item-label">{item.label}</span>
                  {item.badge && (
                    <span className={`sb-badge${item.badgeAccent ? ' accent' : ''}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="sb-footer">
        <div className="sb-user">
          <div className="sb-avatar">AY</div>
          <div className="sb-user-info">
            <span className="sb-user-name">Dr. Ahmet Yılmaz</span>
            <span className="sb-user-role">Administrator</span>
          </div>
          <button className="sb-logout" title="Logout">
            <LogoutIcon />
          </button>
        </div>
      </div>
    </aside>
  );
}
