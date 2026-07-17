import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Card {
    @Field()
    suit: string;

    @Field()
    value: string;

    @Field(() => Int)
    weight: number;
}

@ObjectType()
export class SortResult {
    @Field(() => [Card])
    deck: Card[];

    @Field()
    algorithmUsed: string;
}