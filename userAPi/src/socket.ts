import * as config from "../src/config";
import * as express from "express";
(async () => {
  await config.initiate();
})();
import chatHelper from "./modules/chat/chat.helper";
import notificationHelper from "./modules/notification/notification.helper";
import * as mw from "../src/middlewares";
import { any } from "sequelize/types/lib/operators";
const app = express();

let http = require("http").createServer(app);
const io = require("socket.io")(http);

(async () => {
  try {
    let allUsers = [];
    // io.use(async (socket: any, next: any) => {
    //   let token: string = await socket.handshake.query.token;
    //   console.log("io.use runs once:::::::", token);
    //   if (token) {
    //     socket.userId = mw.authToken(token);
    //     socket.userToken = token;
    //   } else {
    //     io.sockets.in(token).emit("sendMessageListen", {
    //       message: `${token} has been expired`,
    //     });
    //   }
    //   next();
    // });

    io.on("connection", async (socket: any) => {
      console.log("INSIDE CONNECTION::");

      socket.on("join", async (data: any) => {
        console.log(`USER CONNECTED::`, data);
        if (data.userId) {
          console.log("inside socket join", data.userId);
          socket.join(`room_${data.userId}`);
          allUsers.push({ id: data.userId, socketId: socket.id });
        }
      });

      socket.on("sendMessageEmit", async (messageData: any) => {
        console.log(messageData.userId, "got user Id   ");
        const payload = {
          message: messageData.message,
          toUserId: Number(messageData.toUserId),
          userId: Number(messageData.userId),
          userToken: false,
          type: messageData.type,
          fromStatus: "READ",
        };
        console.log("payload:::::", messageData);
        if (payload.userId && typeof payload.message == "string") {
          await chatHelper.createMessage(payload);
        }
        io.sockets
          .in(`room_${payload.toUserId}`)
          .emit("sendMessageListen", payload);
      });

      socket.on("messageRead", async (message: any) => {
        console.log("message Read :::::::::", message);
        if (message === null) {
          console.log("message Read data in empty::::::::::::::", message);
        } else if (message.userId && message.toUserId) {
          const messagePayload = {
            fromUserId: Number(message.userId),
            toUserId: Number(message.toUserId),
            // toStatus: "READ",
          };
          await chatHelper.updateStatus(messagePayload);
          message.toStatus = "READ";
          io.sockets
            .in(`room_${message.userId}`)
            .emit("messageReadListen", message);
        } else {
          console.log("message Read data in empty::::::::::::::", message);
        }
      });

      socket.on("requestNotification", async (message: any) => {
        if (message.userId && message.limit) {
          console.log("requestNotification paylaod:::", message);
          const paylaod = {
            userId: message.userId,
            limit: message.limit,
          };
          setInterval(async () => {
            const notifications =
              await notificationHelper.getLatestNotifications(paylaod);
            console.log("Latest notifications:::::::", notifications);
            if (notifications && notifications.notificationCount > 0) {
              io.sockets
                .in(`room_${message.userId}`)
                .emit("notificationListener", notifications);
            }
          }, 5000);
        } else {
          console.log(
            "you have sent an empty message to requestNotification",
            message
          );
        }
      });

      socket.on("disconnect", function () {
        console.log("A user disconnected");
      });
    });
  } catch (error) {
    console.log(`ERROR::`, error);
  }
})();

export const getLatestNotifications = () => {
  console.log("insdide get latest notifiacations::::::::::::");
};
app.get("/", (req: express.Request, res: express.Response) => {
  //   res.writeHead(200);
  return res.status(200).send({ status: "Socket Server is working" });
});

http.listen(
  process.env.SOCKET_PORT ? process.env.SOCKET_PORT : 3002,

  async (req: express.Request, res: express.Response) => {
    console.log("Socket is listening on 3002");
  }
);
