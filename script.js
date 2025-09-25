// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Change icon based on menu state
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
    
    // Form Validation
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Validate KLU email format
            if (!validateKLUEmail(email)) {
                alert('Please enter a valid KLU email address (format: xxxxxxxxxx@kluniversity.in)');
                return;
            }
            
            // Regular user login
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Set logged in user
                localStorage.setItem('currentUser', JSON.stringify(user));
                alert('Login successful! Welcome back, ' + user.name);
                window.location.href = 'index.html';
            } else {
                alert('Invalid email or password. Please try again or register if you don\'t have an account.');
            }
        });
    }
    
    // Admin login link
    const adminLoginLink = document.getElementById('adminLoginLink');
    if (adminLoginLink) {
        adminLoginLink.addEventListener('click', function(e) {
            // Just let the link redirect to admin.html
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
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
                alert('Please enter a valid KLU email address (format: xxxxxxxxxx@kluniversity.in)');
                return;
            }
            
            // Check if passwords match
            if (password !== confirmPassword) {
                alert('Passwords do not match. Please try again.');
                return;
            }
            
            // Check if user already exists
            const users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.some(user => user.email === email)) {
                alert('An account with this email already exists. Please login instead.');
                loginToggle.click();
                return;
            }
            
            // Add new user
            const newUser = {
                name,
                regNumber,
                dept,
                section,
                email,
                password,
                activities: [],
                events: []
            };
            
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            // Set as current user
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            
            alert('Registration successful! Welcome to KLU Extracurricular Activities Platform.');
            window.location.href = 'index.html';
        });
    }
    
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const loginBtn = document.querySelector('.login-btn');
    
    if (currentUser && loginBtn) {
        loginBtn.textContent = 'My Account';
        // You can add more personalization here based on logged in user
    }
});

// Helper Functions
function validateKLUEmail(email) {
    const regex = /^\d{10}@kluniversity\.in$/;
    return regex.test(email);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animation on scroll (simple implementation)
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.activity-card, .event-card, .about-content');
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // If element is in viewport
        if (position.top < window.innerHeight && position.bottom >= 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Initialize elements with animation
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.activity-card, .event-card, .about-content');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger initial animation
    setTimeout(function() {
        window.dispatchEvent(new Event('scroll'));
    }, 100);
});