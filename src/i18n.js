import { SECTION_CONTENT } from './content/data.js';
import { SECTION_GROUPS, ALL_SECTION_IDS } from './content/registry.js';
import { LOCALES } from './translations.js';

window.currentLang = localStorage.getItem('selected_lang') || 'pt-BR';
const fallbackLang = 'pt-BR';

function cleanTitle(title) {
  if (!title) return '';
  return title.replace(/^(\d+\.?\w*\s*[-—:\.]\s*)/, '').trim();
}

function getSectionNum(key) {
  let code = key.replace('sh-s', '');
  if (/^\d+[a-zA-Z]$/.test(code)) {
    const digits = code.match(/^\d+/)[0];
    const letter = code.slice(digits.length).toUpperCase();
    return `${digits}.${letter}`;
  }
  return code;
}

function renderDynamicSections() {
  const container = document.getElementById('sections-container');
  if (!container) return;

  const lang = window.currentLang;
  const contentData = SECTION_CONTENT[lang] || SECTION_CONTENT[fallbackLang] || {};
  const dicionario = LOCALES[lang] || LOCALES[fallbackLang] || {};

  container.innerHTML = ''; // Clear

  SECTION_GROUPS.forEach(group => {
    group.sections.forEach(sec => {
      const data = contentData[sec.id] || SECTION_CONTENT[fallbackLang][sec.id];
      if (!data) return;

      const section = document.createElement('section');
      section.id = sec.id;

      const num = getSectionNum(sec.key);
      const titleText = dicionario[sec.key] || cleanTitle(data.title) || sec.id;
      section.innerHTML = `
        <div class="sh">
          <div class="sh-line"></div>
          <div class="sh-t" id="${sec.key}">${num}. ${titleText.toUpperCase()}</div>
        </div>
        <div id="${sec.id}-content">
          ${data.desc ? `<p class="section-desc">${data.desc}</p>` : ''}
          ${data.html || ''}
        </div>
      `;

      container.appendChild(section);
    });
  });
}

function applyLocale() {
  const dicionario = LOCALES[window.currentLang] || LOCALES[fallbackLang] || {};

  // 1. Initial renders
  renderDynamicSections();
  if (window.renderSidebar) window.renderSidebar();

  // 2. Global Translations (Targets IDs)
  Object.keys(dicionario).forEach(key => {
    const el = document.getElementById(key);
    if (el) {
      // In headers (sh-sXX), we keep the number prefix if it exists in the current innerText
      if (key.startsWith('sh-s')) {
        const currentText = el.innerText;
        const match = currentText.match(/^(\d+[-a-zA-Z\.]*\.\s*)/);
        const prefix = match ? match[1] : '';
        el.innerText = prefix + dicionario[key];
      } else {
        el.innerText = dicionario[key];
      }
    }
  });

  // 3. RTR Support
  document.body.classList.toggle('rtl-mode', window.currentLang === 'ar');
  document.body.setAttribute('dir', window.currentLang === 'ar' ? 'rtl' : 'ltr');

  // UI Updates (Flag/Label)
  const flags = { 'pt-BR': '🇧🇷', 'en': '🇺🇸', 'es': '🇪🇸', 'fr': '🇫🇷', 'ar': '🇸🇦' };
  const labels = { 'pt-BR': 'Português', 'en': 'English', 'es': 'Español', 'fr': 'Français', 'ar': 'العربية' };
  
  if (document.getElementById('lang-current-flag')) document.getElementById('lang-current-flag').innerText = flags[window.currentLang] || '🇧🇷';
  if (document.getElementById('lang-current-label')) document.getElementById('lang-current-label').innerText = labels[window.currentLang] || 'Português';

  document.querySelectorAll('.lang-opt').forEach(opt => {
    opt.classList.toggle('active', opt.getAttribute('data-lang') === window.currentLang);
  });
}

function switchLang(langCode) {
  window.currentLang = langCode;
  localStorage.setItem('selected_lang', langCode);
  applyLocale();
  document.getElementById('lang-dropdown')?.classList.remove('open');
}

function toggleLangDropdown() {
  document.getElementById('lang-dropdown')?.classList.toggle('open');
}

document.addEventListener('click', (e) => {
  const btn = document.querySelector('.lang-btn');
  const dropdown = document.getElementById('lang-dropdown');
  if (dropdown && btn && !btn.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.remove('open');
  }
});

window.switchLang = switchLang;
window.toggleLangDropdown = toggleLangDropdown;
window.applyLocale = applyLocale;

document.addEventListener('DOMContentLoaded', applyLocale);
