import mysql from 'mysql2';

 export default class Db2 { 
        #confing = { 
        host: "*******",
        user: "*********",
        database: "**********",
        password: "********"
        }
        #end = null
        #dbcon = null;
         constructor(){
          if(Db2.exites){
          return Db2.instance;
           }   
           Db2.instance = this;
           Db2.exites = true; 
          }
      
     #createConnect(){
    return new Promise((resolve) => {
     if(this.#dbcon){  resolve(true); }
      else{ 
      const db =  mysql.createConnection(this.#confing);
     db.connect((err) => {
     if (err) resolve(false);
     else {
       this.#dbcon = db; 
       this.#dbcon.query(`SET time_zone = '+05:00'`)
       console.log("MySQL Connection");
       resolve(true);   
       
       
      }
    })}
     this.#dbEnd()
    })
   }

   #dbEnd(){
    this.#end ? clearTimeout(this.#end) :  null
    this.#end = setTimeout(() =>{ 
    console.log('MySQL End')   
    this.#dbcon.end() 
    this.#dbcon = null
   },25000) 
}



  connect = async () => await this.#createConnect() ? this.#dbcon : this.#dbcon


    // if(this.#dbcon == null) {
    //   if(await this.#createConnect()) return this.#dbcon;

    // }else return this.#dbcon;
    

 }
