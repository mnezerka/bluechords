import gql from 'graphql-tag'

export const USER_QUERY = gql`
    query User($id: ID!) {
        user(id: $id) {
            id
            email
        }
    }
`

