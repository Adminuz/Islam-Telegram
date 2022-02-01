// process.env.TZ = 'Asia/Tashkent'
import Bot from '../TelegramApi.js';
import UserNotification from '../model/UserNotification.js'



class NotificationSys{

   constructor(){
    this.bot = new Bot().main;
    this.getPrayTime();
   setInterval( async () => await this.getPrayTime(),60000);
  }
async getPrayTime(){
  console.log(this.getTime())
   const res = await UserNotification.prayTime();
   for(let {praym ,city} of res){   //!  O(N) 
      for(let time of praym){      //! O(5)
      if(time <= this.getTime()  &&  time >= this.getTime(4)){
        console.log(city ,time);
        await this.sendMessage(city);
      }
     
    }
  
    
  }
 
}
  sendMessage = async (city) => {
  const user = await UserNotification.findAll(city);
  for(let {uid} of user){
      try {
     this.bot.telegram.sendMessage(uid, `${this.getTime()}`);
     await UserNotification.updateLast(uid)
    
    } catch (error) {
      console.log(error);
    }  
     }
}

  getTime (x = 0) {
    const date = new Date();
    const hour = ("0"+date.getHours()).substr(-2);
    const minutes = ("0"+(date.getMinutes()-x)).substr(-2);
    return  hour+":"+minutes;
  }


}


export default NotificationSys; 