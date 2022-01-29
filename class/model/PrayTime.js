import OrmMysql from './OrmMysql.js'

class PrayTime extends OrmMysql{

    static async todey(value,month,day) {
      const connect = await this.dbcon();
     return new Promise((resolve) => {
     connect.query(`SELECT * FROM timenamaz WHERE city=${value} AND month=${month} AND day=${day}`, (err, results) => {
        if(err) resolve(null);
         resolve(results[0]);
    });


});
}





static async todeyNot(month,day) {
  const connect = await this.dbcon();
 return new Promise((resolve) => {
 connect.query(`SELECT * FROM timenamaz WHERE month=${month} AND day=${day}`, (err, results) => {
    if(err) resolve(null);
     resolve(results);
});


});
}




}



export default PrayTime;