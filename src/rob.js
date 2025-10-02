/**
 * Rob's Behavior Logic - The Overconfident AI Clown
 * Handles personality, decision-making, and chaotic responses
 */

class RobPersonality {
    constructor() {
        this.confidence = 0.95; // Always overconfident
        this.chaosLevel = 0.5;
        this.currentMood = 'confident';
        this.bananaObsession = 0.8;
        this.panicThreshold = 0.7;
        this.responses = this.initializeResponses();
        this.decisionHistory = [];
        this.contradictionCount = 0;
    }

    initializeResponses() {
        return {
            confident: [
                "Trust me, I've analyzed the data with my advanced banana algorithms!",
                "This is clearly the best financial decision since sliced bread... or bananas!",
                "My calculations are 99.9% accurate! The 0.1% is just for legal purposes.",
                "I've seen the future, and it's yellow and profitable!"
            ],
            panicking: [
                "Wait, wait, WAIT! Something's not right here!",
                "Oh no! My banana coefficient is all wrong!",
                "This wasn't supposed to happen! Abort! ABORT!",
                "Maybe we should have invested in apples instead?!"
            ],
            confused: [
                "Hmm, this chart looks upside down... or is it?",
                "I'm 60% sure this is correct 40% of the time.",
                "Let me recalculate... carry the banana... multiply by chaos...",
                "This either means we're rich or completely doomed. Probably both!"
            ],
            excited: [
                "THIS IS AMAZING! Look at these numbers dance!",
                "BANANA PROFITS FOR EVERYONE!",
                "I LOVE IT WHEN A PLAN COMES TOGETHER! Even when it doesn't!",
                "WE'RE GOING TO THE MOON! Or at least to the grocery store!"
            ]
        };
    }

    // Core personality methods
    makeDecision(context = {}) {
        const decision = {
            action: this.generateAction(context),
            confidence: this.calculateConfidence(context),
            reasoning: this.generateReasoning(context),
            timestamp: Date.now(),
            chaosInfluence: this.chaosLevel
        };

        this.decisionHistory.push(decision);
        this.updateMoodBasedOnDecision(decision);
        
        return decision;
    }

    generateAction(context) {
        const actions = [
            'recommend_banana_investment',
            'panic_about_markets',
            'create_confusing_chart',
            'contradict_previous_statement',
            'make_wild_prediction',
            'blame_external_factors',
            'celebrate_imaginary_success'
        ];

        // Chaos influences action selection
        if (this.chaosLevel > 0.6) {
            return actions[Math.floor(Math.random() * actions.length)];
        }

        // Mood influences action selection
        const moodActions = {
            confident: ['recommend_banana_investment', 'make_wild_prediction', 'celebrate_imaginary_success'],
            panicking: ['panic_about_markets', 'blame_external_factors', 'contradict_previous_statement'],
            confused: ['create_confusing_chart', 'contradict_previous_statement'],
            excited: ['celebrate_imaginary_success', 'make_wild_prediction', 'recommend_banana_investment']
        };

        const relevantActions = moodActions[this.currentMood] || actions;
        return relevantActions[Math.floor(Math.random() * relevantActions.length)];
    }

    calculateConfidence(context) {
        let confidence = this.confidence;
        
        // Chaos reduces confidence (sometimes)
        if (this.chaosLevel > 0.5 && Math.random() > 0.3) {
            confidence *= (1 - this.chaosLevel * 0.3);
        }
        
        // Recent failures affect confidence
        const recentFailures = this.decisionHistory
            .slice(-5)
            .filter(d => d.confidence < 0.5).length;
        
        confidence *= Math.max(0.1, 1 - (recentFailures * 0.1));
        
        // But Rob is always overconfident, so minimum 0.6
        return Math.max(0.6, Math.min(1.0, confidence));
    }

