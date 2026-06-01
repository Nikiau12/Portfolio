(function(){
  const storageKey = 'siteTheme';

  function getSavedTheme(){
    try {
      return localStorage.getItem(storageKey);
    } catch(e) {
      return null;
    }
  }

  function saveTheme(theme){
    try {
      localStorage.setItem(storageKey, theme);
    } catch(e) {}
  }

  function applyTheme(theme, persist){
    const nextTheme = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    if (document.body) {
      document.body.classList.toggle('theme-dark', nextTheme === 'dark');
      document.body.classList.toggle('theme-light', nextTheme === 'light');
    }
    if (persist) saveTheme(nextTheme);

    document.querySelectorAll('[data-theme-toggle]').forEach((toggle)=>{
      toggle.setAttribute('aria-pressed', String(nextTheme === 'dark'));
      toggle.setAttribute('aria-label', nextTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  const savedTheme = getSavedTheme();
  if (savedTheme === 'dark' || savedTheme === 'light') {
    applyTheme(savedTheme, false);
  }

  function initThemeToggles(){
    applyTheme(document.documentElement.dataset.theme || getSavedTheme() || 'light', false);

    document.querySelectorAll('[data-theme-toggle]').forEach((toggle)=>{
      toggle.addEventListener('click', ()=>{
        const currentTheme = document.documentElement.dataset.theme || getSavedTheme() || 'light';
        applyTheme(currentTheme === 'dark' ? 'light' : 'dark', true);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggles);
  } else {
    initThemeToggles();
  }
})();
