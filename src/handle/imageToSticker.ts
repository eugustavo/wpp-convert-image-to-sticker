import { decryptMedia, Client, Message } from "@open-wa/wa-automate";

export const imageToSticker = async (client: Client, _message: Message) => {
  const message = _message.quotedMsg ?? _message;
  const media = await decryptMedia(message);
  await client.sendImageAsSticker(message.from, media);
};
