require("dotenv").config();
const express = require("express");
const { connectDB } = require("./connection/config");
// const port = process.env.PORT;
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const schema = require("./graphql");
const auth = require("./middlewares/auth.middleware");

connectDB();

const startServer = async () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  const server = new ApolloServer({
    schema: schema,
  });
  const { url } = await startStandaloneServer(server, {
    context: auth,
  });
  console.log(`Server running at: ${url}`);
};

startServer();
