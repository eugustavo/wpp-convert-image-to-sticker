const { decryptMedia } = require('@open-wa/wa-automate');

const meta = {
  author: 'Gustavo Souza',
  pack: 'Sticker Bot - by',
  keepScale: true,
  cropPosition: 'center',
  removebg: true,
};

const convertToStickerWithoutBg = async (client, message) => {
  let isMedia = false;

  if (!message.mimetype) {
    if (message.quotedMsg && message.quotedMsg.mimetype) {
      isMedia = true;
    }
  }

  const mediaData = isMedia ? await decryptMedia(message.quotedMsg) : await decryptMedia(message);
  await client.sendImageAsSticker(message.from, mediaData, meta);
}

module.exports = convertToStickerWithoutBg;