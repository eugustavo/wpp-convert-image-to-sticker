import Log from './models/Log'

export class Logger {
  constructor (readonly message: string, readonly author: string, readonly error: any) { }

  async log (){
    console.log(`Message: ${this.message} | Author: ${this.author} | Error: ${this.error}`)
    const log = await Log.create({ message: this.message, author: this.author, error: this.error })
    log.save()
  }
}