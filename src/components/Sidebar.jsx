import { NAV_ITEMS } from '../data/constants';
import { NAV_ICONS, LogoutIcon } from './Icons';
import { useLang } from '../i18n/LangContext';

const NAV_GROUPS = [
  { key: 'main',       labelKey: 'main',       dataGroup: 'MAIN MENU'  },
  { key: 'clinical',   labelKey: 'clinical',   dataGroup: 'CLINICAL'   },
  { key: 'management', labelKey: 'management', dataGroup: 'MANAGEMENT' },
];

export default function Sidebar({ activePage, onNavigate, collapsed }) {
  const { t } = useLang();

  return (
    <aside className={`sidebar${collapsed ? ' collapsed' : ''}`}>
      <div className="sb-logo">
        <div className="sb-logo-mark">
          <svg viewBox="0 0 32 32" fill="none">
            <rect x="13" y="4"  width="6" height="24" rx="3" fill="white" />
            <rect x="4"  y="13" width="24" height="6"  rx="3" fill="white" />
          </svg>
        </div>
        <div className="sb-logo-text">
          <span className="sb-logo-name">MediCore</span>
          <span className="sb-logo-sub">{t.sidebar.system}</span>
        </div>
      </div>

      <nav className="sb-nav">
        {NAV_GROUPS.map(group => {
          const items = NAV_ITEMS.filter(n => n.group === group.dataGroup);
          if (!items.length) return null;
          return (
            <div key={group.key} className="sb-group">
              <span className="sb-group-label">{t.sidebar.groups[group.labelKey]}</span>
              {items.map(item => {
                const IconComp = NAV_ICONS[item.id];
                return (
                  <button
                    key={item.id}
                    className={`sb-item${activePage === item.id ? ' active' : ''}`}
                    onClick={() => onNavigate(item.id)}
                  >
                    {IconComp && <IconComp />}
                    <span className="sb-item-label">{t.nav[item.id]}</span>
                    {item.badge && (
                      <span className={`sb-badge${item.badgeAccent ? ' accent' : ''}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </nav>

      <div className="sb-footer">
        <div className="sb-user">
          <div className="sb-avatar">AY</div>
          <div className="sb-user-info">
            <span className="sb-user-name">Dr. Ahmet Yılmaz</span>
            <span className="sb-user-role">{t.sidebar.role}</span>
          </div>
          <button className="sb-logout" title="Logout">
            <LogoutIcon />
          </button>
        </div>
      </div>
    </aside>
  );
}
