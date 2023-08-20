const User = require("../../../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

module.exports = {
  Query: {
    getProfile: async (_, args, { userId }) => {
      try {
        if (userId) {
          const findUser = await User.findById(userId);
          return findUser;
        } else {
          throw new Error("Unauthorized!");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    register: async (_, { newUser }) => {
      try {
        const { name, email, password } = newUser;
        if (!name || !email || !password) {
          throw new Error("Missing fields!");
        } else if (password.length < 6) {
          throw new Error("Password must be 6 character long!");
        } else {
          const findUser = await User.findOne({ email: email });
          if (findUser) {
            throw new Error("Email already exist!");
          } else {
            const hashPassword = await bcrypt.hash(password, 12);
            const createUser = new User({
              name,
              email,
              password: hashPassword,
            });
            const createdUser = await createUser.save();
            return createdUser;
          }
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    login: async (_, { loginUser }) => {
      try {
        const { email, password } = loginUser;
        if (!email || !password) {
          throw new Error("Missing fields!");
        } else {
          const findUser = await User.findOne({ email: email });
          if (findUser) {
            const isMatch = await bcrypt.compare(password, findUser.password);
            if (isMatch) {
              const token = jwt.sign(findUser.id, secret);
              return {
                token: token,
              };
            } else {
              throw new Error("Invalid credentials");
            }
          }
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
