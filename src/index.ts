import { create, Client, Message } from '@open-wa/wa-automate';
import { Converter } from './core';
import { Database } from './core/Database';
import { Helper } from './core/Helper';
import { Logger } from './core/Logger';

const COMMANDS = ['!figurinha', '!sticker', '!gif', '!semfundo', '!help'];
const BLACK_LIST = ['556392785687']
const successMessage = `
Se gostou das funcionalidades ajude a manter o bot online fazendo uma doação de qualquer valor:
*PIX:* 
`;
const pixMessage = '4c432df3-8b6b-4496-a83f-7b6c59615cde'

async function start (client: Client) {
  console.log('Bot iniciado com sucesso!')
  await client.onAnyMessage(async (message: Message) => {
      const hasCommand = COMMANDS.some(command => {
        return message.text.startsWith(command)
      })
      const isBlackListed = BLACK_LIST.some(number => {
        return message.from.startsWith(number)
      })
      try {
        if (hasCommand) {
          if (message.text === '!help') {
            if(isBlackListed){
              await client.sendText(message.from, 'VSF TONI')
              return
            }
            const helper = new Helper(client, message)
            await helper.execute()
          }
          else {
            const converter = new Converter(client, message)
            await converter.convert()
            await client.sendText(message.from, successMessage);
            await client.sendText(message.from, pixMessage);
          }
          return
        }
      } catch (err) {
        await client.sendText(
          message.from,
          'Não foi possivel converter o arquivo enviado em figurinha, tente novamente.'
        );
        const logger = new Logger(message.body, message.from, err)
        logger.log()
        // new Database().disconnect()
        return;
      }
  });
}

const main = async () => {
  new Database().connect()
  const client = await create({ qrTimeout: 0 })
  start(client)
}

main()