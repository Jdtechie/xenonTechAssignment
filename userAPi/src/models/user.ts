import {
  sequelize,
  DataTypes,
  QueryTypes,
  Op,
  fn,
  col,
} from "../helpers/common/sqlize.helper";
import * as CM from "../constant/response";
import { TABLES } from "../constant/response";
import { ModelsInterfaces } from "../interfaces/index";
const User = sequelize.define<ModelsInterfaces.USER>(
  TABLES.USER,
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM({
        values: [CM.USER_ENUM.USER, CM.USER_ENUM.ADMIN],
      }),
      defaultValue: CM.USER_ENUM.USER,
    },
    status: {
      type: DataTypes.ENUM({
        values: [CM.USER_ENUM.ACTIVATED, CM.USER_ENUM.DEACTIVATED],
      }),
      defaultValue: CM.USER_ENUM.ACTIVATED,
    },
    randomString: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
  },
  { timestamps: true }
);


export { User, sequelize, QueryTypes, Op, fn, col };
