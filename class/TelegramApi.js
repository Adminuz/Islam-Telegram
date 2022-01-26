import {Telegraf} from 'telegraf';

export default class Bot{
    token = '5037065909:AAGBkBwBht1PKnAdfAMED3ixvR5pMWVpkNc';
  constructor(){
   if(Bot.creat){
       return Bot.object;
   }
   this.bot = new Telegraf(this.token);
   this.bot.launch();
   this.process();
   Bot.object = this;
   Bot.creat = true;
}

   get main() { return this.bot }   


  process(){
    process.once('SIGINT', () => this.bot.stop('SIGINT'))
    process.once('SIGTERM', () => this.bot.stop('SIGTERM'))
}



}