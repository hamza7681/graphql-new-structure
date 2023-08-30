module.exports = `
type Query {
    getRoles:[Role]
    getRoleById(id:ID!):Role
}

type Role {
    _id:ID!
    name:String
    createdBy:String
    modifiedBy:String
}

type SuccessMessage {
    msg:String
}

type Mutation {
    addRole(newRole:RoleInput!):Role
    updateRole(id:ID!,upRole:UpdateInput):Role
    deleteRole(id:ID!): SuccessMessage
}

input RoleInput {
    name:String
}

input UpdateInput {
    name:String
}

`;
