# BlueChords Server

Implementation in nodejs based on GraphQL and Prisma


You can start server as:

```
nodejs src/index.js

```
Be aware that prisma container have to be started first and its url
(`http://localhost:4466`) must be reachable. GraphQL server listens on
`http://localhost:4000` and provides GraphQL UI interface.
