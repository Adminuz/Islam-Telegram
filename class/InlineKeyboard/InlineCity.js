import {Markup} from 'telegraf';
import City from '../model/City.js';
import User from '../model/User.js';
import FactoryKeybord from '../Keyboard/FactoryKeybord.js';

class InlineCity {
    constructor(bot,ctx){
    this.ctx = ctx;
    this.bot = bot;
    !InlineCity.creat ? this.action() : null
    this.init();   
    InlineCity.creat = true;
   }

   async init(){
     const array = await City.findAll();
     this.ctx.telegram.sendMessage(
       this.ctx.from.id,
       "🌍 Минтақалар",
       Markup.inlineKeyboard(this.gener(array))
     );
   }

  
  action(){
   this.bot.action(/city:(.*?)/, async (ctx, next) => { 
     const {id} = ctx.update.callback_query.from;
     const {data,city} = this.parser(ctx.callbackQuery.data);
     return User.update(id,data).then(res => {
      if(res){
         ctx.deleteMessage().then(() =>  ctx.reply(`📌 Минтақа ${city} сакланади!`,FactoryKeybord.get()));
         next();
      }else{
         ctx.deleteMessage().then(() => ctx.reply(`❌ Хатолик!`));
        next();

      }

     });
});

   }

    

   parser(str) {
    return JSON.parse(str.replace(/(.*):(.*):(.*)/, '{"action":"$1","data":"$2","city":"$3"}'));
    }

   gener(array){
    let newArray = [], genarray = [];
    for (let i = 0; i < array.length; i++) {
       genarray.push({ 
        text: `${array[i].name}`,
        callback_data: `city:${array[i].value}:${array[i].name}`, 
        hide: false })
        if(genarray.length == 4){
        newArray.push(genarray);
        genarray= []
      } }
   return newArray;
}




}



export default InlineCity;