import User from './User.js'

class UserNotification extends User{

    static isOnNotificatinUser(){
     return new Promise(async resolve => {
     const connect = await this.dbcon();
      connect.query(
        `SELECT DISTINCT city 
      FROM user 
      WHERE is_on_notificatin = 1`,
        (err, res) => {
          const list = res
            .map(({ city }) => city)
            .toString()
            .replace(/[(.*)]/, "$1");
          resolve(list);
        }
      );
})



 } 


  static prayTime(){
   const date = new Date();
   const month = date.getMonth()+1;
   const day = date.getDate();
 return new Promise(async resolve => {
  const connect =  await this.dbcon();
  const userList = await  this.isOnNotificatinUser();
  connect.query(
    `SELECT * FROM timenamaz 
  WHERE city IN(${userList}) AND
   month=${month} AND 
   day=${day}`,
    async (err, res) => {
     const list = await res.map(({tong,peshin,asr,shom,xuftor,city}) => {
     return {city, praym:[tong,peshin,asr,shom,xuftor]}
     })
  

     resolve(list)
    }
  );

});

}


  static findAll(city) {
  return new Promise(async (resolve) => {
    const connect = await this.dbcon();
    connect.query(
      `SELECT * 
  FROM user 
  WHERE city=(${city}) AND 
  is_on_notificatin = 1 AND 
  last_notificatin < ((now() - INTERVAL 6 MINUTE))`,
    (err, res) => resolve(res)
);
  });
  
}

static  updateLast(id){
   return new Promise(async resolve =>{
    const connect =  await this.dbcon();
   connect.query(
     `UPDATE user 
   SET last_notificatin = NOW()
   WHERE uid=(${id})`,
     (err, results) => {
       if (err) resolve(false);
       resolve(true);
     }
   );
  });

}


 static switchNotif(data,id){
   return new Promise( async resolve => {
    const connect =  await this.dbcon();
    connect.query(
      `UPDATE user 
    SET is_on_notificatin = ${data}
    WHERE uid=(${id})`,
      (err, results) => {
        if (err) resolve(false);
        resolve(data);
      }
    );
   


   });


 }





}

export default UserNotification;