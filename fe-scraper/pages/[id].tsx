import { gql } from "@apollo/client";
import PostingCardLarge from "../components/posting-card-large";
import client from "../lib/apollo-client";

export default function PostingDetails({ posting }: any) {

  return (
    <PostingCardLarge posting={posting}/>
  );
}


export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }: any) {

  const { data } = await client.query({
    query: gql`
        query GetPostingQuery {
          getPosting (id: ${params.id}){
            id,
            title,
            location,
            description,
            applyButtonUrl
          }
        }
      `,
  });

  const posting = data.getPosting;

  return {
    props: {
      posting,
    },
  };
}