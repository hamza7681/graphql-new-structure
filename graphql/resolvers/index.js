const { mergeResolvers } = require("@graphql-tools/merge");
const user = require("./user/index");

const resolvers = [user];

module.exports = mergeResolvers(resolvers);
