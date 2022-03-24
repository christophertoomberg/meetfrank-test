import { gql } from '@apollo/client'
import PostingCard from '../components/posting-card-small';
import client from '../lib/apollo-client'
import { IPosting } from '../models/posting.model'
import styles from '../styles/Home.module.css'

function Home({postings}: any) {

  return (
      <div className={styles.grid}>
        {postings.map((posting: IPosting) => (
          <PostingCard key={posting.id} posting={posting}/>
        ))}
      </div>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query PostingsQuery {
        postings {
          id,
          title,
          location,
          description,
          applyButtonUrl
        }
      }
    `,
  });


  const postings = data.postings;

  return {
    props: {
      postings,
    },
  };
}
export default Home
