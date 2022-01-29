import Keyboard from './Keyboard.js';
import InlineCity from '../InlineKeyboard/InlineCity.js';

export default class SelectCity extends Keyboard{
    render(ctx) {
     return new Promise(resolve =>{
     new InlineCity(this.bot,ctx);
      resolve(false);
       
  })


    }


}