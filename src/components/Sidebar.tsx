import React from 'react';
import { SECTION_GROUPS } from '../content/registry';
import { LOCALES } from '../translations';
import { getSectionNum, cleanTitle } from '../utils/helpers';

interface SidebarProps {
  currentLang: string;
  activeSection: string;
  onNavigate: (id: string) => void;
  sidebarOpen: boolean;
  onCloseSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentLang,
  activeSection,
  onNavigate,
  sidebarOpen,
  onCloseSidebar,
}) => {
  const dict = LOCALES[currentLang] || LOCALES['pt-BR'];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    onCloseSidebar();
  };

  return (
    <aside className={`${sidebarOpen ? 'open' : ''}`} id="main-sidebar">
      <div className="sid-meta">
        <div className="sid-dir-lbl" id="sid-dir-lbl">
          {dict['sid-dir-lbl'] || 'DIRETÓRIO'}
        </div>

        {SECTION_GROUPS.map(group => {
          const groupLabel = dict[group.id] || group.id;
          return (
            <div key={group.id} className="sid-group">
              <div className="sid-group-lbl">{groupLabel}</div>
              {group.sections.map(sec => {
                const titleText = dict[sec.key] || sec.id;
                const num = getSectionNum(sec.key);
                const isActive = activeSection === sec.id;
                
                return (
                  <button
                    key={sec.id}
                    onClick={() => handleItemClick(sec.id)}
                    className={`sid-btn ${isActive ? 'active' : ''}`}
                    title={titleText}
                  >
                    <span className="sid-btn-txt" style={{ display: 'flex', gap: '0.25rem' }}>
                      <span className="sid-num">
                        {num}.
                      </span>
                      <span>{titleText}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          );
        })}

        {/* System Terminal Log in margin */}
        <div className="sid-syslog max-sm:hidden" id="system-sidebar-terminal">
          <div className="sid-syslog-t" id="sid-syslog-t">
            {dict['sid-syslog-t'] || '● LOG DO SISTEMA'}
          </div>
          <div className="font-mono text-[9px] text-[#475569] leading-relaxed">
            <div>[OK] INITIALIZED_MEM_CONTROLLER</div>
            <div>[OK] ACCEL: VULKAN_API_READY</div>
            <div>[OK] HEAP_VRAM_ALLOC: 8192 MB (POLARIS)</div>
            <div>[OK] KERNEL_THREAD_THREADING: 24 (XEON)</div>
            <div>[SYS] READY_FOR_LOCAL_INFERENCE_2026</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
