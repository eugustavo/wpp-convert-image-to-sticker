import { decryptMedia, Client, Message } from '@open-wa/wa-automate';
import { CropPositionEnum, Media, Meta, VideoOpts } from './types';

export class Converter {
  private meta: Meta = {
    author: 'Lucas Bastos',
    pack: 'Sticker Bot - by',
    keepScale: true,
    cropPosition: CropPositionEnum.center,
  };

  private videoOpts: VideoOpts = {
    startTime: '00:00:00.0',
    endTime: '00:00:10.0'
  }   

  constructor (readonly client: Client, readonly message: Message){}

  async getMedia (media: Message){
    return await decryptMedia(media);
  }

  async imageToSticker (media: Media) {
    await this.client.sendImageAsSticker(this.message.from, media, this.meta);
    return
  }

  async videoToGif (media: Media){
    await this.client.sendMp4AsSticker(this.message.from, media, this.videoOpts);
    return
  }

  async removeBackground (media: Media){
    const meta: Meta =  {
      ...this.meta,
      cropPosition: CropPositionEnum.center,
      removebg: true,
    };
    await this.client.sendImageAsSticker(this.message.from, media, meta);  
    return
  }

  async convert (){
    const media = this.message.quotedMsg ?? this.message;

    if(!media) throw new Error('No message found')

    const decriptedMedia = await this.getMedia(media)
    if(this.message.text === '!semfundo'){
      await this.removeBackground(decriptedMedia)
    }
    else if (media.mimetype?.includes('video/mp4')){
      await this.videoToGif(decriptedMedia)
    } else {
      await this.imageToSticker(decriptedMedia)
    }
  }
}