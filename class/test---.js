import Notification from "./model/Notification.js"
import PrayTime from "./model/PrayTime.js"
import Bot from './TelegramApi.js';


class NotificationSys {
  constructor() {
    this.bot = new Bot().main;
    this.object = new Map();
    this.start();
  }

  start = async () => {
    const setuser = await this.getUserAll();
    const update = await this.update();
    if (setuser && update) {
      this.notification();
      setInterval(this.notification, 10000);
    }

    console.log(this.object);
  };

  getUserAll = () => {
    return new Promise(async (resolve) => {
      const res = await Notification.findAll();
      for (let { city, uid } of res) {
        if (!this.object.has(city)) {
          this.object.set(city, { user: [uid] });
        } else {
          this.object.get(city).user.push(uid);
        }
      }
      resolve(true);
    });
  };

  notification = () => {
    for (let { user, prayem } of this.object.values()) {
      prayem.forEach((e) => {
        if (e.time <= getTime() && !e.status) {
          //! Хозирги вакт
          user.forEach((uid) => {
            this.bot.telegram.sendMessage(uid, `${e.time}`);
          });
          console.log("Notification", user);
          e.status = true;

          return;
        }
      });
    }
    console.log("No Notification");
  };

  getTime(x = 0) {
    const date = new Date();
    const hour = ("0" + date.getHours()).substr(-2);
    const minutes = ("0" + (date.getMinutes() - x)).substr(-2);
    return hour + ":" + minutes;
  }

  update = () => {
    return new Promise(async (resolve) => {
      for (let object of this.object) {
        const city = object[0];
        const { tong, peshin, asr, shom, xuftor } = await PrayTime.todey(
          city,
          1,
          28
        );
        if (!object[1].prayem) {
          const list = (object[1].prayem = []);
          [tong, peshin, asr, shom, xuftor].forEach((e) => {
            if (e >= this.getTime(5) && !e.status) {
              //! 5 минут кейинда
              list.push({ time: e, status: false });
            } else {
              list.push({ time: e, status: true });
            }
            return;
          });
        }
      }

      resolve(true);
    });
  };
}

new NotificationSys();
