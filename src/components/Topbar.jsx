import { useLang } from '../i18n/LangContext';
import { SearchIcon, BellIcon, MenuIcon } from './Icons';

/**
 * Top navigation bar.
 * Props: activePage, search, onSearchChange, hasUnread,
 *        onNotifClick, onToggleSidebar, collapsed
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
  const { t, lang, setLang } = useLang();

  const dateStr = new Date().toLocaleDateString(
    lang === 'tr' ? 'tr-TR' : 'en-US',
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="topbar-title">{t.pages[activePage] || t.pages.dashboard}</div>
        <div className="topbar-date">{dateStr}</div>
      </div>

      <div className="topbar-right">
        <div className="search-wrap">
          <SearchIcon />
          <input
            placeholder={t.topbar.searchPlaceholder}
            value={search}
            onChange={e => onSearchChange(e.target.value)}
          />
        </div>

        <button
          className="lang-btn"
          onClick={() => setLang(l => l === 'en' ? 'tr' : 'en')}
          title={lang === 'en' ? 'Turkce' : 'English'}
        >
          <span className={lang === 'en' ? 'lang-active' : 'lang-inactive'}>EN</span>
          <span className="lang-divider">|</span>
          <span className={lang === 'tr' ? 'lang-active' : 'lang-inactive'}>TR</span>
        </button>

        <button className="icon-btn" onClick={onNotifClick}>
          <BellIcon />
          {hasUnread && <span className="notif-dot" />}
        </button>

        <button className="collapse-btn" onClick={onToggleSidebar}>
          <MenuIcon />
          <span style={{ fontFamily: 'DM Mono, monospace' }}>
            {collapsed ? t.topbar.expand : t.topbar.collapse}
          </span>
        </button>
      </div>
    </header>
  );
}
