import UserNotification from '../model/UserNotification.js';
import {Markup} from 'telegraf';


export default class InlineNotification{
    constructor(bot,ctx){
     this.bot = bot;
     this.ctx = ctx;
     !InlineNotification.creat ? this.action() : null
     this.init();   
     InlineNotification.creat = true;
   }


  init(){
    this.ctx.telegram.sendMessage(
      this.ctx.from.id,
      "🔔 Билдиришнома",
      Markup.inlineKeyboard([
        {text: 'Йокиш',
          callback_data: `notif:1`, 
          hide: false },
          {text: 'Учириш',
          callback_data: `notif:0`, 
          hide: false }
       ])
    );
}


    action(){
    this.bot.action(/notif:(.*?)/, async (ctx, next) => {
      const { id } = ctx.update.callback_query.from;
      const { data } = this.parser(ctx.callbackQuery.data);
      return UserNotification.switchNotif(data, id).then((res) => {
        if (res == 1) {
          ctx
            .deleteMessage()
            .then(() => ctx.reply(`🔔 Билдиришнома  Уйгонды!`));
        } else
          ctx
            .deleteMessage()
            .then(() => ctx.reply(`🔕 Билдиришнома Тохтатилди!`));
        next();
      });
    });
 
  }




   parser(str) {
    return JSON.parse(str.replace(/(.*):(.*)/, '{"action":"$1","data":"$2"}'));
    }


}