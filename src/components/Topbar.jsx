import { PAGE_TITLES } from '../data/constants';
import { SearchIcon, BellIcon, MenuIcon } from './Icons';

/**
 * Top navigation bar.
 *
 * Props:
 *   activePage    {string}   - Current page id for title lookup
 *   search        {string}   - Controlled search input value
 *   onSearchChange{function} - Called with new search string
 *   hasUnread     {boolean}  - Whether notification dot should be shown
 *   onNotifClick  {function} - Opens / closes notification panel
 *   onToggleSidebar {function} - Collapses / expands sidebar
 *   collapsed     {boolean}  - Current sidebar state
 */
export default function Topbar({
  activePage,
  search,
  onSearchChange,
  hasUnread,
  onNotifClick,
  onToggleSidebar,
  collapsed,
}) {
  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="topbar-title">{PAGE_TITLES[activePage] || 'Dashboard'}</div>
        <div className="topbar-date">{dateStr}</div>
      </div>

      <div className="topbar-right">
        {/* Global search */}
        <div className="search-wrap">
          <SearchIcon />
          <input
            placeholder="Search patients, doctors..."
            value={search}
            onChange={e => onSearchChange(e.target.value)}
          />
        </div>

        {/* Notification bell */}
        <button className="icon-btn" onClick={onNotifClick}>
          <BellIcon />
          {hasUnread && <span className="notif-dot" />}
        </button>

        {/* Sidebar collapse toggle */}
        <button className="collapse-btn" onClick={onToggleSidebar}>
          <MenuIcon />
          <span style={{ fontFamily: 'DM Mono, monospace' }}>
            {collapsed ? 'Expand' : 'Collapse'}
          </span>
        </button>
      </div>
    </header>
  );
}
