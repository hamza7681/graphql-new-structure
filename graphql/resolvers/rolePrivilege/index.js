const User = require("../../../models/userSchema");
const RolePrivilege = require("../../../models/rolePrivilegeSchema");

module.exports = {
  Query: {
    getRolePrivileges: async (_, args, { userId }) => {
      try {
        if (userId) {
          const findRolePrivileges = await RolePrivilege.find()
            .populate("role")
            .populate("privileges");
          return findRolePrivileges;
        } else {
          throw new Error("Unauthorized!");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    getRolePrivById: async (_, { id }, { userId }) => {
      try {
        if (userId) {
          const findRolePrivilege = await RolePrivilege.findById(id)
            .populate("role")
            .populate("privileges");
          return findRolePrivilege;
        } else {
          throw new Error("Unauthorized!");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    addRolePrivilege: async (_, { newRP }, { userId }) => {
      try {
        if (userId) {
          const { role, privileges } = newRP;
          const findUser = await User.findById(userId);
          const createRP = new RolePrivilege({
            role,
            privileges,
            createdBy: findUser.name,
            modifiedBy: findUser.name,
          });
          const rolePriv = await createRP.save();
          return rolePriv;
        } else {
          throw new Error("Unauthorized!");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    updateRolePrivilege: async (_, { id, upRP }, { userId }) => {
      try {
        if (userId) {
          const { role, privileges } = upRP;
          const findUser = await User.findById(userId);
          const RP = await RolePrivilege.findByIdAndUpdate(
            id,
            {
              role,
              privileges,
              modifiedBy: findUser.name,
            },
            { new: true }
          );
          return RP;
        } else {
          throw new Error("Unauthorized!");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteRolePrivilege: async (_, { id }, { userId }) => {
      try {
        if (userId) {
          await RolePrivilege.findByIdAndDelete(id);
          return { msg: "Role-Privilege Deleted" };
        } else {
          throw new Error("Unauthorized!");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
