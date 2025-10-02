/**
 * Chaos Engine - Slide Randomizer and Transition Effects
 * Handles chaotic slide transitions, randomization, and visual effects
 */

class ChaosEngine {
    constructor() {
        this.isActive = false;
        this.chaosLevel = 0;
        this.transitionEffects = [
            'explode',
            'spiral',
            'banana-rain',
            'confetti-blast',
            'shake-and-bake',
            'rainbow-vomit',
            'glitch-matrix',
            'fruit-salad'
        ];
        this.activeEffects = [];
        this.chaosTimer = null;
        this.randomFactors = {
            marketVolatility: 0.5,
            bananaCoefficient: 0.8,
            clownLogic: 0.9,
            userPanic: 0.3
        };
    }

    // Main chaos activation
    activate() {
        this.isActive = true;
        this.chaosLevel = Math.random() * 0.5 + 0.5; // Start between 0.5-1.0
        this.startChaosLoop();
        this.triggerInitialChaos();
        
        console.log(`🌪️ CHAOS ENGINE ACTIVATED! Level: ${this.chaosLevel.toFixed(2)}`);
        return this.chaosLevel;
    }

    deactivate() {
        this.isActive = false;
        this.chaosLevel = 0;
        this.clearAllEffects();
        this.stopChaosLoop();
        
        console.log('😌 Chaos engine deactivated. Peace restored.');
    }

    // Chaos loop for continuous mayhem
    startChaosLoop() {
        if (this.chaosTimer) {
            clearInterval(this.chaosTimer);
        }

        this.chaosTimer = setInterval(() => {
            if (this.isActive) {
                this.updateChaosLevel();
                this.maybeTrigerRandomEffect();
                this.updateRandomFactors();
            }
        }, 2000 + Math.random() * 3000); // Random interval 2-5 seconds
    }

    stopChaosLoop() {
        if (this.chaosTimer) {
            clearInterval(this.chaosTimer);
            this.chaosTimer = null;
        }
    }

    updateChaosLevel() {
        // Chaos level fluctuates randomly
        const change = (Math.random() - 0.5) * 0.2;
        this.chaosLevel = Math.max(0.1, Math.min(1.0, this.chaosLevel + change));
        
        // Update Rob's chaos level if available
        if (typeof Rob !== 'undefined') {
            Rob.chaosLevel = this.chaosLevel;
        }
    }

    maybeTrigerRandomEffect() {
        const probability = this.chaosLevel * 0.3; // Higher chaos = more effects
        
        if (Math.random() < probability) {
            this.triggerRandomTransition();
        }
    }

    // Transition effects
    triggerRandomTransition() {
        const effect = this.transitionEffects[
            Math.floor(Math.random() * this.transitionEffects.length)
        ];
        
        this.executeTransition(effect);
    }

    executeTransition(effectName) {
        console.log(`🎪 Executing transition: ${effectName}`);
        
        switch (effectName) {
            case 'explode':
                this.explodeTransition();
                break;
            case 'spiral':
                this.spiralTransition();
                break;
            case 'banana-rain':
                this.bananaRainTransition();
                break;
            case 'confetti-blast':
                this.confettiBlastTransition();
                break;
            case 'shake-and-bake':
                this.shakeAndBakeTransition();
                break;
            case 'rainbow-vomit':
                this.rainbowVomitTransition();
                break;
            case 'glitch-matrix':
                this.glitchMatrixTransition();
                break;
            case 'fruit-salad':
                this.fruitSaladTransition();
                break;
            default:
                this.defaultChaosTransition();
        }
    }

    // Individual transition effects
    explodeTransition() {
        const slide = document.getElementById('currentSlide');
        if (!slide) return;

        slide.style.animation = 'explode 0.5s ease-out';
        
        // Create explosion particles
        for (let i = 0; i < 20; i++) {
            this.createParticle('💥', {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                duration: 1000 + Math.random() * 1000
            });
        }

        setTimeout(() => {
            slide.style.animation = '';
        }, 500);
    }

    spiralTransition() {
        const slide = document.getElementById('currentSlide');
        if (!slide) return;

        slide.style.animation = 'spiral 1s ease-in-out';
        
        setTimeout(() => {
            slide.style.animation = '';
        }, 1000);
    }

