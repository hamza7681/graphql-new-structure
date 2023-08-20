const { mergeTypeDefs } = require("@graphql-tools/merge");
const user = require("./user/index");

const typeDefs = [user];

module.exports = mergeTypeDefs(typeDefs);
