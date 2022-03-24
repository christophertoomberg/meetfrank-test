import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScrapedData } from './scrapedData.entity';
import { ScraperController } from './scraper.controller';
import { ScraperResolver } from './scraper.resolver';
import { ScraperService } from './scraper.service';

@Module({
  imports: [TypeOrmModule.forFeature([ScrapedData])],
  providers: [ScraperService, ScraperResolver],
  controllers: [ScraperController],
})
export class ScraperModule {}
