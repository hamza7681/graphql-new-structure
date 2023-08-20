const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const auth = ({ req }) => {
  const { authorization } = req.headers;
  if (authorization) {
    const userId = jwt.verify(authorization, SECRET);
    return { userId };
  }
};

module.exports = auth;
