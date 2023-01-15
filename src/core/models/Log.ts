import { model, Schema } from 'mongoose'

const LogSchema = new Schema({
  message: String,
  author: String,
  error: String
}, { timestamps: true })

const Log = model('Log', LogSchema);
export default Log;