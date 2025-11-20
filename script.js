// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initBalloons();
    initFloatingElements();
    initScrollAnimations();
    initLetter();
    initCake();
    initMusic();
    
    // Start initial celebration
    setTimeout(() => {
        createConfetti(50);
    }, 1000);
});

// Navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const exploreBtn = document.querySelector('.explore-btn');

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Explore button handler
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            document.getElementById('wishes').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Balloons
function initBalloons() {
    const container = document.querySelector('.hero-animation');
    const balloonColors = ['🎈', '🎈', '🎈', '🎈', '🎈', '🎈', '🎈'];
    
    // Create balloons
    for (let i = 0; i < 25; i++) {
        createBalloon(container, balloonColors, i);
    }
}

function createBalloon(container, balloonColors, index) {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    
    // Random properties
    const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
    const left = Math.random() * 100;
    const size = Math.random() * 2 + 1;
    const delay = Math.random() * 15;
    const duration = Math.random() * 10 + 15;
    
    balloon.innerHTML = color;
    balloon.style.left = `${left}vw`;
    balloon.style.fontSize = `${size}rem`;
    balloon.style.animationDelay = `${delay}s`;
    balloon.style.animationDuration = `${duration}s`;
    
    container.appendChild(balloon);
}

// Floating Elements
function initFloatingElements() {
    const container = document.querySelector('.floating-elements');
    
    // Create floating elements
    for (let i = 0; i < 30; i++) {
        createFloatingElement(container);
    }
}

function createFloatingElement(container) {
    const element = document.createElement('div');
    element.classList.add('floating-element');
    
    // Randomly choose element type
    const type = Math.random();
    if (type < 0.6) {
        element.classList.add('petal');
        element.style.left = Math.random() * 100 + 'vw';
        element.style.animationDelay = Math.random() * 15 + 's';
        element.style.opacity = Math.random() * 0.7 + 0.3;
        element.style.transform = `rotate(${Math.random() * 360}deg)`;
    } else if (type < 0.9) {
        element.classList.add('sparkle');
        element.style.left = Math.random() * 100 + 'vw';
        element.style.animationDelay = Math.random() * 5 + 's';
        element.style.opacity = Math.random() * 0.7 + 0.3;
    } else {
        element.classList.add('heart');
        element.innerHTML = '<i class="fas fa-heart"></i>';
        element.style.left = Math.random() * 100 + 'vw';
        element.style.animationDelay = Math.random() * 12 + 's';
        element.style.opacity = Math.random() * 0.7 + 0.3;
        element.style.color = `hsl(${Math.random() * 360}, 100%, 65%)`;
    }
    
    container.appendChild(element);
}

// Scroll Animations
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    const wishCards = document.querySelectorAll('.wish-card');
    const blessingCards = document.querySelectorAll('.blessing-card');
    const futureCards = document.querySelectorAll('.future-card');
    
    // Intersection Observer for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Special animations for specific sections
                if (entry.target.id === 'wishes') {
                    animateElements(wishCards, 0.1);
                } else if (entry.target.id === 'blessings') {
                    animateElements(blessingCards, 0.1);
                } else if (entry.target.id === 'future') {
                    animateElements(futureCards, 0.1);
                }
            }
        });
    }, { threshold: 0.2 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Animate elements with delays
    function animateElements(elements, delayIncrement) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.animation = `fadeIn 1s ease forwards`;
            }, index * delayIncrement * 1000);
        });
    }
}

// Letter
function initLetter() {
    const envelope = document.getElementById('envelope');
    const letterContent = document.getElementById('letter-content');
    
    if (!envelope) return;
    
    envelope.addEventListener('click', function() {
        this.classList.toggle('open');
        
        // Show letter content when opening
        if (this.classList.contains('open')) {
            setTimeout(() => {
                letterContent.classList.add('show');
                createConfetti(30);
                createFloatingHearts(15);
            }, 500);
        } else {
            letterContent.classList.remove('show');
        }
    });
}

// Cake
function initCake() {
    const blowBtn = document.getElementById('blow-btn');
    const flame = document.getElementById('flame');
    const wishMessage = document.getElementById('wish-message');
    
    if (!blowBtn || !flame) return;
    
    let blown = false;
    
    blowBtn.addEventListener('click', function() {
        if (blown) return;
        
        // Add blow animation to button
        this.style.animation = 'blowAnimation 0.5s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
        
        // Blow out candle
        setTimeout(() => {
            flame.classList.add('out');
        }, 300);
        
        // Show wish message after a delay
        setTimeout(() => {
            wishMessage.classList.add('show');
            createConfetti(60);
            createFloatingWishes();
            createFloatingHearts(20);
        }, 800);
        
        blown = true;
        
        // Change button text and style
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-check"></i> Wish Made!';
            this.style.background = 'var(--accent)';
            this.style.color = 'var(--white)';
            this.disabled = true;
        }, 1000);
    });
}

