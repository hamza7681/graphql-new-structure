module.exports = `
type Query {
    getRolePrivileges:[RolePrivilege]
    getRolePrivById(id:ID!):RolePrivilege
}

type RolePrivilege {
    _id:ID!
    role:Role
    privileges:[Privilege]
    createdBy:String
    modifiedBy:String
}

type Role {
    _id:ID!
    name:String
}

type Privilege {
    _id:ID!
    menuName:String
    subMenuName:String
}

type SuccessMessage {
    msg:String
}

type Mutation {
    addRolePrivilege(newRP:RPInput!):RolePrivilege
    updateRolePrivilege(id:ID!,upRP:RPInput!):RolePrivilege
    deleteRolePrivilege(id:ID!):SuccessMessage
}

input RPInput{
    role:String
    privileges:[String]
}

`;
