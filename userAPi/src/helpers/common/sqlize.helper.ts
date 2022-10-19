import {
  Sequelize,
  DataTypes,
  QueryTypes,
  Op,
  Model,
  fn,
  col,
} from "sequelize";
const sequelize = new Sequelize(
  process.env.DBNAME,
  process.env.USER_NAME,
  process.env.PASSWORD,
  {
    dialect: "postgres",
    host: process.env.HOST_NAME,
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
    define: {
      //underscored:true,
      timestamps: true,
      freezeTableName: true, //use to stop pluralization of table name
    },
  }
);

sequelize.sync();

export { sequelize, DataTypes, QueryTypes, Op, Model, fn, col };
