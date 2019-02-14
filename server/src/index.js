// see following for inspiration:
// https://www.apollographql.com/docs/apollo-server/essentials/server.html

const {GraphQLServer} = require('graphql-yoga')
const {prisma} = require('./generated/prisma-client')

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Song = require('./resolvers/Song')

const resolvers = {
    Query,
    Mutation,
    User,
    Song
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request,
            prisma,
        }
    },
})

server.start(() => console.log('Server is running on http://localhost:4000'))
