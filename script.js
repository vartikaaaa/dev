// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// CTA buttons smooth scroll
document.querySelectorAll('.btn').forEach(btn => {
    if (btn.getAttribute('href').startsWith('#')) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
});

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTop');
const googleTribute = document.getElementById('googleTribute');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
        googleTribute.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
        googleTribute.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Google tribute click - opens Google
googleTribute.addEventListener('click', () => {
    window.open('https://www.google.com', '_blank');
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and timeline items
document.querySelectorAll('.about-card, .timeline-item, .skill-category, .project-card, .education-card, .contact-item, .snapshot-card, .fact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// active state to nav links on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.background = '';
        link.style.color = '';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.background = 'rgba(99, 102, 241, 0.2)';
            link.style.color = 'var(--primary)';
        }
    });
});

// Cursor trail effect
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Fun hover effect for emojis in tags
document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) rotate(5deg)';
    });
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// sparkle effect to skill tags on hover
document.querySelectorAll('.skill-tag, .tech-badge').forEach(badge => {
    badge.addEventListener('mouseenter', function() {
        this.style.fontWeight = '600';
    });
    badge.addEventListener('mouseleave', function() {
        this.style.fontWeight = '400';
    });
});

// Easter egg: Press 'g' key to show a fun message
let keySequence = '';
document.addEventListener('keydown', (e) => {
    keySequence += e.key.toLowerCase();
    if (keySequence.includes('google')) {
        const message = document.createElement('div');
        message.textContent = '🎉 You found the secret! Google really IS my best friend! 🔍';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            padding: 2rem 3rem;
            border-radius: 15px;
            font-size: 1.2rem;
            z-index: 9999;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            animation: fadeInUp 0.5s ease;
        `;
        document.body.appendChild(message);
        setTimeout(() => {
            message.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => message.remove(), 500);
        }, 3000);
        keySequence = '';
    }
    if (keySequence.length > 10) keySequence = keySequence.slice(-10);
});

// Fun fact cards
document.querySelectorAll('.fact-card').forEach(card => {
    card.addEventListener('click', function() {
        const colors = [
            'rgba(0, 212, 255, 0.15)',
            'rgba(255, 107, 157, 0.15)',
            'rgba(255, 214, 10, 0.15)',
            'rgba(123, 47, 247, 0.15)'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        this.style.background = randomColor;
        
        // Confetti effect
        const emoji = this.querySelector('.fact-emoji').textContent;
        createFloatingEmoji(emoji, this);
    });
});

// floating emoji effect
function createFloatingEmoji(emoji, element) {
    const rect = element.getBoundingClientRect();
    const floatingEmoji = document.createElement('div');
    floatingEmoji.textContent = emoji;
    floatingEmoji.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top + rect.height / 2}px;
        font-size: 2rem;
        pointer-events: none;
        z-index: 9999;
        animation: floatUp 1.5s ease-out forwards;
    `;
    document.body.appendChild(floatingEmoji);
    setTimeout(() => floatingEmoji.remove(), 1500);
}

// CSS animation for floating emoji
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(${Math.random() * 100 - 50}px, -100px) scale(1.5) rotate(${Math.random() * 360}deg);
        }
    }
`;
document.head.appendChild(style);

// Snapshot card click
document.querySelectorAll('.snapshot-card').forEach(card => {
    card.addEventListener('click', function() {
        const caption = this.querySelector('.snapshot-caption').textContent;
        const notification = document.createElement('div');
        notification.textContent = `📸 "${caption}" - Add your image here!`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--card-bg);
            border: 1px solid var(--primary);
            color: var(--text-light);
            padding: 1rem 1.5rem;
            border-radius: 10px;
            z-index: 9999;
            animation: slideIn 0.3s ease;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    });
});

// slide animations
const slideStyle = document.createElement('style');
slideStyle.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(slideStyle);