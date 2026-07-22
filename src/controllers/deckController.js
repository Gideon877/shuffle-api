const deckService = require('../services/deckService');  

// Get current deck state
const getDeck = async (req, res) => {
    try {
        const deck = await deckService.getCurrentDeck();
        res.json({
            success: true,
            data: deck.cards,
            deckId: deck._id
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Shuffle deck
const shuffleDeck = async (req, res) => {
    try {
        const deck = await deckService.shuffleCurrentDeck();
        res.json({
            success: true,
            message: 'Deck shuffled successfully',
            data: deck.cards,
            deckId: deck._id
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Sort deck (uses random sorting method)
const sortDeck = async (req, res) => {
    try {
        const result = await deckService.sortCurrentDeck();
        res.json({
            success: true,
            message: `Deck sorted by ${result.methodUsed}`,
            methodUsed: result.methodUsed,
            data: result.deck.cards,
            deckId: result.deck._id
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Reset/initialize deck
const resetDeck = async (req, res) => {
    try {
        const deck = await deckService.initializeDeck();
        res.json({
            success: true,
            message: 'Deck reset to original order',
            data: deck.cards,
            deckId: deck._id
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getDeck,
    shuffleDeck,
    sortDeck,
    resetDeck
};