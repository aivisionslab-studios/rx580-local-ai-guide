// src/sidebar.js
import { SECTION_GROUPS, ALL_SECTION_IDS } from './content/registry.js';
import { SECTION_CONTENT } from './content/data.js';
import { LOCALES } from './translations.js';

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

let isScrolling = false;
let scrollTimeout = null;

function goTo(id) {
  const el = document.getElementById(id);
  if (el) {
    isScrolling = true;
    if (scrollTimeout) clearTimeout(scrollTimeout);

    el.scrollIntoView({ behavior: 'smooth' });
    setActive(id);
    window.location.hash = id;

    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 800);
    
    // Close sidebar on mobile after click
    if (window.innerWidth <= 1000) {
      document.querySelector('aside')?.classList.remove('open');
    }
  }
}

function toggleSidebar() {
  document.querySelector('aside')?.classList.toggle('open');
}

window.toggleSidebar = toggleSidebar;

// Close sidebar when clicking outside of it on mobile
document.addEventListener('click', (e) => {
  const aside = document.querySelector('aside');
  const toggle = document.getElementById('mobile-toggle');
  if (aside && aside.classList.contains('open')) {
    if (!aside.contains(e.target) && (!toggle || !toggle.contains(e.target))) {
      aside.classList.remove('open');
    }
  }
});

function setActive(id) {
  document.querySelectorAll('.sid-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-id') === id);
  });
}

function renderSidebar() {
  const container = document.getElementById('sidebar-content');
  if (!container) return;
  
  container.innerHTML = '';
  const lang = window.currentLang || 'pt-BR';
  const contentData = SECTION_CONTENT[lang] || SECTION_CONTENT['pt-BR'] || {};
  const dicionario = LOCALES[lang] || LOCALES['pt-BR'] || {};
  
  SECTION_GROUPS.forEach(group => {
    const groupEl = document.createElement('div');
    groupEl.className = 'sid-group';
    
    const label = document.createElement('div');
    label.className = 'sid-group-lbl';
    label.id = group.id;
    label.setAttribute('data-i18n', group.labelKey);
    label.innerText = dicionario[group.labelKey] || group.labelKey;
    groupEl.appendChild(label);
    
    group.sections.forEach(sec => {
      const data = contentData[sec.id] || {};
      const num = getSectionNum(sec.key);
      const title = dicionario[sec.key] || cleanTitle(data.title) || sec.id;
      
      const btn = document.createElement('button');
      btn.className = 'sid-btn';
      btn.setAttribute('data-id', sec.id);
      btn.onclick = () => goTo(sec.id);
      
      const text = document.createElement('span');
      text.className = 'sid-btn-txt';
      text.innerHTML = `<span class="sid-num">${num}.</span> ${title}`;
      btn.appendChild(text);
      
      groupEl.appendChild(btn);
    });
    
    container.appendChild(groupEl);
  });
}

function updateActiveSectionOnScroll() {
  if (isScrolling) return;

  // Bottom of page check
  const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 50);
  if (isAtBottom) {
    setActive(ALL_SECTION_IDS[ALL_SECTION_IDS.length - 1]);
    return;
  }

  const threshold = 150; // Offset below the sticky header (56px) + some safety margins
  let activeId = ALL_SECTION_IDS[0];

  for (let i = 0; i < ALL_SECTION_IDS.length; i++) {
    const id = ALL_SECTION_IDS[i];
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= threshold) {
        activeId = id;
      } else {
        break; // Order is linear
      }
    }
  }

  if (activeId) {
    setActive(activeId);
  }
}

// Attach the passive event listener
window.addEventListener('scroll', updateActiveSectionOnScroll, { passive: true });

window.renderSidebar = renderSidebar;

document.addEventListener('DOMContentLoaded', () => {
  // renderSidebar is now called by applyLocale in i18n.js to ensure labels are translated
  
  // Handle initial hash
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    if (ALL_SECTION_IDS.includes(targetId)) {
      setTimeout(() => goTo(targetId), 500);
    }
  } else {
    updateActiveSectionOnScroll();
  }
});

// Create a mutation observer to update scrollspy when sections-container changes
const container = document.getElementById('sections-container');
if (container) {
  const mutationObs = new MutationObserver(() => {
    updateActiveSectionOnScroll();
  });
  mutationObs.observe(container, { childList: true });
}

window.goTo = goTo;
window.setActive = setActive;
