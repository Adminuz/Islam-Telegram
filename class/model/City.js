import OrmMysql from './OrmMysql.js'

class City extends OrmMysql{

  static async findOne(id){
   const connect =  await this.dbcon(); 
   return new Promise(resolve => {
    connect.query(`SELECT * FROM city WHERE value=(${id})`, (err, res) => resolve(res[0]))

  });

}

 static async findAll(){
  const connect =  await this.dbcon(); 
  return new Promise(resolve => {
    connect.query(`SELECT * FROM city`, (err, res) => resolve(res))

 });

}




}



export default City;