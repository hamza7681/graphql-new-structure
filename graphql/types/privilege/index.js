module.exports = `
type Query {
getPrivileges:[Privilege]
getPrivilegeById(id:ID!):Privilege
}

type Privilege {
    _id:ID!
    menuName:String
    subMenuName:String
    createdBy:String
    modifiedBy:String
}

type SuccessMessage {
    msg:String
}

type Mutation {
    addPrivilege(newPrivilege:PrivilegeInput!):Privilege
    updatePrivilege(id:ID!,upPrivilege:PrivilegeInput!):Privilege
    deletePrivilege(id:ID!):SuccessMessage
}

input PrivilegeInput {
    menuName:String
    subMenuName:String
}

`;
