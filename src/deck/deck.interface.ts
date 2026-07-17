export interface Card {
    suit: 'Spades' | 'Hearts' | 'Diamonds' | 'Clubs';
    value: string;
    weight: number;
}

export type Suit = Card['suit'];
export type CardValue = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';