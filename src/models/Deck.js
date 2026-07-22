const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
    cards: [{
        suit: {
            type: String,
            required: true,
            enum: ['hearts', 'diamonds', 'clubs', 'spades']
        },
        rank: {
            type: String,
            required: true,
            enum: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
        },
        displayName: {
            type: String,
            required: true
        },
        value: {
            type: Number,
            required: true,
            min: 2,
            max: 14
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp on save
deckSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Add an index for faster queries
deckSchema.index({ createdAt: -1 });

// Virtual property to get card count
deckSchema.virtual('cardCount').get(function () {
    return this.cards.length;
});

// Method to check if deck is complete (52 cards)
deckSchema.methods.isComplete = function () {
    return this.cards.length === 52;
};

// Static method to create a new deck
deckSchema.statics.createNewDeck = async function (cards) {
    const deck = new this({ cards });
    return await deck.save();
};

// Enable virtuals when converting to JSON
deckSchema.set('toJSON', { virtuals: true });
deckSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Deck', deckSchema);