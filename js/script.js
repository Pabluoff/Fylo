document.addEventListener('DOMContentLoaded', () => {
    // Função para adicionar o ícone de "X" ao input de usuário/email
    const usernameInput = document.querySelector('.input-group input[type="text"]');
    const passwordInput = document.querySelector('.input-group input[type="password"]');

    if (usernameInput) {
        const clearIcon = document.createElement('span');
        clearIcon.innerHTML = '&times;'; // Ícone "X"
        clearIcon.style.position = 'absolute';
        clearIcon.style.right = '10px';
        clearIcon.style.top = '50%';
        clearIcon.style.transform = 'translateY(-50%)';
        clearIcon.style.cursor = 'pointer';
        clearIcon.style.color = 'rgba(255, 255, 255, 0.6)';
        clearIcon.style.display = 'none'; // Inicialmente oculto

        usernameInput.parentElement.style.position = 'relative';
        usernameInput.parentElement.appendChild(clearIcon);

        usernameInput.addEventListener('input', () => {
            if (usernameInput.value.trim() !== '') {
                clearIcon.style.display = 'block';
            } else {
                clearIcon.style.display = 'none';
            }
        });

        clearIcon.addEventListener('click', () => {
            usernameInput.value = '';
            clearIcon.style.display = 'none';
            usernameInput.focus();
        });
    }

    // Função para mostrar/ocultar a senha
    if (passwordInput) {
        const togglePassword = document.createElement('span');
        togglePassword.innerHTML = '👁️'; // Ícone de olho
        togglePassword.style.position = 'absolute';
        togglePassword.style.right = '10px';
        togglePassword.style.top = '50%';
        togglePassword.style.transform = 'translateY(-50%)';
        togglePassword.style.cursor = 'pointer';
        togglePassword.style.color = 'rgba(255, 255, 255, 0.6)';

        passwordInput.parentElement.style.position = 'relative';
        passwordInput.parentElement.appendChild(togglePassword);

        togglePassword.addEventListener('click', () => {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                togglePassword.innerHTML = '👁️'; // Ícone de olho aberto
            } else {
                passwordInput.type = 'password';
                togglePassword.innerHTML = '👁️'; // Ícone de olho fechado
            }
        });
    }
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