import OrmMysql from './OrmMysql.js'

class User extends OrmMysql{
  // ! ctx.message.from Передавайми Даны!

static async findOne({id}) {
    const connect = await this.dbcon();
    return new Promise((resolve) =>{ 
      connect.query(`SELECT * FROM user WHERE uid=(${id})`, (err, res) => resolve(res[0]));

});
}

static async add({id , first_name , username}) {
   // ! ctx.message.from Передавайми Даны!
     const connect = await this.dbcon();
     return new Promise((resolve) => {
      connect.query(`INSERT INTO user(uid, name, username) 
        VALUES(${id},'${first_name}','${username}')`, (err, res) => {
         if(err) console.log(err);  
        resolve(true);
  });


   });

  }


  static async update(id,city){
    const connect =  await this.dbcon();
   return new Promise(resolve =>{
   connect.query(`UPDATE user SET city=(${city}) WHERE uid=(${id})`, (err, results) => {
      if(err)resolve(false)
       resolve(true)
      });
  
  
  
  
   });
  
  }




}




export default User;


// connection.query(`SELECT * FROM user WHERE uid=(${this.from.id})`, (err, res) => resolve(res[0]))
//        : resolve(false)})