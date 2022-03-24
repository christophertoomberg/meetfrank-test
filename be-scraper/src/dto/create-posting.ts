import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePosting {
  @Field()
  title: string;

  @Field()
  location: string;

  @Field()
  description: string;

  @Field()
  applyButtonUrl: string;
}
