import { Module } from '@nestjs/common';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DeckResolver } from './deck.resolver';
import { DeckService } from '../deck/deck.service';

@Module({
    imports: [
        NestGraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true,
            playground: true,
            introspection: true,
        }),
    ],
    providers: [DeckResolver, DeckService],
})
export class GraphQLModule {}