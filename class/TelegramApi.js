import {Telegraf} from 'telegraf';
import * as dotenv from 'dotenv';
dotenv.config()

export default class Bot{
    token = process.env.BOT_TOKEN;
  constructor(){
  
   if(Bot.creat){
  
       return Bot.object;
   }
   this.bot = new Telegraf(this.token);
   console.log(process.env.BOT_TOKEN);
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