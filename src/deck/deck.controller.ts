import { Controller, Get, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { DeckService } from './deck.service';

@Controller('deck')
export class DeckController {
    constructor(private readonly deckService: DeckService) {}

    @Get()
    getDeck() {
        return { deck: this.deckService.getDeck() };
    }

    @Post('shuffle')
    @HttpCode(HttpStatus.OK)
    shuffleDeck() {
        return { deck: this.deckService.shuffleDeck() };
    }

    @Post('sort')
    @HttpCode(HttpStatus.OK)
    sortDeck() {
        return this.deckService.sortDeck();
    }

    @Post('reset')
    @HttpCode(HttpStatus.OK)
    resetDeck() {
        this.deckService.resetDeck();
        return { deck: this.deckService.getDeck() };
    }
}