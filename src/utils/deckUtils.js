// Create a standard deck of 52 cards
const createDeck = () => {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const deck = [];

    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push({
                suit,
                rank,
                displayName: `${rank} of ${suit}`,
                value: getCardValue(rank)
            });
        }
    }
    return deck;
};

// Get card value for sorting
const getCardValue = (rank) => {
    const values = {
        'A': 14, 'K': 13, 'Q': 12, 'J': 11,
        '10': 10, '9': 9, '8': 8, '7': 7,
        '6': 6, '5': 5, '4': 4, '3': 3, '2': 2
    };
    return values[rank];
};

// Shuffle using Fisher-Yates algorithm
const shuffleDeck = (deck) => {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

// Sort methods
const sortBySuit = (deck) => {
    const suitOrder = { 'spades': 1, 'hearts': 2, 'diamonds': 3, 'clubs': 4 };
    return [...deck].sort((a, b) => {
        if (suitOrder[a.suit] !== suitOrder[b.suit]) {
            return suitOrder[a.suit] - suitOrder[b.suit];
        }
        return a.value - b.value;
    });
};

const sortByRank = (deck) => {
    return [...deck].sort((a, b) => a.value - b.value);
};

// Randomly select sorting method
const getRandomSortMethod = () => {
    const methods = ['suit', 'rank'];
    const randomIndex = Math.floor(Math.random() * methods.length);
    return methods[randomIndex];
};

module.exports = {
    createDeck,
    shuffleDeck,
    sortBySuit,
    sortByRank,
    getRandomSortMethod
};