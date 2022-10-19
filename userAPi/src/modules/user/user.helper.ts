import * as Helpers from "../../helpers";
import * as CM from "../../constant/response";
const nodemailer = require("nodemailer");
import * as express from "express";
import * as Model from "../../models";
import * as UserInterface from "./user.interface";
const bcrypt = require("bcrypt");
import {
  GenericError,
  GenericRequestPusher,
} from "../../interfaces/responses.interface";
import e = require("express");
import moment = require("moment");

declare module "express" {
  interface Request {
    userInfo: GenericRequestPusher;
  }
}
class userHelper {
  //------------------------------- user api---------------------------------//
  registerUser = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const initTransaction = await Model.sequelize.transaction();
    try {
      const payload: UserInterface.ADD_NEW_USER_PAYLOAD = request.body;

      payload.email = payload.email.toLowerCase();
      payload.role = "user";
      payload.password = await bcrypt.hashSync(payload.password, 10);
      console.log("PAYLOADD::", payload);

      await Model.User.create(payload, {
        raw: true,
        transaction: initTransaction,
      })
        .then(async (result) => {
          if (result) {
            delete payload.password;

            const token = await this.sendToken(result.id);
            initTransaction.commit();
            request.body.result = {
              message: CM.MESSAGE_RESPONSE.REGISTER_SUCCESSFULLY,
              data: {
                token: token,
              },
            };

            next();
          }
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      console.log(`ERROR::`, error);
      await initTransaction.rollback();
      return Helpers.ResponseHelper.error400(response, { error: error });
    }
  };

  sendToken = async (id: Number) => {
    if (id) {
      const token = await Helpers.utilitiesHelper.generateJwt(String(id));
      console.log(token);
      return token;
    } else {
      return false;
    }
  };

  loginUser = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const payload: UserInterface.USER_LOGIN_PAYLOAD = request.body;
      console.log("payload body", payload);
      let userRow = await Model.User.findOne({
        where: { email: payload.email, role: "user" },
        raw: true,
      })
        .then(async (data) => {
          if (data) {
            if (data.status == CM.USER_ENUM.DEACTIVATED) {
              throw {
                field: "Accout Deactivated",
                message: CM.MESSAGE_RESPONSE.ACCOUNT_DEACTIVATED,
              };
            }
            const password = data.password;
            const valid = await bcrypt.compare(payload.password, password);
            if (valid) {
              const token = await Helpers.utilitiesHelper.generateJwt(
                String(data.id)
              );
              request.body.result = {
                message: CM.MESSAGE_RESPONSE.LOGIN_SUCCESSFULLY,
                data: {
                  token: token,
                  firstName: data.firstName,
                  lastName: data.lastName,
                  id: Number(data.id),
                },
              };
              next();
            } else {
              throw {
                field: "INCORRECT PASSWORD",
                message: CM.MESSAGE_RESPONSE.INCORRECT_PASSWORD,
              };
            }
          } else {
            throw {
              field: "INCORRECT DETAILS",
              message: CM.MESSAGE_RESPONSE.WROONG_INPUT,
            };
          }
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      console.log(`ERROR::`, error);
      return Helpers.ResponseHelper.error400(response, { error: error });
    }
  };

  getUserById = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const userId = Number(request.userInfo.jwtData);
      console.log(userId);
      await Model.User.findOne({
        where: { id: userId },
        include: [
          {
            model: Model.Avatar,
            as: "userMedia",
            attributes: ["picture"],
          },
        ],
        //raw: true,
      })
        .then((data) => {
          if (data) {
            console.log(data, "data:::::");
            delete data.password;
            delete data.randomString;

            request.body.result = {
              message: CM.MESSAGE_RESPONSE.RECORD_FOUND,
              data: data,
            };
            next();
          } else {
            throw {
              field: "Error::",
              message: CM.MESSAGE_RESPONSE.NO_RECORD_FOUND,
            };
          }
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      console.log(`ERROR::`, error);
      return Helpers.ResponseHelper.error400(response, { error: error });
    }
  };

  deleteUserById = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const initTransaction = await Model.sequelize.transaction();
    try {
      const payload = request.params;
      await Model.User.destroy({
        where: { id: payload.id, role: "user" },
        transaction: initTransaction,
      })
        .then((data) => {
          if (data) {
            initTransaction.commit();
            request.body.result = {
              message: CM.MESSAGE_RESPONSE.USER_DELETED,
              data: [],
            };

            next();
          } else {
            throw {
              field: "No RECORD",
              message: CM.MESSAGE_RESPONSE.NO_RECORD_FOUND,
            };
          }
        })
        .catch((error: GenericError) => {
          throw error;
        });
    } catch (error) {
      console.log(`ERROR::`, error);
      initTransaction.rollback();
      return Helpers.ResponseHelper.error400(response, { error: error });
    }
  };

