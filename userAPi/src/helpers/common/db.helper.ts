import * as mysql from 'mysql';
class DbHelper {
  private normalPool: mysql.Pool;
  private writePool: mysql.Pool;
  private readPool: mysql.Pool;
  constructor() {
    this.normalPool = this.initializePool('normal');
  }
  public initializePool(connectionType: string) {
    if (connectionType === 'normal') {
      return mysql.createPool({
        connectionLimit: 1,
        host: process.env.HOST_NAME,
        database: process.env.DBNAME,
        user: process.env.USER_NAME,
        password: process.env.PASSWORD,
        timezone: 'Z',
      });
    }
    if (connectionType === 'write') {
      return mysql.createPool({
        connectionLimit: 10,
        host: process.env.WRITE_NAME,
        database: process.env.WRITE_DBNAME,
        user: process.env.WRITE_USER_NAME,
        password: process.env.WRITE_PASSWORD,
        timezone: 'Z',
      });
    }
    if (connectionType === 'read') {
      return mysql.createPool({
        connectionLimit: 10,
        host: process.env.READ_HOST_NAME,
        database: process.env.READ_DBNAME,
        user: process.env.READ_USER_NAME,
        password: process.env.READ_PASSWORD,
        timezone: 'Z',
      });
    }
  }
  public pdo<T>(query: string | mysql.QueryOptions, conType = 'normal'): Promise<T | Array<T>> {
    let pdoConnect: mysql.Pool;
    if (conType === 'read') {
      this.readOpreation();
      pdoConnect = this.readPool;
    } else if (conType === 'write') {
      this.writeOpreation();
      pdoConnect = this.writePool;
    } else {
      pdoConnect = this.normalPool;
    }
    return new Promise((resolve, reject) => {
      pdoConnect.getConnection((err: mysql.MysqlError, connection: mysql.PoolConnection) => {
        if (err) {
          console.log('==============DBError55==============Here', err);
          return reject(err);
        }
        connection.query(query, (error: string, results: Array<T>) => {
          connection.release();
          if (error) return reject(error);
          const result = results.length > 0 ? JSON.parse(JSON.stringify(results[0])) : [];
          resolve(result);
        });
      });
    });
  }


  public readOpreation() {
    this.readPool = this.initializePool('read');
  }
  public writeOpreation() {
    this.writePool = this.initializePool('read');
  }
}
export default new DbHelper();