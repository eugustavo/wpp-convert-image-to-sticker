const { decryptMedia } = require('@open-wa/wa-automate');

const meta = {
  author: 'Gustavo Souza',
  pack: 'Sticker Bot - by',
  keepScale: true
};

const videoOpts = {
  crop: false,
  fps: 10,
  loop: 0,
  log: true,
  startTime: '00:00:00.0',
  endTime: '00:00:15.0'
}

const convertToSticker = async (client, message) => {
  if (message.type === 'video') {
    if (message.quotedMsg && message.quotedMsg.mimetype) {
      const videoDataQuoted = await decryptMedia(message.quotedMsg)
      await client.sendMp4AsSticker(message.from, videoDataQuoted, videoOpts, meta)
    }

    const videoData = await decryptMedia(message)
    await client.sendMp4AsSticker(message.from, videoData, videoOpts, meta)
  } else {
    let isMedia = false;

    if (!message.mimetype) {
      if (message.quotedMsg && message.quotedMsg.mimetype) {
        isMedia = true;
      }
    }
  
    const mediaData = isMedia ? await decryptMedia(message.quotedMsg) : await decryptMedia(message);
    await client.sendImageAsSticker(message.from, mediaData);
  }
}

module.exports = convertToSticker;