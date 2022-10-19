import * as cron from "cron";
import errorLogHelper from "../modules/user/user.helper";
import { getLatestNotifications } from "../socket";
// const runTime = '0 5 */30 * *';
//30 days
const runTime = "*/1 * * * * *"; //10 sec

const CronJob = cron.CronJob;
class CronService {
  constructor() {
    console.log("cron job rinning::::::");
    this.cronFn();
  }

  cronFn = () => {
    const job = new CronJob(runTime, async () => {
      getLatestNotifications();
    });
  };
}
export default CronService;
