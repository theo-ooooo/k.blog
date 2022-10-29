import AWS from 'aws-sdk';
import * as dotenv from 'dotenv';
import { v4 as uuidV4 } from 'uuid';
import sharp from 'sharp';
import db from '../libs/db';

dotenv.config();

AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: 'kblog' });

const s3 = new AWS.S3();

const originalBucket = process.env.IMAGE_ORIGINAL_BUCKET!;
const webpBucket = process.env.IMAGE_WEBP_BUCKET!;
const jpegBucket = process.env.IMAGE_JPEG_BUCKET!;

const imageService = {
  createImageId() {
    return uuidV4();
  },

  async uploadToS3(bucket: string, key: string, body: Buffer, contentType: string) {
    await s3
      .putObject({ Body: body, Bucket: bucket, Key: key, ContentType: contentType })
      .promise();
  },

  async convertToJpeg(source: Buffer) {
    return await sharp(source).jpeg({ quality: 90 }).toBuffer();
  },

  async convertToWebp(source: Buffer) {
    return await sharp(source).webp({ quality: 90 }).toBuffer();
  },

  async thumbnailUpload(file: any) {
    const { buffer } = file;
    const [jpegBuffer, webpBuffer] = await Promise.all([
      this.convertToJpeg(buffer),
      this.convertToWebp(buffer),
    ]);

    const imageId = this.createImageId();
    const key = `${process.env.ENVIRONMENT}/thumbnail/${imageId}`;

    await Promise.all([
      this.uploadToS3(originalBucket, key, buffer, 'application/octet-stream'),
      this.uploadToS3(jpegBucket, key, jpegBuffer, 'image/jpeg'),
      this.uploadToS3(webpBucket, key, webpBuffer, 'image/webp'),
    ]);

    const thumbnail = await db.postThumbnailImage.create({
      data: {
        imageId,
        original: key,
        webp: key,
        jpeg: key,
        originalBucket,
        webpBucket,
        jpegBucket,
      },
    });

    return thumbnail;
  },
};

export default imageService;
