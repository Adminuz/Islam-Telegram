import {Markup} from 'telegraf';
import PrayTodey from './PrayTodey.js';
import Contact from './Contact.js';
import SelectCity from './SelectCity.js';

export default class FactoryKeybord {
  static  keyboard = [
     new PrayTodey('⏰ Намоз Бугун').name,
     new PrayTodey('⏰ Намоз Эртага').name,
     new SelectCity('🌍 Минтақалар').name,
     new Contact('📘 Биз Ҳакимизд').name
    ]

     static get() {
        const key = this.keyboard;
        return Markup.keyboard([[key[0],key[1]], [key[2],key[3]]]).resize();
     }

}