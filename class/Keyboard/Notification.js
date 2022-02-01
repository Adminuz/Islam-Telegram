import Keyboard from './Keyboard.js';
import InlineNotification from '../InlineKeyboard/InlineNotification.js';

class Notification extends Keyboard{

  render(ctx){
  return new Promise((resolve) => {
    new InlineNotification(this.bot,ctx);
    resolve(false);
  });
}


}


export default Notification;