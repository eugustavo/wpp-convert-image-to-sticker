import { create, Client, Message } from "@open-wa/wa-automate";
import { imageToSticker } from "./handle/imageToSticker";

const COMMANDS = ["!figurinha", "!sticker"];

async function start(client: Client) {
  await client.onAnyMessage(async (message: Message) => {
    if (COMMANDS.includes(message.text)) {
      try {
        await imageToSticker(client, message);
      } catch (err) {
        await client.sendText(
          message.from,
          "Não foi encontrado nenhuma imagem para converter em figurinha."
        );
        return;
      }
    }
  });
}

create({ qrTimeout: 0 }).then(start);
