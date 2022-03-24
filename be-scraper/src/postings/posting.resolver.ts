import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Posting } from './posting.entity';
import { PostingService } from './posting.service';

@Resolver(() => Posting)
export class PostingResolver {
  constructor(private postingService: PostingService) {}

  @Query(() => [Posting])
  async postings(): Promise<Posting[]> {
    return await this.postingService.getPostings();
  }

  @Query(() => Posting)
  async getPosting(@Args('id', { type: () => Int }) id: number) {
    return await this.postingService.getPostingById(id);
  }
}