// Create floating wishes text
function createFloatingWishes() {
    const container = document.querySelector('.floating-elements');
    const wishes = ['Happy Birthday!', 'Make a Wish!', 'You\'re Amazing!', 'Param Mitra!', 'Shruti! 💝', 'Divine Blessings!'];
    
    wishes.forEach((wish, index) => {
        setTimeout(() => {
            const wishElement = document.createElement('div');
            wishElement.classList.add('floating-wish');
            wishElement.textContent = wish;
            wishElement.style.position = 'fixed';
            wishElement.style.left = Math.random() * 70 + 15 + 'vw';
            wishElement.style.top = '100vh';
            wishElement.style.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
            wishElement.style.fontSize = (Math.random() * 25 + 25) + 'px';
            wishElement.style.fontWeight = 'bold';
            wishElement.style.fontFamily = "'Playfair Display', serif";
            wishElement.style.zIndex = '1000';
            wishElement.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3)';
            wishElement.style.animation = `floatWish ${Math.random() * 3 + 4}s ease-in forwards`;
            
            container.appendChild(wishElement);
            
            // Remove after animation
            setTimeout(() => {
                wishElement.remove();
            }, 5000);
        }, index * 500);
    });
}

// Create floating hearts
function createFloatingHearts(count) {
    const container = document.querySelector('.floating-elements');
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.innerHTML = '💖';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '100vh';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            heart.style.zIndex = '1000';
            heart.style.animation = `floatHearts ${Math.random() * 3 + 4}s ease-in forwards`;
            
            container.appendChild(heart);
            
            // Remove after animation
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, i * 200);
    }
}

// Music
function initMusic() {
    const musicToggle = document.getElementById('music-toggle');
    const music = document.getElementById('bg-music');
    
    if (!musicToggle || !music) return;
    
    let isPlaying = false;
    
    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            music.pause();
            this.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            music.play().catch(e => {
                console.log('Auto-play prevented:', e);
                // Show play button to indicate user interaction needed
                this.innerHTML = '<i class="fas fa-play"></i>';
            });
            this.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
        isPlaying = !isPlaying;
    });
}

// Confetti Effect
function createConfetti(count) {
    const container = document.querySelector('.floating-elements');
    
    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-piece');
        
        // Random properties
        const colors = ['#FF6B9D', '#FFC7DC', '#F1E6FF', '#FFFFFF', '#4ECDC4', '#FFD700', '#FFA500'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 15 + 10;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 3 + 2;
        const shape = Math.random() > 0.5 ? 'circle' : 'rectangle';
        
        confetti.style.position = 'fixed';
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = color;
        confetti.style.left = `${left}vw`;
        confetti.style.top = '-20px';
        confetti.style.borderRadius = shape === 'circle' ? '50%' : '2px';
        confetti.style.zIndex = '1000';
        confetti.style.animation = `confettiFall ${animationDuration}s linear forwards`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        container.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.remove();
            }
        }, animationDuration * 1000);
    }
}

// Add scroll trigger for additional animations
window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Parallax effect for background elements
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrollY * speed}px)`;
    });
});

// Add the animation styles if not exists
if (!document.querySelector('#custom-animations')) {
    const style = document.createElement('style');
    style.id = 'custom-animations';
    style.textContent = `
        @keyframes confettiFall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
        @keyframes floatWish {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        .petal {
            width: 30px;
            height: 30px;
            background: var(--pink);
            border-radius: 50% 0 50% 50%;
            transform: rotate(45deg);
            animation: floatPetals 15s linear infinite;
        }
        .sparkle {
            width: 10px;
            height: 10px;
            background: var(--white);
            border-radius: 50%;
            animation: sparkle 5s linear infinite;
        }
        .heart {
            color: var(--accent);
            font-size: 1.5rem;
            animation: floatHearts 12s linear infinite;
        }
        @keyframes floatPetals {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
        @keyframes sparkle {
            0%, 100% {
                transform: scale(1);
                opacity: 0.7;
            }
            50% {
                transform: scale(1.5);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}
