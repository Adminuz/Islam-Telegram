import Db from './Db.js'
class OrmMysql{
    
    static dbcon = async () => await new Db().connect();

}


export default OrmMysql;