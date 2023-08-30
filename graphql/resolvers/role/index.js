const Role = require("../../../models/roleSchema");
const User = require("../../../models/userSchema");

module.exports = {
  Query: {
    getRoles: async (_, args, { userId }) => {
      try {
        if (userId) {
          const findRoles = await Role.find();
          return findRoles;
        } else {
          throw new Error("Unauthorized!");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    getRoleById: async (_, { id }, { userId }) => {
      try {
        if (userId) {
          const findRole = await Role.findById(id);
          return findRole;
        } else {
          throw new Error("Unauthorized!");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    addRole: async (_, { newRole }, { userId }) => {
      try {
        if (userId) {
          const { name } = newRole;
          const findRole = await Role.findOne({ name: name });
          if (findRole) {
            throw new Error("Role already exist!");
          } else {
            const findUser = await User.findById(userId);
            const newRole = new Role({
              name,
              createdBy: findUser.name,
              modifiedBy: findUser.name,
            });
            const role = await newRole.save();
            return role;
          }
        } else {
          throw new Error("Unauthorized!");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    updateRole: async (_, { id, upRole }, { userId }) => {
      try {
        if (userId) {
          const { name } = upRole;
          const findUser = await User.findById(userId);
          const role = await Role.findByIdAndUpdate(
            id,
            {
              name: name,
              modifiedBy: findUser.name,
            },
            { new: true }
          );
          return role;
        } else {
          throw new Error("Unauthorized!");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteRole: async (_, { id }, { userId }) => {
      try {
        if (userId) {
          await Role.findByIdAndDelete(id);
          return { msg: "Role Deleted" };
        } else {
          throw new Error("Unauthorized!");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