  getSingleUser = async (search: object) => {
    try {
      const data = await Model.User.findOne({ where: search, raw: true });

      return data;
    } catch (error) {
      console.log(`ERROR::`, error);
      return;
    }
  };

  getAllUser = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const payload = request.params;
      const payloadBody: UserInterface.ALL_USER_SEARCH_FILTER_PAYLOAD =
        request.body;
      let wheres;

      console.log(payload, "palylaod:::", payloadBody, "paylaodbodyLLL::::::");
      const limits = Number(payload.limit)
        ? Number(payload.limit)
        : Number(CM.PAGINATION.LIMIT_VALUE);
      const offsets = Number(payload.offset)
        ? Number(payload.offset)
        : Number(CM.PAGINATION.OFFSET_VALUE);

      console.log(payloadBody, "payloadBody::");

      wheres = `"id" is not null AND "role"='${CM.USER_ENUM.USER}' AND "status"='${CM.USER_ENUM.ACTIVATED}'`;
      if (payloadBody.searchBy) {
        wheres += ` AND ("firstName" LIKE '%${payloadBody.searchBy}%' OR "lastName" LIKE '%${payloadBody.searchBy}%' OR "email" LIKE '${payloadBody.searchBy}%')`;
      }

      if (payloadBody.fromDate && payloadBody.toDate) {
        payloadBody.fromDate = moment(
          payloadBody.fromDate + " " + "00:00:00"
        ).format("YYYY-MM-DD HH:MM:SS");
        payloadBody.toDate = moment(
          payloadBody.toDate + " " + "23:59:59"
        ).format("YYYY-MM-DD HH:MM:SS");

        wheres += ` AND "createdAt" > '${payloadBody.fromDate}' AND  "createdAt" < '${payloadBody.toDate}'`;
      } else if (payloadBody.fromDate) {
        payloadBody.fromDate = moment(
          payloadBody.fromDate + " " + "00:00:00"
        ).format("YYYY-MM-DD HH:MM:SS");

        wheres += `AND "createdAt" > '${payloadBody.fromDate}'`;
      } else if (payloadBody.toDate) {
        payloadBody.toDate = moment(
          payloadBody.toDate + " " + "23:59:59"
        ).format("YYYY-MM-DD HH:MM:SS");
        wheres += ` AND "createdAt" < '${payloadBody.toDate}'`;
      }

