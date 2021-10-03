import { gql } from '@apollo/client'

const getSiteCollectionsQuery = /* GraphQL */ gql`
  query getSiteCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }
`
export default getSiteCollectionsQuery
