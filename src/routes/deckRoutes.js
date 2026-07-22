const express = require('express');
const router = express.Router();
const deckController = require('../controllers/deckController');  

// GET current deck
router.get('/', deckController.getDeck);

// POST shuffle deck
router.post('/shuffle', deckController.shuffleDeck);

// POST sort deck (uses random sorting method)
router.post('/sort', deckController.sortDeck);

// POST reset deck
router.post('/reset', deckController.resetDeck);

module.exports = router;