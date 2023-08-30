const mongoose = require("mongoose");

const rolePrivilegeSchema = new mongoose.Schema(
  {
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "role",
      required: true,
    },
    privileges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "privilege",
        required: true,
      },
    ],
    createdBy: {
      type: String,
      required: true,
    },
    modifiedBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("rolePrivilege", rolePrivilegeSchema);
