import Keyboard from "./Keyboard.js";

class Contact extends Keyboard{

render(){
 return new Promise(resolve =>{
  resolve(`📍Манзилмиз: Ўзбекистон, Хива \n 📃 Манба: islom.uz\n ✉️ Администратор: @is_return  \n🔖 Барча ҳуқуқлар ҳимояланган`);
 });

}

}

export default Contact;