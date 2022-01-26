import Bot from '../TelegramApi.js';
import User from '../model/User.js';
import FactoryKeybord from '../Keyboard/FactoryKeybord.js';
import InlineCity from '../InlineKeyboard/InlineCity.js';

export default class Start {
 
  constructor(){
  this.bot = new Bot().main;
  this.creat();
 }


     creat(){
      this.bot.start( async (ctx) => {
      const user = await User.findOne(ctx.message.from);
      const message = `Ассаламу Алейкум Ва Рахматуллахи Ва Баракатух ${ ctx.message.from.first_name }`;
      if(!user){
         await User.add(ctx.message.from) ? new InlineCity(this.bot,ctx) : ctx.reply(`❌ Хатолик!`)
      }else{
        ctx.reply(message, FactoryKeybord.get())
      }  

     })

 }



}


// if(await new User(this).start()){
//     await this.key.selectCity(ctx)
//   }else{ 
//      this.key.menu({ctx,name:'Меню'});
//   } 