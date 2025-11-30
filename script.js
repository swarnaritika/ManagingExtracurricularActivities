// Global variables to store the widget IDs
let loginCaptchaId;
let registerCaptchaId;

// This function matches the one in login.html
// It runs automatically when Google reCAPTCHA loads
window.onloadCallback = function() {
    // Render Login CAPTCHA and save the ID
    const loginDiv = document.getElementById('recaptcha-login');
    if (loginDiv) {
        loginCaptchaId = grecaptcha.render('recaptcha-login', {
            'sitekey' : '6Le7RBwsAAAAAlpEPqmUk2dQP_nzU5FhlNyiDxl4'
        });
    }
    
    // Render Register CAPTCHA and save the ID
    const registerDiv = document.getElementById('recaptcha-register');
    if (registerDiv) {
        registerCaptchaId = grecaptcha.render('recaptcha-register', {
            'sitekey' : '6Le7RBwsAAAAAlpEPqmUk2dQP_nzU5FhlNyiDxl4'
        });
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Login/Register Form Toggle
    const loginToggle = document.getElementById('login-toggle');
    const registerToggle = document.getElementById('register-toggle');
    const loginFormContainer = document.getElementById('login-form');
    const registerFormContainer = document.getElementById('register-form');
    
    if (loginToggle && registerToggle) {
        loginToggle.addEventListener('click', function() {
            loginToggle.classList.add('active');
            registerToggle.classList.remove('active');
            loginFormContainer.classList.remove('hidden');
            registerFormContainer.classList.add('hidden');
        });
        
        registerToggle.addEventListener('click', function() {
            registerToggle.classList.add('active');
            loginToggle.classList.remove('active');
            registerFormContainer.classList.remove('hidden');
            loginFormContainer.classList.add('hidden');
        });
    }
    
    // ---------------------------------------------
    // LOGIN FORM SUBMISSION
    // ---------------------------------------------
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            
            // 1. RECAPTCHA VALIDATION (Targeting specific widget)
            // We use the ID we saved earlier
            if (loginCaptchaId !== undefined) {
                const response = grecaptcha.getResponse(loginCaptchaId);
                if (response.length === 0) {
                    e.preventDefault();
                    alert("Please verify you are not a robot!");
                    return; 
                }
            }

            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Validate KLU email format
            if (!validateKLUEmail(email)) {
                alert('Please enter a valid KLU email address (format: xxxxxxxxxx@kluniversity.in)');
                return;
            }
            
            // Regular user login logic
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                alert('Login successful! Welcome back, ' + user.name);
                window.location.href = 'index.html';
            } else {
                alert('Invalid email or password. Please try again or register.');
            }
        });
    }
    
    // ---------------------------------------------
    // REGISTER FORM SUBMISSION
    // ---------------------------------------------
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            
            // 1. RECAPTCHA VALIDATION (Targeting specific widget)
            if (registerCaptchaId !== undefined) {
                const response = grecaptcha.getResponse(registerCaptchaId);
                if (response.length === 0) {
                    e.preventDefault();
                    alert("Please verify you are not a robot!");
                    return;
                }
            }

            e.preventDefault();
            
            const name = document.getElementById('registerName').value;
            const regNumber = document.getElementById('registerNumber').value;
            const dept = document.getElementById('registerDept').value;
            const section = document.getElementById('registerSection').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerConfirmPassword').value;
            
            // Validate KLU email format
            if (!validateKLUEmail(email)) {
                alert('Please enter a valid KLU email address');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }
            
            const users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.some(user => user.email === email)) {
                alert('An account with this email already exists.');
                loginToggle.click();
                return;
            }
            
            const newUser = {
                name, regNumber, dept, section, email, password,
                activities: [], events: []
            };
            
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            
            alert('Registration successful!');
            window.location.href = 'index.html';
        });
    }
    
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const loginBtn = document.querySelector('.login-btn');
    
    if (currentUser && loginBtn) {
        loginBtn.textContent = 'My Account';
    }
    
    // Link to admin page (if exists)
    const adminLoginLink = document.getElementById('adminLoginLink');
    if (adminLoginLink) {
        adminLoginLink.addEventListener('click', function(e) { });
    }
});

// Helper Functions
function validateKLUEmail(email) {
    const regex = /^\d{10}@kluniversity\.in$/;
    return regex.test(email);
}

// Visual Effects (Scroll Animations)
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.activity-card, .event-card, .about-content');
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight && position.bottom >= 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.activity-card, .event-card, .about-content');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    setTimeout(function() {
        window.dispatchEvent(new Event('scroll'));
    }, 100);
});