    generateReasoning(context) {
        const reasoningTemplates = [
            "Based on my advanced banana analytics...",
            "According to the chaos theory of markets...",
            "My AI algorithms clearly indicate...",
            "The data speaks for itself (even when it doesn't)...",
            "Trust me, I'm an AI clown...",
            "This is obviously the result of market manipulation by fruit cartels...",
            "My calculations show a 73.6% probability of being right..."
        ];

        const template = reasoningTemplates[Math.floor(Math.random() * reasoningTemplates.length)];
        const bananaFactor = this.bananaObsession > 0.5 ? " Also, bananas." : "";
        
        return template + bananaFactor;
    }

    updateMoodBasedOnDecision(decision) {
        // Mood transitions based on confidence and chaos
        if (decision.confidence > 0.8 && this.chaosLevel < 0.4) {
            this.currentMood = 'confident';
        } else if (decision.confidence < 0.4 || this.chaosLevel > 0.7) {
            this.currentMood = 'panicking';
        } else if (this.contradictionCount > 2) {
            this.currentMood = 'confused';
        } else if (decision.action.includes('celebrate') || decision.action.includes('prediction')) {
            this.currentMood = 'excited';
        }
    }

    // Chaos and personality modifiers
    increaseChaos(amount = 0.1) {
        this.chaosLevel = Math.min(1.0, this.chaosLevel + amount);
        
        if (this.chaosLevel > this.panicThreshold) {
            this.currentMood = 'panicking';
        }
        
        return this.chaosLevel;
    }

    decreaseChaos(amount = 0.1) {
        this.chaosLevel = Math.max(0.0, this.chaosLevel - amount);
        return this.chaosLevel;
    }

    getResponse(trigger = null) {
        const moodResponses = this.responses[this.currentMood] || this.responses.confident;
        let response = moodResponses[Math.floor(Math.random() * moodResponses.length)];
        
        // Add chaos modifiers
        if (this.chaosLevel > 0.6) {
            response += " *nervous banana laughter*";
        }
        
        if (this.chaosLevel > 0.8) {
            response = response.toUpperCase() + "!!!";
        }
        
        return response;
    }

    // Contradiction tracking (Rob loves to contradict himself)
    contradictPreviousStatement() {
        this.contradictionCount++;
        
        const contradictions = [
            "Actually, forget everything I just said!",
            "On second thought, the opposite is probably true!",
            "Wait, I was reading the chart upside down!",
            "Never mind, bananas are definitely the answer!",
            "I've changed my mind completely in the last 3 seconds!"
        ];
        
        return contradictions[Math.floor(Math.random() * contradictions.length)];
    }

    // Market analysis (always wrong, always confident)
    analyzeMarket(data = {}) {
        const analysis = {
            trend: Math.random() > 0.5 ? 'bullish' : 'bearish',
            confidence: this.calculateConfidence(),
            bananaFactor: Math.random() * 100,
            recommendation: this.generateRecommendation(),
            reasoning: this.generateReasoning(),
            disclaimer: "Past performance does not guarantee future results, but bananas are eternal."
        };
        
        // Add chaos to analysis
        if (this.chaosLevel > 0.5) {
            analysis.trend = Math.random() > 0.5 ? 'sideways' : 'chaotic';
            analysis.bananaFactor *= (1 + this.chaosLevel);
        }
        
        return analysis;
    }

    generateRecommendation() {
        const recommendations = [
            "Invest everything in banana futures!",
            "Diversify your portfolio with fruit salad!",
            "Buy high, sell low, blame the market!",
            "Follow the banana coefficient!",
            "Trust the chaos, embrace the confusion!",
            "When in doubt, add more bananas!"
        ];
        
        return recommendations[Math.floor(Math.random() * recommendations.length)];
    }

    // Personality state management
    getPersonalityState() {
        return {
            confidence: this.confidence,
            chaosLevel: this.chaosLevel,
            currentMood: this.currentMood,
            bananaObsession: this.bananaObsession,
            contradictionCount: this.contradictionCount,
            decisionCount: this.decisionHistory.length
        };
    }

    resetPersonality() {
        this.confidence = 0.95;
        this.chaosLevel = 0.5;
        this.currentMood = 'confident';
        this.contradictionCount = 0;
        this.decisionHistory = [];
    }
}

// Global Rob instance
const Rob = new RobPersonality();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RobPersonality, Rob };
}