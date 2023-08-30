const { mergeTypeDefs } = require("@graphql-tools/merge");
const user = require("./user/index");
const role = require("./role/index");
const privilege = require("./privilege/index");
const rolePrivilege = require("./rolePrivilege/index");

const typeDefs = [user, role, privilege, rolePrivilege];

module.exports = mergeTypeDefs(typeDefs);
