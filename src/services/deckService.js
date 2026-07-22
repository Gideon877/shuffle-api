const Deck = require('../models/Deck');  
const {
    createDeck,
    shuffleDeck,
    sortBySuit,
    sortByRank,
    getRandomSortMethod
} = require('../utils/deckUtils');  

// Initialize a new deck
const initializeDeck = async () => {
    try {
        // Clear existing deck
        await Deck.deleteMany({});

        const newDeck = new Deck({
            cards: createDeck()
        });

        await newDeck.save();
        return newDeck;
    } catch (error) {
        throw new Error(`Error initializing deck: ${error.message}`);
    }
};

// Get current deck
const getCurrentDeck = async () => {
    let deck = await Deck.findOne().sort({ createdAt: -1 });

    if (!deck) {
        deck = await initializeDeck();
    }

    return deck;
};

// Shuffle deck
const shuffleCurrentDeck = async () => {
    const deck = await getCurrentDeck();

    if (!deck) {
        throw new Error('No deck found');
    }

    deck.cards = shuffleDeck(deck.cards);
    await deck.save();

    return deck;
};

// Sort deck with random method
const sortCurrentDeck = async () => {
    const deck = await getCurrentDeck();

    if (!deck) {
        throw new Error('No deck found');
    }

    const sortMethod = getRandomSortMethod();
    let sortedCards;

    if (sortMethod === 'suit') {
        sortedCards = sortBySuit(deck.cards);
    } else {
        sortedCards = sortByRank(deck.cards);
    }

    deck.cards = sortedCards;
    await deck.save();

    return {
        deck,
        methodUsed: sortMethod
    };
};

module.exports = {
    initializeDeck,
    getCurrentDeck,
    shuffleCurrentDeck,
    sortCurrentDeck
};