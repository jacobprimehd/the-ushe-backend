exports.typeDefs = `

type Fav {
  _id: ID
  place: String!
  order: String!
  createdDate: String
  username: String
}

type User {
  _id: ID
  email: String! @unique
  password: String!
  username: String! @unique
  city: String!
  state: String!
  allergies: String
  bio: String
  joinDate: String
  favorites: [Fav]
}

type Query {
  getAllFavs: [Fav]
  getCurrentUser: User
  getUserFav(username: String!): [Fav]
  getUserInfo(username: String!): [User]
}

type Token {
  token: String!
}

type Mutation {
  addFav(place: String!, order: String!, username: String): Fav
  signinUser(username: String!, password: String!):Token
  signupUser(email: String!, password: String!, username: String!, city: String!, state: String!, allergies: String, bio: String): Token
}

`;
