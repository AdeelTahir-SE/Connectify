import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { unlink } from 'fs/promises';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class CloudinaryService {
  constructor(private readonly config: ConfigService) {

 
    cloudinary.config({
      cloud_name: this.config.getOrThrow<string>('CLOUDINARY_CLOUD_NAME'),
      api_key:    this.config.getOrThrow<string>('CLOUDINARY_API_KEY'),
      api_secret: this.config.getOrThrow<string>('CLOUDINARY_API_SECRET'),
      secure: true,
    });
  }
  async uploadImage(filePath: string, folder: string): Promise<UploadApiResponse> {


    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      overwrite: true,
      resource_type: 'image',
    });
    await unlink(filePath); 
    return result;
  }
}
