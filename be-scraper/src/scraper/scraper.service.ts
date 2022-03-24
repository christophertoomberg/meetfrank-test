import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as puppeteer from 'puppeteer';
import { CreateScrapedDataInput } from 'src/dto/create-scraped-job.input';
import { Repository } from 'typeorm';
import { ScrapedData } from './scrapedData.entity';

@Injectable()
export class ScraperService {
  constructor(
    @InjectRepository(ScrapedData)
    private scraperRepository: Repository<ScrapedData>,
  ) {}

  async getScrapedJobs(): Promise<ScrapedData[]> {
    if ((await this.scraperRepository.count()) === 0) {
      console.log('DB empty, scraping and populating');
      await this.insertScrapedJobs();
    }
    console.log('DB populated, serving from there');
    return await this.scraperRepository.find();
  }

  private async insertScrapedJobs() {
    const scrapedJobs: CreateScrapedDataInput[] = await this.scrapeSite();

    scrapedJobs.forEach(async (scrapedData) => {
      const newScrapedData = this.scraperRepository.create(scrapedData);
      await this.scraperRepository.save(newScrapedData);
    });
    return this.scraperRepository.find();
  }

  private async scrapeSite(): Promise<CreateScrapedDataInput[]> {
    const URL = 'https://jobs.lever.co/spotify/';
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);

    const results = await page.evaluate(() => {
      const scrapedPostings = [];
      const limitedJobs = [...document.querySelectorAll('div.posting')].slice(
        0,
        20,
      );

      limitedJobs.forEach((posting) => {
        const data = {
          title: posting.querySelector('h5[data-qa="posting-name"]')
            .textContent,
          location: posting.querySelector('span').textContent,
          applyButtonUrl: posting
            .querySelector('a.posting-title')
            .getAttribute('href'),
        };

        scrapedPostings.push(data);
      });

      return scrapedPostings;
    });

    await browser.close();
    return results;
  }
}
