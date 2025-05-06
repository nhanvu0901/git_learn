document.addEventListener('DOMContentLoaded', () => {
    const nameElement = document.querySelector('.name');
    const cursor = document.querySelector('.cursor');
    const text = "Vu Trong Nhan";
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F133FF', '#33FFF5', '#FFF833'];
    const particlesContainer = document.querySelector('.particles');
    
    // Initial delay before typing starts
    setTimeout(() => {
        typeText();
    }, 1000);
    
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
                // After typing is complete, start color animation
                setTimeout(() => {
                    startColorAnimation();
                    createParticles();
                }, 500);
                
                // Remove cursor after typing
                setTimeout(() => {
                    cursor.style.display = 'none';
                }, 1500);
            }
        }, 150);
    }
    
    // Color animation
    function startColorAnimation() {
        const chars = document.querySelectorAll('.char');
        let colorIndex = 0;
        
        setInterval(() => {
            chars.forEach((char, i) => {
                // Set a different color for each character with a slight delay
                setTimeout(() => {
                    char.style.color = colors[(colorIndex + i) % colors.length];
                    
                    // Add a slight bounce animation
                    char.style.transform = 'translateY(-10px)';
                    setTimeout(() => {
                        char.style.transform = 'translateY(0)';
                    }, 150);
                }, i * 50);
            });
            
            colorIndex = (colorIndex + 1) % colors.length;
        }, 2000);
    }
    
    // Create floating particles
    function createParticles() {
        for (let i = 0; i < 50; i++) {
            createParticle();
        }
        
        // Continue creating particles periodically
        setInterval(() => {
            for (let i = 0; i < 5; i++) {
                createParticle();
            }
        }, 1000);
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position, color, and size
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const size = Math.floor(Math.random() * 6) + 4;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        
        // Random animation duration and delay
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 2;
        
        particle.style.animation = `float ${duration}s linear ${delay}s forwards`;
        
        particlesContainer.appendChild(particle);
        
        // Remove particle when animation completes
        setTimeout(() => {
            particle.remove();
        }, (duration + delay) * 1000);
    }
    
    // Make animation responsive to window resizing
    window.addEventListener('resize', () => {
        // Adjust font size based on window width for responsiveness
        const fontSize = Math.min(window.innerWidth / 10, 80);
        nameElement.style.fontSize = `${fontSize}px`;
    });
    
    // Trigger resize once at start
    window.dispatchEvent(new Event('resize'));
});