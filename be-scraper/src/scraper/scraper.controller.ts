import { Controller, Get } from '@nestjs/common';
import { ScrapedData } from './scrapedData.entity';
import { ScraperService } from './scraper.service';

@Controller('scraper')
export class ScraperController {
  constructor(private scraperService: ScraperService) {}

  @Get()
  async scrape(): Promise<ScrapedData[]> {
    return await this.scraperService.getScrapedJobs();
  }
}
