module.exports = `
type Query{
    getProfile:User
}

type User {
    _id:ID!
    name:String
    email:String
    password:String
}

type Token{
    token:String
}

type Mutation {
    register(newUser:registerInput!): User
    login(loginUser:loginInput!): Token
}

input registerInput {
    name:String
    email:String
    password:String
}

input loginInput {
    email:String
    password:String
}

`;
