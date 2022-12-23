import { decryptMedia, Client, Message } from "@open-wa/wa-automate";
import { Media } from "./types/Image";

export class Converter {
  constructor(readonly client: Client, readonly message: Message){}

  async getMedia(media: Message){
    return await decryptMedia(media);
  }

  async imageToSticker (media: Media) {
    await this.client.sendImageAsSticker(this.message.from, media);
  };

  async videoToGif(media: Media){
    await this.client.sendMp4AsSticker(this.message.from, media);
  }

  async convert(){
    const media = this.message.quotedMsg ?? this.message;

    if(!media) throw new Error("No message found")

    const decriptedMedia = await this.getMedia(media)

    if (media.mimetype?.includes('video/mp4')){
      await this.videoToGif(decriptedMedia)
    } else {
      await this.imageToSticker(decriptedMedia)
    }
  }
}