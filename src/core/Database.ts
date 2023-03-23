import 'dotenv/config'
import * as Mongoose from 'mongoose'

export class Database {
  private db_uri = process.env.DB_URI || ''
  private db_user = process.env.DB_USER || ''
  private db_pass = process.env.DB_PASS || ''
  private db_name = process.env.DB_NAME || ''
  async connect (){
    Mongoose.connect(this.db_uri, { user: this.db_user, pass: this.db_pass, dbName: this.db_name, retryWrites: true });
  }

  async disconnect (){
    Mongoose.disconnect();
  }
}