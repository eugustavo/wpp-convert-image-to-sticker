const { create } = require('@open-wa/wa-automate');
const convertToSticker = require('./handle/convertToSticker');
const convertToStickerWithoutBg = require('./handle/convertToStickerWithoutBg');

const successMessage =
`Obrigado por usar nosso bot de figurinhas 🥰

Ajude o bot a não sair do ar, doe qualquer valor para o PIX abaixo 👇
`;

const pixMessage =
`*PIX*(Chave Aleatória)

dd3e52a4-e167-4096-bced-23fd8645cfe4
`;

const imageLink = 'https://user-images.githubusercontent.com/25755550/204143281-93d68b0e-1582-49c9-8d61-f503597dbb32.png';

async function start(client) {
  await client.onAnyMessage(async (message) => {
    if (message.text.includes('!figurinha')) {
      try {
        await convertToSticker(client, message);
        await client.sendText(message.from, successMessage);
        await client.sendText(message.from, pixMessage);
      } catch(err) {
        await client.sendText(message.from, 'Não foi encontrado nenhuma imagem, gif ou video para converter em figurinha.');
        return
      }  
    }
    if (message.text.includes('!semfundo')) {
      try {
        await convertToStickerWithoutBg(client, message);
        await client.sendText(message.from, successMessage);
        await client.sendText(message.from, pixMessage);
      } catch(err) {
        await client.sendText(message.from, 'Não foi encontrado nenhuma imagem para converter em figurinha.');
        return
      }  
    }
    if (message.text.includes('!help')) {
      await client.sendImage(message.from, imageLink, 'help.png', 'Comandos disponíveis no bot atualmente');
    }
  })
}

create().then(start);