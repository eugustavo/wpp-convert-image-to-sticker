const { create } = require('@open-wa/wa-automate');
const convertToSticker = require('./handle/convertToSticker');

const successMessage =
`Obrigado por usar nosso bot de figurinhas 🥰
Siga o autor nas redes socias 👇 \n
Instagram: https://www.instagram.com/gustavosoouza
Twitter: https://twitter.com/sogustavo_
`;

async function start(client) {
  await client.onAnyMessage(async (message) => {
    if (message.text.includes('!figurinha')) {
      try {
        await convertToSticker(client, message);
        await client.sendText(message.from, successMessage);
      } catch(err) {
        await client.sendText(message.from, 'Não foi encontrado nenhuma imagem, gif ou video para converter em figurinha.');
        return
      }  
    }
  })
}

create().then(start);