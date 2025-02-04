
// Language switcher functionality
function setLanguage(language) {
    document.documentElement.lang = language;
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[language] && translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });
    localStorage.setItem('preferredLanguage', language);
}

// Initialize language
document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('languageSelect');
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'pt';
    
    languageSelect.value = savedLanguage;
    setLanguage(savedLanguage);

    languageSelect.addEventListener('change', (e) => {
        setLanguage(e.target.value);
    });
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log('Service Worker registrado com sucesso!'))
      .catch((error) => console.log('Erro ao registrar Service Worker:', error));
  }