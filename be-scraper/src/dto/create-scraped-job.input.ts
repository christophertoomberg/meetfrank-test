import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateScrapedDataInput {
  @Field()
  title: string;

  @Field()
  location: string;

  @Field()
  applyJobUrl: string;
}
