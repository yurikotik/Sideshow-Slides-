/**
 * Voice Synthesis - TTS Integration for Rob's Chaotic Commentary
 * Handles text-to-speech with personality modulation and chaos effects
 */

class VoiceSynthesizer {
    constructor() {
        this.isSupported = 'speechSynthesis' in window;
        this.isEnabled = false;
        this.currentVoice = null;
        this.voices = [];
        this.robVoiceSettings = {
            rate: 1.2,
            pitch: 1.1,
            volume: 0.8,
            chaosModulation: true
        };
        this.speechQueue = [];
        this.isPlaying = false;
        
        this.initializeVoices();
    }

    // Initialize voice synthesis
    initializeVoices() {
        if (!this.isSupported) {
            console.warn('🔇 Speech synthesis not supported in this browser');
            return;
        }

        // Load voices (may need to wait for voices to load)
        const loadVoices = () => {
            this.voices = speechSynthesis.getVoices();
            this.selectRobVoice();
        };

        // Voices might load asynchronously
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = loadVoices;
        }
        
        loadVoices();
    }

    selectRobVoice() {
        if (this.voices.length === 0) return;

        // Prefer English voices with character
        const preferredVoices = [
            'Google UK English Male',
            'Microsoft David - English (United States)',
            'Alex',
            'Daniel',
            'Fred'
        ];

        for (const voiceName of preferredVoices) {
            const voice = this.voices.find(v => v.name.includes(voiceName));
            if (voice) {
                this.currentVoice = voice;
                console.log(`🎭 Rob's voice selected: ${voice.name}`);
                return;
            }
        }

        // Fallback to first English voice
        const englishVoice = this.voices.find(v => v.lang.startsWith('en'));
        if (englishVoice) {
            this.currentVoice = englishVoice;
            console.log(`🎭 Rob's fallback voice: ${englishVoice.name}`);
        }
    }

    // Enable/disable TTS
    enable() {
        if (!this.isSupported) {
            console.warn('🔇 Cannot enable TTS - not supported');
            return false;
        }
        
        this.isEnabled = true;
        console.log('🔊 Rob\'s voice synthesis enabled');
        return true;
    }

    disable() {
        this.isEnabled = false;
        this.stopSpeaking();
        console.log('🔇 Rob\'s voice synthesis disabled');
    }

    // Main speech method
    speak(text, options = {}) {
        if (!this.isEnabled || !this.isSupported || !text) {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            const utterance = this.createUtterance(text, options);
            
            utterance.onend = () => {
                this.isPlaying = false;
                this.processQueue();
                resolve();
            };
            
            utterance.onerror = (error) => {
                console.error('🚨 TTS Error:', error);
                this.isPlaying = false;
                this.processQueue();
                reject(error);
            };

            if (this.isPlaying) {
                this.speechQueue.push(utterance);
            } else {
                this.isPlaying = true;
                speechSynthesis.speak(utterance);
            }
        });
    }

    createUtterance(text, options = {}) {
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Apply Rob's voice settings
        utterance.voice = this.currentVoice;
        utterance.rate = this.calculateRate(options);
        utterance.pitch = this.calculatePitch(options);
        utterance.volume = this.calculateVolume(options);
        
        return utterance;
    }

    // Chaos-influenced voice modulation
    calculateRate(options) {
        let rate = options.rate || this.robVoiceSettings.rate;
        
        if (this.robVoiceSettings.chaosModulation && typeof Rob !== 'undefined') {
            const chaosLevel = Rob.chaosLevel || 0;
            const moodModifier = this.getMoodRateModifier(Rob.currentMood);
            
            // Chaos makes speech more erratic
            rate *= (1 + (chaosLevel * 0.5 * (Math.random() - 0.5)));
            rate *= moodModifier;
        }
        
        return Math.max(0.1, Math.min(10, rate));
    }

    calculatePitch(options) {
        let pitch = options.pitch || this.robVoiceSettings.pitch;
        
        if (this.robVoiceSettings.chaosModulation && typeof Rob !== 'undefined') {
            const chaosLevel = Rob.chaosLevel || 0;
            const moodModifier = this.getMoodPitchModifier(Rob.currentMood);
            
            // Chaos affects pitch variation
            pitch *= (1 + (chaosLevel * 0.3 * (Math.random() - 0.5)));
            pitch *= moodModifier;
        }
        
        return Math.max(0, Math.min(2, pitch));
    }

    calculateVolume(options) {
        let volume = options.volume || this.robVoiceSettings.volume;
        
        if (this.robVoiceSettings.chaosModulation && typeof Rob !== 'undefined') {
            const moodModifier = this.getMoodVolumeModifier(Rob.currentMood);
            volume *= moodModifier;
        }
        
        return Math.max(0, Math.min(1, volume));
    }

    // Mood-based voice modifiers
    getMoodRateModifier(mood) {
        const modifiers = {
            confident: 1.0,
            panicking: 1.4,
            confused: 0.8,
            excited: 1.3
        };
        return modifiers[mood] || 1.0;
    }

    getMoodPitchModifier(mood) {
        const modifiers = {
            confident: 1.0,
            panicking: 1.2,
            confused: 0.9,
            excited: 1.15
        };
        return modifiers[mood] || 1.0;
    }

    getMoodVolumeModifier(mood) {
        const modifiers = {
            confident: 1.0,
            panicking: 1.1,
            confused: 0.9,
            excited: 1.05
        };
        return modifiers[mood] || 1.0;
    }

    // Queue management
    processQueue() {
        if (this.speechQueue.length > 0 && !this.isPlaying) {
            const nextUtterance = this.speechQueue.shift();
            this.isPlaying = true;
            speechSynthesis.speak(nextUtterance);
        }
    }

    // Control methods
    stopSpeaking() {
        speechSynthesis.cancel();
        this.speechQueue = [];
        this.isPlaying = false;
    }

    pauseSpeaking() {
        if (speechSynthesis.speaking) {
            speechSynthesis.pause();
        }
    }

    resumeSpeaking() {
        if (speechSynthesis.paused) {
            speechSynthesis.resume();
        }
    }

    // Rob-specific speech methods
    speakSlideContent(slide) {
        if (!slide || !slide.voiceText) return Promise.resolve();
        
        const text = this.addRobPersonality(slide.voiceText, slide.robMood);
        return this.speak(text, {
            mood: slide.robMood,
            chaosLevel: slide.chaosLevel
        });
    }

    addRobPersonality(text, mood = 'confident') {
        // Add Rob's verbal tics and personality
        const personalityAdditions = {
            confident: ['Obviously,', 'Trust me,', 'Clearly,'],
            panicking: ['Oh no!', 'Wait, wait!', 'This is bad!'],
            confused: ['Hmm,', 'Let me think...', 'Actually,'],
            excited: ['WOW!', 'AMAZING!', 'INCREDIBLE!']
        };

        const additions = personalityAdditions[mood] || personalityAdditions.confident;
        const addition = additions[Math.floor(Math.random() * additions.length)];
        
        // Sometimes add banana references
        const bananaChance = 0.3;
        const bananaAddition = Math.random() < bananaChance ? ' Also, bananas!' : '';
        
        return `${addition} ${text}${bananaAddition}`;
    }

    // Chaos speech effects
    speakWithChaosEffect(text, chaosLevel = 0.5) {
        if (chaosLevel < 0.3) {
            return this.speak(text);
        }

        // Break text into chunks for chaotic delivery
        const chunks = this.chunkText(text, chaosLevel);
        
        return chunks.reduce((promise, chunk, index) => {
            return promise.then(() => {
                const delay = Math.random() * chaosLevel * 1000;
                return new Promise(resolve => {
                    setTimeout(() => {
                        this.speak(chunk).then(resolve);
                    }, delay);
                });
            });
        }, Promise.resolve());
    }

    chunkText(text, chaosLevel) {
        if (chaosLevel < 0.5) {
            return [text];
        }

        // Split text more aggressively with higher chaos
        const sentences = text.split(/[.!?]+/).filter(s => s.trim());
        
        if (chaosLevel > 0.7) {
            // Split sentences into smaller chunks
            return sentences.flatMap(sentence => {
                const words = sentence.trim().split(' ');
                const chunkSize = Math.max(2, Math.floor(words.length / (chaosLevel * 3)));
                const chunks = [];
                
                for (let i = 0; i < words.length; i += chunkSize) {
                    chunks.push(words.slice(i, i + chunkSize).join(' '));
                }
                
                return chunks;
            });
        }
        
        return sentences;
    }

    // Voice settings management
    updateVoiceSettings(settings) {
        this.robVoiceSettings = { ...this.robVoiceSettings, ...settings };
    }

    getVoiceSettings() {
        return { ...this.robVoiceSettings };
    }

    // Utility methods
    getAvailableVoices() {
        return this.voices.map(voice => ({
            name: voice.name,
            lang: voice.lang,
            isDefault: voice.default
        }));
    }

    setVoice(voiceName) {
        const voice = this.voices.find(v => v.name === voiceName);
        if (voice) {
            this.currentVoice = voice;
            console.log(`🎭 Rob's voice changed to: ${voice.name}`);
            return true;
        }
        return false;
    }

    getStatus() {
        return {
            isSupported: this.isSupported,
            isEnabled: this.isEnabled,
            isPlaying: this.isPlaying,
            queueLength: this.speechQueue.length,
            currentVoice: this.currentVoice?.name || 'None',
            settings: this.robVoiceSettings
        };
    }
}

// Global voice synthesizer instance
const RobVoice = new VoiceSynthesizer();

// Global functions for HTML integration
function enableRobVoice() {
    return RobVoice.enable();
}

function disableRobVoice() {
    RobVoice.disable();
}

function robSpeak(text, options = {}) {
    return RobVoice.speak(text, options);
}

function robSpeakSlide(slide) {
    return RobVoice.speakSlideContent(slide);
}

function stopRobSpeaking() {
    RobVoice.stopSpeaking();
}

// Auto-enable on load if supported
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        // Wait a bit for voices to load
        setTimeout(() => {
            RobVoice.enable();
        }, 1000);
    });
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VoiceSynthesizer, RobVoice };
}