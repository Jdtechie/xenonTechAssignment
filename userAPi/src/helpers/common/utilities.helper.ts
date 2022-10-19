import * as CryptoJS from "crypto-js";
import * as jwt from "jsonwebtoken";
import * as CM from "../../constant/response";

export const generateJwt = async (userId: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const JWT = jwt.sign({ jwtData: userId }, process.env.JWTSECRET, {
        expiresIn:
          process.env.NODE_ENV === "stage"
            ? CM.EXPIRED_TIME.STAGE
            : CM.EXPIRED_TIME.DEVELOP,
      });
      console.log("JWT " + JWT);
      resolve(JWT);
    } catch (error) {
      console.log("error", error);
      reject(error);
    }
  });
};

export const generateJwtAdmin = (
  userId: string,
  adminRole: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const JWT = jwt.sign(
        { jwtData: userId, adminRole },
        process.env.JWTADMINSECRET,
        {
          expiresIn:
            process.env.NODE_ENV === "stage"
              ? CM.EXPIRED_TIME_ADMIN.STAGE
              : CM.EXPIRED_TIME_ADMIN.DEVELOP,
        }
      );
      console.log("JWT " + JWT);
      resolve(JWT);
    } catch (error) {
      console.log("error", error);
      reject(error);
    }
  });
};

//   public compareConfirmPassword = (
//     password: string,
//     confirmPassword: string
//   ) => {
//     return password === confirmPassword;
//   };

//   public getCountryDataByParamFn(paramName: SearchParam, paramValue: string, returnValue: string
//   ): Promise<string> {
//     return new Promise((resolve, reject) => {
//       try {
//         const arr = paramValue.split(" ");
//         for (let i = 0; i < arr.length; i++) {
//           arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
//         }
//         const actuallparamValue = arr.join(" ");
//         const currency = getParamByParam(paramName, actuallparamValue, returnValue);
//         console.log('currency', currency);
//         resolve(currency);
//       }
//       catch (error) {
//         console.log('error', error);
//         reject(error);
//       }
//     });
//   }
