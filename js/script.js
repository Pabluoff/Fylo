// Initialize form elements
const loginForm = document.getElementById('loginForm');
const emailOrUsernameInput = document.querySelector('input[type="text"]');
const passwordInput = document.querySelector('input[type="password"]');

// Alert system
function showAlert(title, message) {
  // Remove existing alert if any
  const existingAlert = document.querySelector('.alert-container');
  if (existingAlert) {
    existingAlert.remove();
  }

  // Create alert container
  const alertContainer = document.createElement('div');
  alertContainer.className = 'alert-container';

  // Create alert box
  const alertBox = document.createElement('div');
  alertBox.className = 'alert-box';

  // Create alert content
  const alertContent = document.createElement('div');
  alertContent.className = 'alert-content';

  // Add title
  const alertTitle = document.createElement('h2');
  alertTitle.className = 'alert-title';
  alertTitle.textContent = title;

  // Add message
  const alertMessage = document.createElement('p');
  alertMessage.className = 'alert-message';
  alertMessage.textContent = message;

  // Add buttons container
  const alertButtons = document.createElement('div');
  alertButtons.className = 'alert-buttons';

  // Add OK button
  const okButton = document.createElement('button');
  okButton.className = 'alert-button';
  okButton.textContent = 'OK';
  okButton.onclick = () => {
    alertContainer.classList.remove('show');
    setTimeout(() => alertContainer.remove(), 300);
  };

  // Assemble the alert
  alertContent.appendChild(alertTitle);
  alertContent.appendChild(alertMessage);
  alertBox.appendChild(alertContent);
  alertButtons.appendChild(okButton);
  alertBox.appendChild(alertButtons);
  alertContainer.appendChild(alertBox);
  document.body.appendChild(alertContainer);

  // Add haptic feedback if available
  if ('vibrate' in navigator) {
    navigator.vibrate(40);
  }

  // Show the alert with animation
  requestAnimationFrame(() => {
    alertContainer.classList.add('show');
  });
}

// Email/Username clear button functionality
const inputGroup = emailOrUsernameInput.parentElement;
const clearButton = document.createElement('button');
clearButton.type = 'button';
clearButton.className = 'clear-button';
clearButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
`;
inputGroup.appendChild(clearButton);

emailOrUsernameInput.addEventListener('input', () => {
    clearButton.style.display = emailOrUsernameInput.value ? 'block' : 'none';
});

clearButton.addEventListener('click', (event) => {
    event.preventDefault();
    emailOrUsernameInput.value = '';
    clearButton.style.display = 'none';
    emailOrUsernameInput.focus();
});

// Password visibility toggle
const passwordInputGroup = passwordInput.parentElement;
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

// Show toggle button when password field has value
passwordInput.addEventListener('input', () => {
    toggleButton.style.display = passwordInput.value ? 'block' : 'none';
});

// Initial state of toggle button
toggleButton.style.display = passwordInput.value ? 'block' : 'none';

toggleButton.addEventListener('click', (event) => {
    event.preventDefault();
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    
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

// Validation functions
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidUsername(username) {
    return /^[a-zA-Z0-9._]{3,}$/.test(username);
}

function validateInput(value) {
    if (value.includes('@')) {
        return isValidEmail(value) ? true : 'Email inválido';
    } else {
        return isValidUsername(value) ? true : 'Nome de usuário inválido';
    }
}

// Loading state management
function setLoading(isLoading) {
    const loginButton = document.querySelector('.login-button');
    if (loginButton) {
        loginButton.disabled = isLoading;
        loginButton.classList.toggle('loading', isLoading);
    }
}

// Only add event listener if form exists
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const emailOrUsername = emailOrUsernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Validation
        if (!emailOrUsername || !password) {
            showAlert('Campos Vazios', 'Por favor, preencha todos os campos');
            return;
        }
        
        const validation = validateInput(emailOrUsername);
        if (validation !== true) {
            showAlert('Entrada Inválida', validation);
            return;
        }
        
        if (password.length < 6) {
            showAlert('Senha Inválida', 'A senha deve ter pelo menos 6 caracteres');
            return;
        }
        
        try {
            setLoading(true);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            if ((emailOrUsername === 'demo@example.com' || emailOrUsername === 'pabluoff') && password === '00000000') {
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1000);
            } else {
                showAlert('Erro', 'Credenciais inválidas');
                setLoading(false);
            }
        } catch (error) {
            showAlert('Erro', 'Erro ao fazer login. Tente novamente.');
            setLoading(false);
        }
    });
}


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log('Service Worker registrado com sucesso!'))
      .catch((error) => console.log('Erro ao registrar Service Worker:', error));
  }