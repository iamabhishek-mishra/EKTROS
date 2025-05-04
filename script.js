// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorTrail = document.querySelector('.cursor-trail');

document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
    setTimeout(() => {
        cursorTrail.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    }, 100);
});

// Particles.js Configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#00f2ff'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: true
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#00f2ff',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 1000);
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const icon = themeToggle.querySelector('i');

function setLightMode(isLight) {
    if (isLight) {
        document.body.classList.add('light-mode');
        document.documentElement.classList.add('light-mode');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        document.body.classList.remove('light-mode');
        document.documentElement.classList.remove('light-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// Initial state: dark mode
setLightMode(false);

themeToggle.addEventListener('click', () => {
    const isLight = !document.body.classList.contains('light-mode');
    setLightMode(isLight);
});

// Login Modal
const loginBtn = document.querySelector('.login-btn');
const loginModal = document.getElementById('login-modal');
const closeModal = document.querySelector('.close-modal');

loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
});

// Form Handling
const contactForm = document.getElementById('contact-form');
const loginForm = document.getElementById('login-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    try {
        // Replace with your actual email sending endpoint
        const response = await fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            alert('Message sent successfully!');
            contactForm.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        alert('Error sending message. Please try again later.');
        console.error('Error:', error);
    }
});

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData);
    
    try {
        // Replace with your actual login endpoint
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            const result = await response.json();
            // Handle successful login
            loginModal.style.display = 'none';
            // Update UI for logged-in state
        } else {
            throw new Error('Login failed');
        }
    } catch (error) {
        alert('Login failed. Please check your credentials.');
        console.error('Error:', error);
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.about-card, .service-card, .project-card').forEach(el => {
    observer.observe(el);
});

// Mobile Menu Toggle
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    const mobileMenu = document.createElement('div');
    mobileMenu.classList.add('mobile-menu');
    mobileMenu.innerHTML = nav.querySelector('.nav-links').innerHTML;
    
    nav.appendChild(mobileMenuBtn);
    document.body.appendChild(mobileMenu);
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
};

// Initialize mobile menu if screen width is small
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-btn')) {
        createMobileMenu();
    }
}); 