    bananaRainTransition() {
        const bananas = ['🍌', '🍌', '🍌', '🍌', '🍌'];
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                this.createParticle(bananas[Math.floor(Math.random() * bananas.length)], {
                    x: Math.random() * window.innerWidth,
                    y: -50,
                    duration: 3000,
                    gravity: true
                });
            }, i * 200);
        }
    }

    confettiBlastTransition() {
        const confetti = ['🎉', '🎊', '✨', '🌟', '💫', '🎈'];
        
        for (let i = 0; i < 30; i++) {
            this.createParticle(confetti[Math.floor(Math.random() * confetti.length)], {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                duration: 2000,
                spread: true
            });
        }
    }

    shakeAndBakeTransition() {
        document.body.style.animation = 'shake 0.5s infinite';
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }

    rainbowVomitTransition() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
        const originalBg = document.body.style.background;
        
        let colorIndex = 0;
        const colorInterval = setInterval(() => {
            document.body.style.background = colors[colorIndex % colors.length];
            colorIndex++;
        }, 100);
        
        setTimeout(() => {
            clearInterval(colorInterval);
            document.body.style.background = originalBg;
        }, 1500);
    }

    glitchMatrixTransition() {
        const slide = document.getElementById('currentSlide');
        if (!slide) return;

        slide.style.filter = 'hue-rotate(180deg) contrast(200%) brightness(150%)';
        slide.style.animation = 'glitch 0.1s infinite';
        
        setTimeout(() => {
            slide.style.filter = '';
            slide.style.animation = '';
        }, 1000);
    }

    fruitSaladTransition() {
        const fruits = ['🍎', '🍊', '🍋', '🍌', '🍇', '🍓', '🥝', '🍑'];
        
        for (let i = 0; i < 25; i++) {
            this.createParticle(fruits[Math.floor(Math.random() * fruits.length)], {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                duration: 2000,
                rotation: true
            });
        }
    }

    defaultChaosTransition() {
        const slide = document.getElementById('currentSlide');
        if (!slide) return;

        slide.style.transform = `rotate(${Math.random() * 20 - 10}deg) scale(${0.8 + Math.random() * 0.4})`;
        
        setTimeout(() => {
            slide.style.transform = '';
        }, 1000);
    }

    // Particle system
    createParticle(emoji, options = {}) {
        const particle = document.createElement('div');
        particle.textContent = emoji;
        particle.style.position = 'fixed';
        particle.style.fontSize = '2em';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.left = (options.x || 0) + 'px';
        particle.style.top = (options.y || 0) + 'px';
        
        document.body.appendChild(particle);
        
        // Animate particle
        this.animateParticle(particle, options);
        
        // Remove after duration
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, options.duration || 2000);
    }

    animateParticle(particle, options) {
        const startTime = Date.now();
        const duration = options.duration || 2000;
        const startX = parseFloat(particle.style.left);
        const startY = parseFloat(particle.style.top);
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            
            if (progress >= 1) return;
            
            let x = startX;
            let y = startY;
            
            if (options.gravity) {
                y = startY + (progress * window.innerHeight * 1.2);
                x = startX + Math.sin(progress * Math.PI * 2) * 50;
            } else if (options.spread) {
                const angle = Math.random() * Math.PI * 2;
                const distance = progress * 200;
                x = startX + Math.cos(angle) * distance;
                y = startY + Math.sin(angle) * distance;
            }
            
            if (options.rotation) {
                particle.style.transform = `rotate(${progress * 360 * 3}deg)`;
            }
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = 1 - progress;
            
            requestAnimationFrame(animate);
        };
        
        requestAnimationFrame(animate);
    }

    // Random factor management
    updateRandomFactors() {
        Object.keys(this.randomFactors).forEach(factor => {
            const change = (Math.random() - 0.5) * 0.1;
            this.randomFactors[factor] = Math.max(0, Math.min(1, 
                this.randomFactors[factor] + change
            ));
        });
    }

    getRandomFactor(factorName) {
        return this.randomFactors[factorName] || 0.5;
    }

    // Slide randomization
    randomizeSlideOrder(slides) {
        if (!this.isActive || this.chaosLevel < 0.3) {
            return slides;
        }
        
        const shuffled = [...slides];
        
        // Fisher-Yates shuffle with chaos influence
        for (let i = shuffled.length - 1; i > 0; i--) {
            if (Math.random() < this.chaosLevel * 0.5) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
        }
        
        return shuffled;
    }

    // Utility methods
    clearAllEffects() {
        this.activeEffects.forEach(effect => {
            if (effect.element && effect.element.parentNode) {
                effect.element.parentNode.removeChild(effect.element);
            }
        });
        this.activeEffects = [];
    }

    getChaosReport() {
        return {
            isActive: this.isActive,
            chaosLevel: this.chaosLevel,
            activeEffects: this.activeEffects.length,
            randomFactors: { ...this.randomFactors },
            availableTransitions: this.transitionEffects.length
        };
    }

    triggerInitialChaos() {
        // Initial chaos burst when activated
        setTimeout(() => this.triggerRandomTransition(), 500);
        setTimeout(() => this.triggerRandomTransition(), 1500);
    }
}

// CSS animations for transitions
const chaosStyles = `
@keyframes explode {
    0% { transform: scale(1); }
    50% { transform: scale(1.5) rotate(180deg); }
    100% { transform: scale(0) rotate(360deg); }
}

@keyframes spiral {
    0% { transform: rotate(0deg) scale(1); }
    50% { transform: rotate(180deg) scale(0.5); }
    100% { transform: rotate(360deg) scale(1); }
}

@keyframes glitch {
    0% { transform: translateX(0); }
    20% { transform: translateX(-2px); }
    40% { transform: translateX(2px); }
    60% { transform: translateX(-1px); }
    80% { transform: translateX(1px); }
    100% { transform: translateX(0); }
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
    20%, 40%, 60%, 80% { transform: translateX(2px); }
}
`;

// Inject chaos styles
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = chaosStyles;
    document.head.appendChild(styleSheet);
}

// Global chaos engine instance
const ChaosEngine_Instance = new ChaosEngine();

// Global functions for HTML integration
function startChaosEngine() {
    return ChaosEngine_Instance.activate();
}

function stopChaosEngine() {
    return ChaosEngine_Instance.deactivate();
}

function triggerChaosTransition() {
    if (ChaosEngine_Instance.isActive) {
        ChaosEngine_Instance.triggerRandomTransition();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ChaosEngine, ChaosEngine_Instance };
}