      console.log(payloadBody, "payloadbody after getting datetime");
      await this.getAllUserData(wheres, limits, offsets).then((data) => {
        if (data && data.userCount > 0) {
          console.log(data, "data:::::::::::::::::::::::");
          request.body.result = {
            message: CM.MESSAGE_RESPONSE.RECORD_FOUND,
            data: {
              data: data.data,
              totalResults: data.userCount,
            } as UserInterface.GET_USER_RESPONSE,
          };
          next();
        } else {
          throw CM.MESSAGE_RESPONSE.NO_RECORD_FOUND;
        }
      });
    } catch (error) {
      console.log(`ERROR::`, error);
      return Helpers.ResponseHelper.error400(response, { error: error });
    }
  };

  getAllUserData = async (wheres: string, limits: number, offsets: number) => {
    try {
      const data = await Model.User.findAll({
        where: Model.sequelize.Sequelize.literal(wheres),
        order: [["id", "ASC"]],
        raw: true,
        limit: limits,
        offset: offsets,
        attributes: [
          "id",
          "email",
          "firstName",
          "lastName",
          "status",
          "createdAt",
          "updatedAt",
        ],
      });
      if (data) {
        const userCount = await Model.User.count({
          where: Model.sequelize.Sequelize.literal(wheres),
        });
        return { data, userCount };
      } else {
        return false;
      }
    } catch (error) {
      console.log(`ERROR::`, error);
      return;
    }
  };

  uploadProfilePic = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const initTransaction = await Model.sequelize.transaction();
    try {
      const userId = Number(request.userInfo.jwtData);
      console.log(request.body.type, "type of image::::::::::");
      if (!request.file && request.body.type == CM.AVATAR_PIC_TYPE.PROFILE) {
        throw {
          field: "Error::",
          message: CM.MESSAGE_RESPONSE.MULTER_FILTER_PROFILE_ERROR,
        };
      } else if (
        !request.file &&
        request.body.type == CM.AVATAR_PIC_TYPE.MESSAGE
      ) {
        throw {
          field: "Error::",
          message: CM.MESSAGE_RESPONSE.MULTER_FILTER_MESSAGE_ERROR,
        };
      }
      const payload = {
        userId: userId,
        picture: process.env.IMAGE_BASE_URL + request.file.filename,
        type: request.body.type,
        toUserId: userId,
      };
      const isProfileExist = await Model.Avatar.findOne({
        where: { userId: userId, type: CM.AVATAR_PIC_TYPE.PROFILE },
        raw: true,
      });

      if (isProfileExist) {
        const isProfileUpdated = await this.updateProfile(
          { picture: process.env.IMAGE_BASE_URL + request.file.filename },
          { userId: userId, type: request.body.type },
          initTransaction
        );
        if (isProfileUpdated) {
          initTransaction.commit();
          request.body.result = {
            message: CM.MESSAGE_RESPONSE.RECORD_UPDATED,
            data: {
              picture: payload.picture,
              type: payload.type,
            },
          };

          next();
        } else {
          throw {
            field: "Error",
            message: CM.MESSAGE_RESPONSE.ERROR_IN_PERFORMING_OPERATION,
          };
        }
      } else {
        await Model.Avatar.create(payload).then((isUploaded) => {
          if (isUploaded) {
            initTransaction.commit();
            request.body.result = {
              message: CM.MESSAGE_RESPONSE.RECORD_ADDED,
              data: isUploaded,
            };

            next();
          } else {
            throw {
              field: "Error",
              message: CM.MESSAGE_RESPONSE.ERROR_IN_PERFORMING_OPERATION,
            };
          }
        });
      }
    } catch (error) {
      console.log(`ERROR::`, error);
      initTransaction.rollback();
      return Helpers.ResponseHelper.error400(response, { error: error });
    }
  };

  updateProfile = async (
    setValue: object,
    wheres: object,
    initTransaction: any
  ) => {
    try {
      const updateProfile = await Model.Avatar.update(setValue, {
        where: wheres,
        transaction: initTransaction,
      });
      console.log(updateProfile, "updatedProfile");
      if (updateProfile) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  getProfilePic = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const userId = Number(request.userInfo.jwtData);
      await Model.Avatar.findOne({
        where: { userId: userId, type: CM.AVATAR_PIC_TYPE.PROFILE },
        raw: true,
      })
        .then((data: any) => {
          if (data) {
            data.picture = `10.1.4.216:3005/${data.picture}`;
            console.log(data, "data:::");
            request.body.result = {
              message: CM.MESSAGE_RESPONSE.RECORD_FOUND,
              data: data,
            };
          } else {
            request.body.result = {
              message: CM.MESSAGE_RESPONSE.NO_RECORD_FOUND,
              data: [],
            };
          }
          next();
        })
        .catch((error: GenericError) => {
          throw error;
        });
    } catch (error) {
      console.log(`ERROR::`, error);
      return Helpers.ResponseHelper.error400(response, { error: error });
    }
  };

  editProfile = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const initTransaction = await Model.sequelize.transaction();
    try {
      // const id = Number(request.params.id);
      const id = Number(request.userInfo.jwtData);
      const payload: UserInterface.EDIT_PROFILE_PAYLOAD = request.body;

      await this.updateUser(payload, id, initTransaction)
        .then(async (result) => {
          console.log(result);
          if (result) {
            initTransaction.commit();
            const user = await this.getSingleUser({ id: id, role: "user" });
            delete user.password;
            delete user.randomString;

            request.body.result = {
              message: CM.MESSAGE_RESPONSE.RECORD_UPDATED,
              data: user,
            };

            next();
          } else {
            throw CM.MESSAGE_RESPONSE.ERROR_IN_PERFORMING_OPERATION;
          }
        })
        .catch((error: GenericError) => {
          throw error;
        });
    } catch (error) {
      console.log(`ERROR::`, error);
      initTransaction.rollback();
      return Helpers.ResponseHelper.error400(response, { error: error });
    }
  };

  changePassword = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const initTransaction = await Model.sequelize.transaction();
    try {
      const id = Number(request.userInfo.jwtData);
      const payload = request.body;
      console.log(id, payload);

      await Model.User.findOne({ where: { id: id }, raw: true })
        .then(async (user) => {
          if (user) {
            const password = user.password;
            const valid = await bcrypt.compare(payload.oldPassword, password);
            if (valid) {
              const hashPassword = bcrypt.hashSync(payload.newPassword, 10);
              await this.updateUser(
                { password: hashPassword },
                id,
                initTransaction
              );
              initTransaction.commit();
              request.body.result = {
                message: CM.MESSAGE_RESPONSE.PASSWORD_CHANGED,
                data: {},
              };

              next();
            } else {
              throw {
                field: "Error::",
                message: "Please enter correct old password",
              };
            }
          } else {
            throw {
              field: "Error::",
              message: CM.MESSAGE_RESPONSE.ERROR_IN_PERFORMING_OPERATION,
            };
          }
        })
        .catch((error: GenericError) => {
          throw error;
        });
    } catch (error) {
      console.log(`ERROR::`, error);
      initTransaction.rollback();
      return Helpers.ResponseHelper.error400(response, { error: error });
    }
  };

  updateUser = async (
    setvariable: object,
    id: number,
    initTransaction: any
  ) => {
    try {
      const userdata = await Model.User.update(setvariable, {
        where: { id: id },
        transaction: initTransaction,
      });

      console.log(userdata, "userdata");
      return userdata;
    } catch (error) {
      console.log(`ERROR::`, error);
      return false;
    }
  };

  forgotPassword = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const initTransaction = await Model.sequelize.transaction();
    try {
      const payload = request.body;
      const user = await this.getSingleUser({
        email: payload.email,
        // role: "user",
      });
      if (!user) {
        throw CM.MESSAGE_RESPONSE.NO_RECORD_FOUND;
      } else {
        const randomString = String(Math.floor(Math.random() * 1000000000));
        const isMailSent = this.sendMail(payload.email, randomString);
        if (randomString) {
          const saveRandomString = await Model.User.update(
            { randomString: randomString },
            { where: { email: user.email } }
          );
          if (saveRandomString) {
            initTransaction.commit();
            request.body.result = {
              message: CM.MESSAGE_RESPONSE.PASSWORD_RESET_LINK_SENT,
              data: {},
            };

            next();
          }
        }
      }
    } catch (error) {
      console.log(`ERROR::`, error);
      initTransaction.rollback();
      return Helpers.ResponseHelper.error400(response, { error: error });
    }
  };

  resetPassword = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const initTransaction = await Model.sequelize.transaction();
    try {
      const payload = request.body;
      const payloadParam = request.params;
      console.log(payloadParam, "payaload params:::");
      await this.getSingleUser({
        email: payload.email,
        // role: "user"
      })
        .then(async (data) => {
          console.log(data, "data:::::::::::::::::");
          if (data) {
            if (data.randomString !== payloadParam.randomString) {
              throw "INVALID USER";
            }
            const hashPassword = await bcrypt.hashSync(payload.password, 10);
            const updatePassword = await Model.User.update(
              { password: hashPassword, randomString: "" },
              { where: { email: data.email } }
            );
            if (updatePassword) {
              initTransaction.commit();
              request.body.result = {
                message: CM.MESSAGE_RESPONSE.PASSWORD_UPDATED,
                data: {},
              };

              next();
            } else {
              throw {
                field: "ERROR IN PERFORMING OPERATION",
                message: CM.MESSAGE_RESPONSE.ERROR_IN_PERFORMING_OPERATION,
              };
            }
          } else {
            throw {
              field: "RECORD NOT FOUND",
              message: CM.MESSAGE_RESPONSE.NO_RECORD_FOUND,
            };
          }
        })
        .catch((error: GenericError) => {
          throw error;
        });
    } catch (error) {
      console.log(`ERRORC::`, error);
      initTransaction.rollback();
      return Helpers.ResponseHelper.error400(response, { error: error });
    }
  };

  sendMail = async (email: string, randomString: string) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      // requireTLS: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    transporter.sendMail(
      {
        from: "techrelated1999@gmail.com",
        to: email,
        subject: "Your credential",
        html: `<div><h3>Password Reset Link</h3>
        <p>click below link to reset password..</p>
        <a href="http://localhost:3001/resetPassword/${randomString}">click here</a></div>`,
      },
      (error: object, info: string) => {
        if (error) {
          console.log("erro not send", error);
          return false;
        } else {
          console.log("Email sent: " + info, randomString);
          return true;
        }
      }
    );
  };
}

export default new userHelper();
