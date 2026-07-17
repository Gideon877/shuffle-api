// src/app.module.ts
import { Module } from '@nestjs/common';
import { DeckModule } from './deck/deck.module';
import { GraphQLModule } from './graphql/graphql.module';

@Module({
    imports: [DeckModule, GraphQLModule],
    controllers: [],
    providers: [],
})
export class AppModule {}