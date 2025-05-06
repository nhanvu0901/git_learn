document.addEventListener('DOMContentLoaded', () => {
    const nameElement = document.querySelector('.name');
    const cursor = document.querySelector('.cursor');
    const text = "Vu Trong Nhan";
    const colors = ['#64B5F6', '#81C784', '#FFD54F', '#4FC3F7', '#9575CD'];
    const particlesContainer = document.querySelector('.particles');
    
    // Initial delay before typing starts
    setTimeout(() => {
        typeText();
    }, 1200);
    
    // Typing animation
    function typeText() {
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                const char = document.createElement('span');
                char.className = 'char';
                char.textContent = text[i];
                nameElement.insertBefore(char, cursor);
                
                // Make character visible with slight delay for animation
                setTimeout(() => {
                    char.classList.add('visible');
                }, 50);
                
                i++;
            } else {
                clearInterval(typingInterval);
                
                // After typing is complete, add subtle color effect and particles
                setTimeout(() => {
                    startSubtleColorAnimation();
                    createParticles();
                }, 700);
                
                // Fade out cursor after typing
                setTimeout(() => {
                    cursor.style.opacity = 0;
                    setTimeout(() => {
                        cursor.style.display = 'none';
                    }, 500);
                }, 1200);
            }
        }, 120);
    }
    
    // Subtle color animation
    function startSubtleColorAnimation() {
        const chars = document.querySelectorAll('.char');
        
        chars.forEach((char, i) => {
            // Add slight glow effect to each character
            char.style.textShadow = '0 0 15px rgba(255, 255, 255, 0.6)';
            
            // Subtle color change on hover
            char.addEventListener('mouseover', () => {
                char.style.color = colors[i % colors.length];
                char.style.transform = 'translateY(-5px)';
                char.style.transition = 'transform 0.3s ease, color 0.3s ease';
            });
            
            char.addEventListener('mouseout', () => {
                char.style.color = '#fff';
                char.style.transform = 'translateY(0)';
            });
        });
    }
    
    // Create subtle floating particles
    function createParticles() {
        // Create initial particles
        for (let i = 0; i < 25; i++) {
            createParticle();
        }
        
        // Continue creating particles periodically at a slower rate
        setInterval(() => {
            for (let i = 0; i < 3; i++) {
                createParticle();
            }
        }, 2000);
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position and size (smaller particles)
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const size = Math.floor(Math.random() * 3) + 2;
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random animation duration and delay (slower for more subtle effect)
        const duration = Math.random() * 4 + 3;
        const delay = Math.random() * 1.5;
        
        particle.style.animation = `float ${duration}s ease-in ${delay}s forwards`;
        
        particlesContainer.appendChild(particle);
        
        // Remove particle when animation completes
        setTimeout(() => {
            particle.remove();
        }, (duration + delay) * 1000);
    }
    
    // Make animation responsive to window resizing
    window.addEventListener('resize', () => {
        // Adjust font size based on window width for responsiveness
        const fontSize = Math.min(window.innerWidth / 12, 72);
        nameElement.style.fontSize = `${fontSize}px`;
    });
    
    // Trigger resize once at start
    window.dispatchEvent(new Event('resize'));
});