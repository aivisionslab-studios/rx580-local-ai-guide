import React, { useState, useRef, useEffect } from 'react';
import { LOCALES } from '../translations';

interface TopNavProps {
  currentLang: string;
  onSetLang: (lang: string) => void;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

const LANGUAGES = [
  { code: 'pt-BR', label: 'Português (BR)', flag: '🇧🇷' },
  { code: 'en', label: 'English (US)', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
];

export const TopNav: React.FC<TopNavProps> = ({
  currentLang,
  onSetLang,
  onToggleSidebar,
  sidebarOpen,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dict = LOCALES[currentLang] || LOCALES['pt-BR'];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const currentLangObj = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  return (
    <nav className="top-nav" id="main-top-nav">
      {/* Mobile Sidebar Toggle */}
      <button
        id="mobile-toggle"
        onClick={onToggleSidebar}
        className="hidden max-md:flex flex-col gap-1.5 justify-center items-center w-8 h-8 mr-3 border border-zinc-800 rounded cursor-pointer bg-zinc-900/40 text-rose-500 hover:text-white transition-colors"
        aria-label="Toggle navigation menu"
      >
        <span className={`w-5 h-0.5 bg-current transition-transform ${sidebarOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`w-5 h-0.5 bg-current transition-opacity ${sidebarOpen ? 'opacity-0' : ''}`} />
        <span className={`w-5 h-0.5 bg-current transition-transform ${sidebarOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Brand Metadata */}
      <div className="nav-brand-group">
        <span id="nav-brand" className="font-bold tracking-widest text-[#fff]">
          {dict['nav-brand'] || 'HARDWARE REVIVAL // 2026'}
        </span>
        <span id="nav-subtitle" className="text-[10px] text-[#64748b]">
          {dict['nav-subtitle'] || 'RX 580 AI — MASTER UNIFICADA'}
        </span>
      </div>

      {/* Connection / Lang Selects */}
      <div className="nav-status-group">
        {/* Status Light */}
        <div id="nav-status" className="flex items-center gap-2 font-mono text-[10px] text-green-500 font-medium max-sm:hidden">
          <span className="nav-status-dot animate-pulse" />
          <span>{dict['nav-status'] || 'VULKAN_BACKEND: ATIVO'}</span>
        </div>

        {/* Language Selector */}
        <div className="lang-wrapper" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="lang-btn"
            id="lang-selector-btn"
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
          >
            <span>{currentLangObj.flag}</span>
            <span>{currentLangObj.label.split(' ')[0]}</span>
            <svg
              className={`w-3 h-3 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div className={`lang-dropdown ${dropdownOpen ? 'open' : ''}`} id="lang-picker-dropdown" role="listbox">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                role="option"
                aria-selected={currentLang === lang.code}
                onClick={() => {
                  onSetLang(lang.code);
                  setDropdownOpen(false);
                }}
                className={`lang-opt ${currentLang === lang.code ? 'active' : ''}`}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
