# Card Shuffling and Sorting Application (MERN Stack)

A full-stack web application that allows users to shuffle and sort a deck of cards using the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- 🃏 Display a full deck of 52 playing cards
- 🔀 Shuffle the deck using Fisher-Yates algorithm
- 📊 Sort the deck using two different methods (by suit or by rank)
- 🎲 Random sorting method selection on each sort request
- 💾 Persistent deck state stored in MongoDB
- 🎨 Responsive UI built with React functional components

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library (functional components + hooks)
- **Axios** - HTTP client for API calls
- **CSS3** - Styling and responsive design

## Prerequisites

- Node.js (v14 or higher)
- Yarn (v1.22.22 or higher)
- MongoDB (local installation or MongoDB Atlas account)

## Installation

### Backend Setup

```bash
# Navigate to the backend directory
cd shuffle-api

# Install dependencies
yarn install

# Create .env file and add your MongoDB URI
echo "PORT=5000" > .env
echo "MONGODB_URI=mongodb://localhost:27017/card_deck" >> .env

# Start the backend server
yarn dev
```

## Testing the API with Postman

### Step 1: Start the backend server

```bash
# In your backend directory
yarn dev
```

You should see:
```
Server running on port 5001
MongoDB Connected: 127.0.0.1
```

### Step 2: Open Postman

Create a new collection called "Card Deck API" and add the following requests:

### Step 3: Testing in Sequence

Test the endpoints in this order to see the full flow:

#### 1. GET /api/deck - See initial deck

**Method:** `GET`  
**URL:** `http://localhost:5000/api/deck`

**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "suit": "hearts",
      "rank": "A",
      "displayName": "A of hearts",
      "value": 14
    }
  ],
  "deckId": "65a1b2c3d4e5f6g7h8i9j0k1"
}
```

#### 2. POST /api/deck/shuffle - Shuffle it

**Method:** `POST`  
**URL:** `http://localhost:5000/api/deck/shuffle`

**Expected Response:**
```json
{
  "success": true,
  "message": "Deck shuffled successfully",
  "data": [
    // ... 52 cards in random order
  ],
  "deckId": "65a1b2c3d4e5f6g7h8i9j0k1"
}
```

#### 3. GET /api/deck - See shuffled deck

**Method:** `GET`  
**URL:** `http://localhost:5000/api/deck`

**Expected Response:** The shuffled deck in random order

#### 4. POST /api/deck/sort - Sort it (method 1)

**Method:** `POST`  
**URL:** `http://localhost:5000/api/deck/sort`

**Expected Response:**
```json
{
  "success": true,
  "message": "Deck sorted by suit",
  "methodUsed": "suit",
  "data": [
    // ... cards sorted by suit (spades → hearts → diamonds → clubs)
  ],
  "deckId": "65a1b2c3d4e5f6g7h8i9j0k1"
}
```

#### 5. GET /api/deck - See sorted deck

**Method:** `GET`  
**URL:** `http://localhost:5000/api/deck`

**Expected Response:** The deck sorted by suit

#### 6. POST /api/deck/sort - Sort again (method 2)

**Method:** `POST`  
**URL:** `http://localhost:5000/api/deck/sort`

**Expected Response:**
```json
{
  "success": true,
  "message": "Deck sorted by rank",
  "methodUsed": "rank",
  "data": [
    // ... cards sorted by rank (A → K → Q → J → 10 → ... → 2)
  ],
  "deckId": "65a1b2c3d4e5f6g7h8i9j0k1"
}
```

#### 7. POST /api/deck/reset - Reset to original

**Method:** `POST`  
**URL:** `http://localhost:5000/api/deck/reset`

**Expected Response:**
```json
{
  "success": true,
  "message": "Deck reset to original order",
  "data": [
    // ... original deck order
  ],
  "deckId": "65a1b2c3d4e5f6g7h8i9j0k1"
}
```

### Testing with cURL (Alternative to Postman)

If you don't have Postman, you can test using cURL in your terminal:

```bash
# 1. Get current deck
curl http://localhost:5000/api/deck

# 2. Shuffle deck
curl -X POST http://localhost:5000/api/deck/shuffle

# 3. Sort deck (random method)
curl -X POST http://localhost:5000/api/deck/sort

# 4. Reset deck
curl -X POST http://localhost:5000/api/deck/reset
```

### Common Issues & Solutions

#### Error: ECONNREFUSED
```
Error: connect ECONNREFUSED 127.0.0.1:5000
```
**Solution:** Make sure your backend is running (`yarn dev`)

#### Error: MongoDB Connection Failed
```
Error: MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running:
```bash
# Start MongoDB (if installed locally)
mongod

# Or use MongoDB Atlas (cloud)
# Update your .env file with Atlas URI
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/deck` | Get current deck state |
| POST | `/api/deck/shuffle` | Shuffle the deck |
| POST | `/api/deck/sort` | Sort the deck (random method) |
| POST | `/api/deck/reset` | Reset deck to original order |

## Sorting Methods

The application uses two different sorting methods:
1. **Sort by Suit**: Orders cards by suit (spades → hearts → diamonds → clubs) then by rank
2. **Sort by Rank**: Orders cards by rank (A → K → Q → J → 10 → ... → 2)

Each time you click "Sort", a random sorting method is selected.

## Project Structure

```
shuffle-api/
├── src/
│   ├── config/
│   │   └── database.js      # MongoDB connection
│   ├── controllers/
│   │   └── deckController.js # Request handlers
│   ├── models/
│   │   └── Deck.js          # Deck schema
│   ├── routes/
│   │   └── deckRoutes.js    # API routes
│   ├── services/
│   │   └── deckService.js   # Business logic
│   ├── utils/
│   │   └── deckUtils.js     # Deck utilities (shuffle, sort)
│   └── server.js            # Entry point
├── .env                     # Environment variables
├── package.json             # Dependencies
└── yarn.lock
```

## Frontend Setup

```bash
# Navigate to the frontend directory
cd ../frontend

# Install dependencies
yarn install

# Start the React development server
yarn dev
```

## Running the Full Application

1. **Start MongoDB**:
   ```bash
   # For local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud)
   ```

2. **Start Backend**:
   ```bash
   cd shuffle-api
   yarn dev
   📍 Server running at: http://localhost:5001
   ```

## License

UNLICENSED - For assessment purposes only.

## Author

Thabang Gideon Magaola
