const { create } = require('@open-wa/wa-automate');
const imageToSticker = require('./handle/imageToSticker');

async function start(client) {
  await client.onAnyMessage(async (message) => {
    if (message.text.includes('!figurinha')) {
      try {
        await imageToSticker(client, message);
      } catch(err) {
        await client.sendText(message.from, 'Não foi encontrado nenhuma imagem para converter em figurinha.');
        return
      }  
    }
  })
}

create().then(start);