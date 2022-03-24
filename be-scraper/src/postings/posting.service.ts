import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import fetch from 'node-fetch';
import { CreatePosting } from 'src/dto/create-posting';
import { Repository } from 'typeorm';
import { Posting } from './posting.entity';

@Injectable()
export class PostingService {
  constructor(
    @InjectRepository(Posting)
    private scraperRepository: Repository<Posting>,
  ) {}

  async getPostingById(id: number): Promise<Posting> {
    return await this.scraperRepository.findOneOrFail(id);
  }

  async getPostings(): Promise<Posting[]> {
    if ((await this.scraperRepository.count()) === 0) {
      console.log('DB empty, scraping and populating');
      await this.insertQueriedPostings();
    }
    console.log('DB populated, serving from there');
    return await this.scraperRepository.find();
  }

  private async insertQueriedPostings() {
    const scrapedJobs: CreatePosting[] = await this.queryPostings();

    scrapedJobs.forEach(async (scrapedData) => {
      const newScrapedData = this.scraperRepository.create(scrapedData);
      await this.scraperRepository.save(newScrapedData);
    });
    return this.scraperRepository.find();
  }

  private async queryPostings(): Promise<CreatePosting[]> {
    const URL2 =
      'https://api.eu.lever.co/v0/postings/leverdemo?limit=20&mode=json';
    const response = await fetch(URL2);
    const data = await response.json();
    const adjustedPostings: CreatePosting[] = data.map((responsePosting) => {
      const posting: CreatePosting = {
        title: responsePosting.text,
        location: responsePosting.categories.location ?? 'N/A',
        description: responsePosting.descriptionPlain,
        applyButtonUrl: responsePosting.applyUrl,
      };
      return posting;
    });
    return adjustedPostings;
  }
}
