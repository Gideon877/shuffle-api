// src/deck/deck.service.ts
import { Injectable } from '@nestjs/common';
import { Card } from '../graphql/deck.types';


@Injectable()
export class DeckService {
    private deck: Card[] = [];

    constructor() {
        this.initializeDeck();
    }

    private initializeDeck(): void {
        const suits: Card['suit'][] = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const weightMap: Record<string, number> = {
            '2': 2, '3': 3, '4': 4, '5': 5,
            '6': 6, '7': 7, '8': 8, '9': 9,
            '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
        };

        this.deck = [];
        for (const suit of suits) {
            for (const value of values) {
                this.deck.push({
                    suit,
                    value,
                    weight: weightMap[value],
                });
            }
        }
    }

    getDeck(): Card[] {
        return this.deck;
    }

    shuffleDeck(): Card[] {
        // Fisher-Yates shuffle
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
        return this.deck;
    }

    sortDeck(): { deck: Card[]; algorithmUsed: string } {
        const algorithms = ['Quick Sort', 'Bubble Sort'];
        const algorithmUsed = algorithms[Math.floor(Math.random() * algorithms.length)];

        if (algorithmUsed === 'Quick Sort') {
            this.quickSort(0, this.deck.length - 1);
        } else {
            this.bubbleSort();
        }

        return { deck: this.deck, algorithmUsed };
    }

    private quickSort(low: number, high: number): void {
        if (low < high) {
            const pi = this.partition(low, high);
            this.quickSort(low, pi - 1);
            this.quickSort(pi + 1, high);
        }
    }

    private partition(low: number, high: number): number {
        const pivot = this.deck[high].weight;
        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (this.deck[j].weight < pivot) {
                i++;
                [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
            }
        }
        [this.deck[i + 1], this.deck[high]] = [this.deck[high], this.deck[i + 1]];
        return i + 1;
    }

    private bubbleSort(): void {
        const n = this.deck.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (this.deck[j].weight > this.deck[j + 1].weight) {
                    [this.deck[j], this.deck[j + 1]] = [this.deck[j + 1], this.deck[j]];
                }
            }
        }
    }

    resetDeck(): void {
        this.initializeDeck();
    }
}