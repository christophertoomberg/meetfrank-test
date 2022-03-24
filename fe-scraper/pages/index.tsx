import { gql } from '@apollo/client'
import client from '../lib/apollo-client'
import { IScrapedJob } from '../models/scrapedJob.model'
import styles from '../styles/Home.module.css'

function Home(scrapedJobs: any) {
  const data: IScrapedJob[] = scrapedJobs.scrapedJobs;

  return (
      <div className={styles.grid}>
        {data.map((scrapedJob: IScrapedJob) => (
          <div key={scrapedJob.id} className={styles.card}>
            <p>{scrapedJob.title}</p>
            <p>{scrapedJob.location}</p>
            <a target={'_blank'} rel={'noreferrer'} href={scrapedJob.applyButtonUrl}>Apply</a>
          </div>
        ))}
      </div>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query ScrapedDataQuery {
        scrapedData {
          id,
          title,
          location,
          applyButtonUrl
        }
      }
    `,
  });


  return {
    props: {
      scrapedJobs: data.scrapedData,
    },
  };
}
export default Home
