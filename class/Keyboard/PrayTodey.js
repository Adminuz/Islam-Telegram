import City from '../model/City.js';
import PrayTime from '../model/PrayTime.js';
import User from '../model/User.js'
import Keyboard from './Keyboard.js'

export default class PrayTodey extends Keyboard {
constructor(bot,name){
    super(bot,name); 
    this.day = PrayTodey.exites ? 1 : 0
    PrayTodey.exites = true;  
   }
     render(ctx) {
      const {month,day} =  new Date().monthDay(this.day);
      return new Promise( async (resolve) => {
      const {city} =  await User.findOne(ctx.message.from);
      const {value,name}  = await City.findOne(city);
      const res =  await PrayTime.todey(value,month,day); 

      resolve(`
🌎 ${name}  📆 ${day}.${month}.2022
📮 Ҳафта куни: ${res.hafta}
🌌 Тонг (Саҳарлик): ${res.tong}
🌅 Қуёш: ${res.quyosh}
🕛 Пешин: ${res.peshin}
🕛 Аср: ${res.asr}
🌄 Шом (Ифтор): ${res.shom}
🌃 Хуфтон: ${res.xuftor}
`)

     })
 

   }




}