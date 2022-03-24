import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posting } from './posting.entity';
import { PostingResolver } from './posting.resolver';
import { PostingService } from './posting.service';

@Module({
  imports: [TypeOrmModule.forFeature([Posting])],
  providers: [PostingService, PostingResolver],
})
export class PostingModule {}
