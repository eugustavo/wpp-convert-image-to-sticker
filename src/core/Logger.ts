import Log from './models/Log'

export class Logger {
  constructor (readonly message: string, readonly author: string) { }

  async log (error?: any){
    const type = error ? 'error' : 'info'
    const log = await Log.create({ message: this.message, author: this.author, error, type })
    log.save()
  }
}