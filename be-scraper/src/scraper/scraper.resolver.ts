import { Query, Resolver } from '@nestjs/graphql';
import { ScrapedData } from './scrapedData.entity';
import { ScraperService } from './scraper.service';

@Resolver(() => ScrapedData)
export class ScraperResolver {
  constructor(private scraperService: ScraperService) {}

  @Query(() => [ScrapedData])
  async scrapedData(): Promise<ScrapedData[]> {
    return await this.scraperService.getScrapedJobs();
  }
}
