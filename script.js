// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.9)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Mobile menu functionality
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

mobileMenuButton.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    body.style.overflow = navLinks.classList.contains('show') ? 'hidden' : '';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuButton.contains(e.target)) {
        navLinks.classList.remove('show');
        body.style.overflow = '';
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('show');
        body.style.overflow = '';
    });
});

// Close mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('show');
        body.style.overflow = '';
    }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic validation
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        if (!name || !email || !message) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.innerHTML = '<i class="fas fa-check"></i> Enviado!';
            contactForm.reset();
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        }, 1500);
    });
}

// Scroll animations
const scrollElements = document.querySelectorAll('.scroll-animate, .scale-animate, .rotate-animate');

const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= 
        ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
    );
};

const displayScrollElement = (element) => {
    element.classList.add('active');
};

const hideScrollElement = (element) => {
    element.classList.remove('active');
};

const handleScrollAnimation = () => {
    const elements = document.querySelectorAll('.scroll-animate');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        // Elemento está visível quando está entre 20% e 80% da altura da janela
        if (elementTop < windowHeight * 0.8 && elementBottom > windowHeight * 0.2) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('load', handleScrollAnimation);

// Touch-friendly hover effects for skill cards
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('touchstart', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('touchend', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Visitor Counter
let visitorCount = localStorage.getItem('visitorCount') || 0;
visitorCount = parseInt(visitorCount) + 1;
localStorage.setItem('visitorCount', visitorCount);
document.getElementById('visitorCount').textContent = visitorCount;

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Typing Animation
const typingText = document.querySelector('.typing-text');
const text = typingText.textContent;
typingText.textContent = '';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

typeWriter();

// Chat Functionality
const chatWidget = document.getElementById('chatWidget');
const chatToggle = document.getElementById('chatToggle');
const chatContainer = document.querySelector('.chat-container');
const closeChat = document.getElementById('closeChat');
const messageInput = document.getElementById('messageInput');
const sendMessage = document.getElementById('sendMessage');
const chatMessages = document.getElementById('chatMessages');
const chatBadge = document.querySelector('.chat-badge');

// Toggle chat visibility
chatToggle.addEventListener('click', () => {
    chatContainer.classList.add('active');
    chatBadge.style.display = 'none';
});

closeChat.addEventListener('click', () => {
    chatContainer.classList.remove('active');
});

// Send message
function sendMessageHandler() {
    const message = messageInput.value.trim();
    if (message) {
        // Add user message
        addMessage(message, 'user');
        
        // Clear input
        messageInput.value = '';
        
        // Simulate system response
        setTimeout(() => {
            const responses = [
                "Obrigado pela sua mensagem! Vou responder em breve.",
                "Entendi! Como posso ajudar você?",
                "Interessante! Me conte mais sobre isso.",
                "Vou analisar sua mensagem e retornar em breve."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse, 'system');
        }, 1000);
    }
}

// Add message to chat
function addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Event listeners for sending messages
sendMessage.addEventListener('click', sendMessageHandler);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessageHandler();
    }
}); 