// Add clear button to email/username input
const emailInput = document.querySelector('input[type="text"]');
const emailInputGroup = emailInput.parentElement;

// Create and add clear button
const clearButton = document.createElement('button');
clearButton.type = 'button';
clearButton.className = 'clear-button';
clearButton.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
`;
emailInputGroup.appendChild(clearButton);

// Show/hide clear button based on input content
emailInput.addEventListener('input', () => {
  clearButton.style.display = emailInput.value ? 'block' : 'none';
});

// Clear input when button is clicked
clearButton.addEventListener('click', () => {
  emailInput.value = '';
  clearButton.style.display = 'none';
  emailInput.focus();
});

// Password visibility toggle
const passwordInput = document.querySelector('input[type="password"]');
const passwordInputGroup = passwordInput.parentElement;

// Create and add toggle button
const toggleButton = document.createElement('button');
toggleButton.type = 'button';
toggleButton.className = 'toggle-password';
toggleButton.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="eye-off-icon">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
`;
passwordInputGroup.appendChild(toggleButton);

// Show/hide toggle button based on password input content
passwordInput.addEventListener('input', () => {
  toggleButton.style.display = passwordInput.value ? 'block' : 'none';
});

// Toggle password visibility
toggleButton.addEventListener('click', () => {
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
  
  // Update icon based on password visibility
  toggleButton.innerHTML = type === 'password' ? `
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="eye-off-icon">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>

  ` : `
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="eye-icon">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  `;
});

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