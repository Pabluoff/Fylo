// Form validation and submission
const loginForm = document.getElementById('loginForm');
const emailInput = document.querySelector('input[type="text"]');
const passwordInput = document.querySelector('input[type="password"]');

// Create notification container
const notificationContainer = document.createElement('div');
notificationContainer.className = 'notification-container';
document.body.appendChild(notificationContainer);

function showNotification(message, type) {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 500);
  });
  
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  
  // Add icon based on notification type
  const icon = document.createElement('div');
  icon.className = 'notification-icon';
  if (type === 'success') {
      icon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
      `;
  } else if (type === 'error') {
      icon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12" y2="16"></line>
          </svg>
      `;
  } else {
      icon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="8"></line>
          </svg>
      `;
  }
  
  notification.appendChild(icon);
  notification.appendChild(document.createTextNode(message));
  
  notificationContainer.appendChild(notification);
  
  // Force reflow to ensure animation plays
  notification.offsetHeight;
  
  // Animate in
  requestAnimationFrame(() => {
      notification.classList.add('show');
  });
  
  // Add haptic feedback if available
  if ('vibrate' in navigator) {
      navigator.vibrate(40);
  }
  
  // Remove after delay
  setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 500);
  }, 4000);
}

// Email clear button functionality
const emailInputGroup = emailInput.parentElement;
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

emailInput.addEventListener('input', () => {
    clearButton.style.display = emailInput.value ? 'block' : 'none';
});

clearButton.addEventListener('click', (event) => {
    event.preventDefault();
    emailInput.value = '';
    clearButton.style.display = 'none';
    emailInput.focus();
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

// Form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    // Validation
    if (!email || !password) {
        showNotification('Por favor, preencha todos os campos', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Por favor, insira um email válido', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('A senha deve ter pelo menos 6 caracteres', 'error');
        return;
    }
    
    try {
        // Simulate API call - Replace with your actual authentication logic
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo purposes - replace with actual credentials check
        if (email === 'demo@example.com' && password === 'password123') {
            showNotification('Login realizado com sucesso!', 'success');
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1000);
        } else {
            showNotification('Credenciais inválidas', 'error');
        }
    } catch (error) {
        showNotification('Erro ao fazer login. Tente novamente.', 'error');
    }
});

// Email validation helper
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log('Service Worker registrado com sucesso!'))
      .catch((error) => console.log('Erro ao registrar Service Worker:', error));
  }