import {
  sequelize,
  DataTypes,
  QueryTypes,
} from "../helpers/common/sqlize.helper";
import { TABLES } from "../constant/response";
import { ModelsInterfaces } from "../interfaces/index";
import * as CM from "../constant/response";

const Avatar = sequelize.define<ModelsInterfaces.AVATAR>(
  TABLES.AVATAR,
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    toUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM({
        values: [CM.AVATAR_PIC_TYPE.PROFILE, CM.AVATAR_PIC_TYPE.MESSAGE],
      }),
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default Avatar;
