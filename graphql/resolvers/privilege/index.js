const User = require("../../../models/userSchema");
const Privilege = require("../../../models/privilegeSchema");

module.exports = {
  Query: {
    getPrivileges: async (_, args, { userId }) => {
      try {
        if (userId) {
          const findPrivileges = await Privilege.find();
          return findPrivileges;
        } else {
          throw new Error("Unauthorized!");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    getPrivilegeById: async (_, { id }, { userId }) => {
      try {
        if (userId) {
          const findPrivilege = await Privilege.findById(id);
          return findPrivilege;
        } else {
          throw new Error("Unauthorized!");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    addPrivilege: async (_, { newPrivilege }, { userId }) => {
      try {
        if (userId) {
          const { menuName, subMenuName } = newPrivilege;
          const findPrivilege = await Privilege.findOne({
            $and: [{ menuName: menuName }, { subMenuName: subMenuName }],
          });
          if (findPrivilege) {
            throw new Error("Privilege already exist!");
          } else {
            const findUser = await User.findById(userId);
            const newPriv = new Privilege({
              menuName,
              subMenuName,
              createdBy: findUser.name,
              modifiedBy: findUser.name,
            });
            const privilege = await newPriv.save();
            return privilege;
          }
        } else {
          throw new Error("Unauthorized!");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    updatePrivilege: async (_, { id, upPrivilege }, { userId }) => {
      try {
        if (userId) {
          const { menuName, subMenuName } = upPrivilege;
          const findUser = await User.findById(userId);
          const privilege = await Privilege.findByIdAndUpdate(
            id,
            {
              menuName: menuName,
              subMenuName: subMenuName,
              modifiedBy: findUser.name,
            },
            { new: true }
          );
          return privilege;
        } else {
          throw new Error("Unauthorized!");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    deletePrivilege: async (_, { id }, { userId }) => {
      try {
        if (userId) {
          await Privilege.findByIdAndDelete(id);
          return { msg: "Privilege Deleted" };
        } else {
          throw new Error("Unauthorized!");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
