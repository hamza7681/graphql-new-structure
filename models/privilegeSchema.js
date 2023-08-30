const mongoose = require("mongoose");

const privilegeSchema = new mongoose.Schema(
  {
    menuName: {
      type: String,
      required: true,
    },
    subMenuName: {
      type: String,
      required: true,
    },
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

module.exports = mongoose.model("privilege", privilegeSchema);
