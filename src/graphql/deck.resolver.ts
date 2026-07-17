import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { DeckService } from '../deck/deck.service';
import { Card, SortResult } from './deck.types';

@Resolver()
export class DeckResolver {
    constructor(private readonly deckService: DeckService) {}

    @Query(() => [Card])
    async deck(): Promise<Card[]> {
        return this.deckService.getDeck();
    }

    @Mutation(() => [Card])
    async shuffleDeck(): Promise<Card[]> {
        return this.deckService.shuffleDeck();
    }

    @Mutation(() => SortResult)
    async sortDeck(): Promise<SortResult> {
        const result = this.deckService.sortDeck();
        return {
            deck: result.deck,
            algorithmUsed: result.algorithmUsed,
        };
    }

    @Mutation(() => [Card])
    async resetDeck(): Promise<Card[]> {
        this.deckService.resetDeck();
        return this.deckService.getDeck();
    }
}