import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as express from "express";
import * as path from "path";
import { errorMiddleware } from "./middlewares";
import * as Helper from "./helpers/index";
import { Controller } from "./interfaces";
import * as CM from "../src/constant/response";
const apiBase = CM.API_BASE;
import * as swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";
import CronService from "./cron/cron";

class App {
  public app: express.Application;
  constructor(controllers: Controller[]) {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    //this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(process.env.PORT ? process.env.PORT : 8082, () => {
      console.log(
        `App listening on the port ${
          process.env.PORT ? process.env.PORT : 8082
        }`
      );
    });
  }
  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ limit: "50mb", extended: true }));
    this.app.use(cookieParser());
    this.app.use(cors());
    this.app.set("views", path.join(__dirname, "views"));
    this.app.use(express.static("public"));
    this.app.set("view engine", "ejs");
    this.app.use(
      `${apiBase}/api-docs`,
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use(`${apiBase}`, controller.router);
    });
    this.app.get(`${apiBase}/status`, (req, res) => {
      console.log("Status Route called");
      return res.json({ status: "success" });
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
