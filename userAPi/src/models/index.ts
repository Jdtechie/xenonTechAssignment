import { User, sequelize, QueryTypes, Op, fn, col } from "./user";
import Avatar from "./avatar";
export { User, sequelize, QueryTypes, Op, fn, col, Avatar };

User.hasOne(Avatar, { foreignKey: "userId", as: "userMedia" });
