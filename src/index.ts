import { create, Client, Message } from '@open-wa/wa-automate';
import { Converter } from './core';

const COMMANDS = ['!figurinha', '!sticker', '!gif', '!semfundo', 'Q'];
const successMessage = `
Já tem seu sticker, agora transfere um dim pra manter o *bot online*
*PIX*:
`;
const pixMessage = '4c432df3-8b6b-4496-a83f-7b6c59615cde'
async function start (client: Client) {
  console.log('Bot iniciado com sucesso!')
  await client.onAnyMessage(async (message: Message) => {
    if (COMMANDS.includes(message.text)) {
      try {
        const converter = new Converter(client, message)
        await converter.convert()
        await client.sendText(message.from, successMessage);
        await client.sendText(message.from, pixMessage);
        console.log('Figurinha convertida com sucesso!')
      } catch (err) {
        await client.sendText(
          message.from,
          'Não foi possivel converter o arquivo enviado em figurinha.'
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