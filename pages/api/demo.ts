import { ApolloServer } from '@jaymun723/apollo-server-vercel';
import cloudinary from "cloudinary";

// Construct a schema, using GraphQL schema language
const typeDefs = `
  type Query {
    hello: String
  },
  type Mutation {
    upload(file: Upload!): String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello momen 🤷‍♀️'
  },
  Mutation: {
    upload: (_parent: any, { file }: any) => {
      console.log("Will upload file");
      file.then((file: any) => {
        //Contents of Upload scalar: https://github.com/jaydenseric/graphql-upload#class-graphqlupload
        //file.createReadStream() is a readable node stream that contains the contents of the uploaded file
        //node stream api: https://nodejs.org/api/stream.html
        console.log(file);
      });
      cloudinary.v2.config({
        api_key: "329246125839327",
        api_secret: "2pj_OP9d_GTj6xNh0ZYc_9vXjoA",
        cloud_name: "mellw"
      })
      cloudinary.v2.uploader.upload(
        "https://cdn.ssrn.com/ssrn-global-header/11589acb53bc518aa22929bf19add113.svg",
        { public_id: 'sample_remote' },
        function (_: any, result: any) {
          console.log(result)
        }
      );
      cloudinary.v2.url("sample_remote.jpg")
      return 'Ok !';
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,

  // By default, the GraphQL Playground interface and GraphQL introspection
  // is disabled in "production" (i.e. when `process.env.NODE_ENV` is `production`).
  //
  // If you'd like to have GraphQL Playground and introspection enabled in production,
  // the `playground` and `introspection` options must be set explicitly to `true`.
  playground: true,
  introspection: true,
});


export default server.createHandler({
  cors: {
    origin: '*',
  },
});
