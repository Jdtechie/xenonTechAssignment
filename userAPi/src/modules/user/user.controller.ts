import * as Interfaces from "@interfaces";
import * as express from "express";
import * as CM from "../../constant/response";
import * as Middlewares from "../../middlewares";
import * as validation from "./user.validation";
import userHelper from "./user.helper";
import * as Helpers from "../../helpers";

const setResponse = Helpers.ResponseHelper;

class UserController implements Interfaces.Controller {
  public path = "/*";
  public router = express.Router();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .all(`${this.path}`)
      .post(
        "/register",
        validation.registration,
        Middlewares.postValidate,
        Middlewares.trimAll,
        userHelper.registerUser,
        this.responseHandler
      )
      .post(
        "/login",
        validation.login,
        Middlewares.postValidate,
        Middlewares.trimAll,
        userHelper.loginUser,
        this.responseHandler
      )
      .post(
        "/changePassword",
        Middlewares.authentication,
        validation.changePassword,
        Middlewares.confirmField,
        Middlewares.postValidate,
        userHelper.changePassword,
        this.responseHandler
      )
      .post(
        "/forgotPassword",
        // Middlewares.authentication,
        validation.forgotPassword,
        Middlewares.postValidate,
        userHelper.forgotPassword,
        this.responseHandler
      )
      .post(
        "/resetPassword/:randomString",
        // Middlewares.authentication,
        validation.resetPassword,
        Middlewares.postValidate,
        userHelper.resetPassword,
        this.responseHandler
      )
      .post(
        "/editProfileById",
        Middlewares.authentication,
        validation.editProfile,
        Middlewares.postValidate,
        userHelper.editProfile,
        this.responseHandler
      )
      .get(
        "/getUserById",
        Middlewares.authentication,
        userHelper.getUserById,
        this.responseHandler
      )
      .get(
        "/getProfilePic",
        Middlewares.authentication,
        Middlewares.postValidate,
        userHelper.getProfilePic,
        this.responseHandler
      )
      .post(
        "/uploadProfilePic",
        Middlewares.authentication,
        Middlewares.postValidate,
        Middlewares.uploadProfilePic.single("picture"),
        userHelper.uploadProfilePic,
        this.responseHandler
      )
      .post(
        "/uploadAttachment",
        Middlewares.authentication,
        Middlewares.postValidate,
        Middlewares.uploadAttachment.single("picture"),
        userHelper.uploadProfilePic,
        this.responseHandler
      )
      .post(
        "/deleteUser/:id",
        // Middlewares.authentication,
        userHelper.deleteUserById,
        this.responseHandler
      )
      .post(
        "/getAllUser/:limit?/:offset?",
        // Middlewares.authentication,
        userHelper.getAllUser,
        this.responseHandler
      );
  }

  private responseHandler = async (
    request: express.Request,
    response: express.Response
  ) => {
    try {
      console.log("RESPONSE:::", request.body.result);
      if (typeof request.body.result != "undefined") {
        return setResponse.success(response, request.body.result);
      } else {
        return setResponse.error400(response, { message: CM.ERROR });
      }
    } catch (err) {
      console.log(`ERROR:: RESPONSE HANDLER`, err);
      return setResponse.error400(response, { error: err });
    }
  };
}
export default UserController;
