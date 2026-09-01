// Simple language detection for tool pages
(function() {
  'use strict';
  
  // Get language from localStorage or default to 'en'
  function getLang() {
    return localStorage.getItem('multi-tools-lang') || 'en';
  }
  
  // Apply language to page elements
  function applyLang(lang) {
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update page title if it has translation marker
    const titleEl = document.querySelector('[data-i18n-title]');
    if (titleEl) {
      titleEl.textContent = window.toolTranslations?.[lang]?.title || titleEl.textContent;
    }
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && window.toolTranslations?.[lang]?.description) {
      metaDesc.content = window.toolTranslations[lang].description;
    }
    
    // Track language
    if (typeof gtag !== 'undefined') {
      gtag('event', 'language_change', { language: lang });
    }
  }
  
  // Initialize
  const lang = getLang();
  applyLang(lang);
  
  // Expose for debugging
  window.currentLang = lang;
  
  // Check if auto-detection is enabled
  if (localStorage.getItem('multi-tools-lang-auto') === 'enabled') {
    const browserLang = navigator.language?.slice(0, 2) || 'en';
    if (['zh', 'ja', 'ko', 'es', 'fr', 'de', 'ru', 'ar'].includes(browserLang)) {
      localStorage.setItem('multi-tools-lang', browserLang);
      applyLang(browserLang);
    }
  }
})();
