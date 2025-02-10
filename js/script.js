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
    return /^[a-zA-Z0-9._]{3,20}$/.test(username);
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

// Registration Modal Functionality
const registrationModal = document.getElementById('registrationModal');
const createAccountButton = document.querySelector('.create-account-button');
const backButton = document.querySelector('.back-button');
const modalInput = document.getElementById('registerEmail');
const modalButton = document.querySelector('.modal-button');
const validationMessage = document.querySelector('.email-validation-message');
const modalLink = document.querySelector('.modal-link');

// Get all step elements
const emailStep = document.getElementById('emailStep');
const passwordStep = document.getElementById('passwordStep');
const birthdayStep = document.getElementById('birthdayStep');
const usernameStep = document.getElementById('usernameStep');

// Get form elements
const registerEmail = document.getElementById('registerEmail');
const registerPassword = document.getElementById('registerPassword');
const registerBirthday = document.getElementById('registerBirthday');
const registerUsername = document.getElementById('registerUsername');

// Get validation messages
const emailValidationMessage = document.querySelector('.email-validation-message');
const passwordValidationMessage = document.querySelector('.password-validation-message');
const birthdayValidationMessage = document.querySelector('.birthday-validation-message');
const usernameValidationMessage = document.querySelector('.username-validation-message');

// Validation functions
function isValidBirthday(birthday) {
    if (!birthday) return false;
    const date = new Date(birthday);
    const today = new Date();
    const minAge = 13;
    const minDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    return date <= minDate;
}

// Show/Hide Modal functions
function showModal() {
    registrationModal.style.display = 'flex';
    setTimeout(() => {
        registrationModal.classList.add('show');
    }, 10);
    registerEmail.focus();
}

function hideModal() {
    registrationModal.classList.remove('show');
    setTimeout(() => {
        registrationModal.style.display = 'none';
        // Reset all form fields
        registerEmail.value = '';
        registerPassword.value = '';
        registerBirthday.value = '';
        registerUsername.value = '';
        
        // Reset all validation messages
        emailValidationMessage.textContent = '';
        emailValidationMessage.classList.remove('show');
        passwordValidationMessage.textContent = '';
        passwordValidationMessage.classList.remove('show');
        birthdayValidationMessage.textContent = '';
        birthdayValidationMessage.classList.remove('show');
        usernameValidationMessage.textContent = '';
        usernameValidationMessage.classList.remove('show');
        
        // Disable all next buttons
        document.querySelectorAll('.modal-button').forEach(btn => btn.disabled = true);
        
        // Reset to email step
        showEmailStep();
    }, 300);
}

// Step navigation functions
function showEmailStep() {
    emailStep.classList.add('active');
    passwordStep.classList.remove('active');
    birthdayStep.classList.remove('active');
    usernameStep.classList.remove('active');
    registerEmail.focus();
}

function showPasswordStep() {
    emailStep.classList.remove('active');
    passwordStep.classList.add('active');
    birthdayStep.classList.remove('active');
    usernameStep.classList.remove('active');
    registerPassword.focus();
}

function showBirthdayStep() {
    emailStep.classList.remove('active');
    passwordStep.classList.remove('active');
    birthdayStep.classList.add('active');
    usernameStep.classList.remove('active');
    registerBirthday.focus();
}

function showUsernameStep() {
    emailStep.classList.remove('active');
    passwordStep.classList.remove('active');
    birthdayStep.classList.remove('active');
    usernameStep.classList.add('active');
    registerUsername.focus();
}

// Event Listeners
createAccountButton.addEventListener('click', showModal);
backButton.addEventListener('click', hideModal);

// Email validation
registerEmail.addEventListener('input', (e) => {
    const email = e.target.value.trim();
    const nextButton = emailStep.querySelector('.modal-button');
    
    if (email.length === 0) {
        emailValidationMessage.textContent = '';
        emailValidationMessage.classList.remove('show');
        nextButton.disabled = true;
    } else if (!isValidEmail(email)) {
        emailValidationMessage.textContent = 'Por favor, insira um email válido';
        emailValidationMessage.classList.add('show');
        nextButton.disabled = true;
    } else {
        emailValidationMessage.textContent = '';
        emailValidationMessage.classList.remove('show');
        nextButton.disabled = false;
    }
});

