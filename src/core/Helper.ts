
import { Client, Message } from '@open-wa/wa-automate';

export class Helper {
  private helperUrls = [
    { image: 'https://figurinha.s3.us-east-1.amazonaws.com/figurinha_1.png', message: 'Tutorial de como criar figurinha' },
    { image: 'https://figurinha.s3.us-east-1.amazonaws.com/figurinha.png', message: 'Tutorial de como criar figurinha' },
    { image: 'https://figurinha.s3.us-east-1.amazonaws.com/semfundo.png', message: 'Tutorial de como remover fundo de imagem' },
    { image: 'https://figurinha.s3.us-east-1.amazonaws.com/gif.png', message: 'Tutorial de como criar gif animado' }
  ]
  private messages = [
    'O bot ainda está em fase de testes, então se não funcionar de primeira tente novamente.',
    `Se gostou das funcionalidades ajude a manter o bot online fazendo uma doação de qualquer valor:
    *PIX: chave aleatória`,
    '4c432df3-8b6b-4496-a83f-7b6c59615cde',
    'Enjoy!'
  ]
  constructor (readonly client: Client, readonly message: Message){}
  
  async execute () {
    for (const helper of this.helperUrls){
      await this.client.sendImage(this.message.from, helper.image, 'tutorial.png', helper.message);
    }
    for (const message of this.messages){
      await this.client.sendText(this.message.from, message);
    }
    return
  }
}