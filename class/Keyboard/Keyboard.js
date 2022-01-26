import Bot from "../TelegramApi.js";

   export default class Keyboard {
  constructor(name){
   this.bot = new Bot().main;
   this.name = name;

   this.bot.hears(this.name, async (ctx) => {
    this.render(ctx).then(res => res ? ctx.reply(res) : null);
   })
  }
     render(){
     return new Promise((resolve,rejact)=>{
       resolve(false)
     })


   }
}