// Password validation
registerPassword.addEventListener('input', (e) => {
    const password = e.target.value.trim();
    const nextButton = passwordStep.querySelector('.modal-button');
    
    if (password.length === 0) {
        passwordValidationMessage.textContent = '';
        passwordValidationMessage.classList.remove('show');
        nextButton.disabled = true;
    } else if (password.length < 8) {
        passwordValidationMessage.textContent = 'A senha deve ter pelo menos 8 caracteres';
        passwordValidationMessage.classList.add('show');
        nextButton.disabled = true;
    } else {
        passwordValidationMessage.textContent = '';
        passwordValidationMessage.classList.remove('show');
        nextButton.disabled = false;
    }
});

// Birthday validation
registerBirthday.addEventListener('change', (e) => {
    const birthday = e.target.value;
    const nextButton = birthdayStep.querySelector('.modal-button');
    const birthdayLabel = document.getElementById('birthdayLabel');
    
    if (!birthday) {
        birthdayValidationMessage.textContent = 'Por favor, selecione uma data';
        birthdayValidationMessage.classList.add('show');
        nextButton.disabled = true;
        birthdayLabel.textContent = 'Data de Nascimento (0 anos)';
    } else if (!isValidBirthday(birthday)) {
        birthdayValidationMessage.textContent = 'Você deve ter pelo menos 13 anos';
        birthdayValidationMessage.classList.add('show');
        nextButton.disabled = true;
        birthdayLabel.textContent = 'Data de Nascimento (0 anos)';
    } else {
        const today = new Date();
        const birthDate = new Date(birthday);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        birthdayLabel.textContent = `Data de Nascimento (${age} anos)`;
        birthdayValidationMessage.textContent = '';
        birthdayValidationMessage.classList.remove('show');
        nextButton.disabled = false;
    }
});

// Username validation
registerUsername.addEventListener('input', (e) => {
    const username = e.target.value.trim();
    const createButton = usernameStep.querySelector('.modal-button');
    
    if (username.length === 0) {
        usernameValidationMessage.textContent = '';
        usernameValidationMessage.classList.remove('show');
        createButton.disabled = true;
    } else if (!isValidUsername(username)) {
        usernameValidationMessage.textContent = 'Nome de usuário inválido (3-20 caracteres, apenas letras, números, . e _)';
        usernameValidationMessage.classList.add('show');
        createButton.disabled = true;
    } else {
        usernameValidationMessage.textContent = '';
        usernameValidationMessage.classList.remove('show');
        createButton.disabled = false;
    }
});

// Step navigation buttons
emailStep.querySelector('.modal-button').addEventListener('click', showPasswordStep);
passwordStep.querySelector('.modal-button').addEventListener('click', showBirthdayStep);
birthdayStep.querySelector('.modal-button').addEventListener('click', showUsernameStep);

// Back buttons
document.querySelectorAll('.modal-link').forEach(button => {
    button.addEventListener('click', () => {
        const currentStep = button.closest('.modal-step');
        if (currentStep.id === 'passwordStep') {
            showEmailStep();
        } else if (currentStep.id === 'birthdayStep') {
            showPasswordStep();
        } else if (currentStep.id === 'usernameStep') {
            showBirthdayStep();
        } else {
            hideModal();
        }
    });
});

// Create account
usernameStep.querySelector('.modal-button').addEventListener('click', async () => {
    const email = registerEmail.value.trim();
    const password = registerPassword.value.trim();
    const birthday = registerBirthday.value;
    const username = registerUsername.value.trim();
    
    if (isValidEmail(email) && password.length >= 8 && isValidBirthday(birthday) && isValidUsername(username)) {
        try {
            const createButton = usernameStep.querySelector('.modal-button');
            createButton.disabled = true;
            createButton.textContent = 'Aguarde...';
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            hideModal();
            showAlert('Sucesso', 'Sua conta foi criada com sucesso!');
        } catch (error) {
            showAlert('Erro', 'Não foi possível completar o cadastro. Tente novamente.');
        } finally {
            const createButton = usernameStep.querySelector('.modal-button');
            createButton.disabled = false;
            createButton.textContent = 'Criar conta';
        }
    }
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker registrado com sucesso!'))
        .catch((error) => console.log('Erro ao registrar Service Worker:', error));
}