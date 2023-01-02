import { create, Client, Message } from '@open-wa/wa-automate';
import { Converter } from './core';

const COMMANDS = ['!figurinha', '!sticker', '!gif', '!semfundo'];

async function start (client: Client) {
  await client.onAnyMessage(async (message: Message) => {
    console.log('Bot iniciado com sucesso!')
    if (COMMANDS.includes(message.text)) {
      try {
        const converter = new Converter(client, message)
        await converter.convert()
        console.log('Figurinha convertida com sucesso!')
      } catch (err) {
        await client.sendText(
          message.from,
          'Não foi encontrado nenhuma imagem para converter em figurinha.'
        );
        return;
      }
    }
  });
}

const main = async () => {
  const client = await create({ qrTimeout: 0 })
  start(client)
}

main()