import AWS from 'aws-sdk';
import * as dotenv from 'dotenv';
import { v4 as uuidV4 } from 'uuid';
import sharp from 'sharp';
import os from 'os';
import db from '../libs/db';
import fs from 'fs';

dotenv.config();

AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: 'kblog' });

const s3 = new AWS.S3();

const TEMPORARY_PATH = os.tmpdir();

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

  async convertToJpeg(buffer: Buffer, source: string) {
    await sharp(buffer).jpeg({ quality: 85 }).toFile(source);
    return source;
  },

  async convertToWebp(buffer: Buffer, source: string) {
    await sharp(buffer).webp({ quality: 85, alphaQuality: 85 }).toFile(source);
    return source;
  },

  async thumbnailUpload(file: any) {
    const { buffer } = file;

    const imageId = this.createImageId();
    const source = `${TEMPORARY_PATH}/${imageId}`;
    const webpSource = `${TEMPORARY_PATH}/${imageId}.webp`;
    const jpegSource = `${TEMPORARY_PATH}/${imageId}.jpeg`;

    fs.writeFileSync(source, buffer);

    await Promise.all([
      this.convertToJpeg(buffer, jpegSource),
      this.convertToWebp(buffer, webpSource),
    ]);

    const key = `${process.env.ENVIRONMENT}/thumbnail/${imageId}`;
    const webpKey = key + '.webp';
    const jpegKey = key + '.jepg';

    // 업로드
    await Promise.all([
      this.uploadToS3(originalBucket, key, fs.readFileSync(source), 'application/octet-stream'),
      this.uploadToS3(jpegBucket, jpegKey, fs.readFileSync(jpegSource), 'image/jpeg'),
      this.uploadToS3(webpBucket, webpKey, fs.readFileSync(webpSource), 'image/webp'),
    ]);

    // 업로드후 로컬에 파일 삭제.
    await Promise.all([
      fs.unlinkSync(source),
      fs.unlinkSync(webpSource),
      fs.unlinkSync(jpegSource),
    ]);

    const thumbnail = await db.postThumbnailImage.create({
      data: {
        imageId,
        original: key,
        webp: webpKey,
        jpeg: jpegKey,
        originalBucket,
        webpBucket,
        jpegBucket,
      },
    });

    return thumbnail;
  },
};

export default imageService;
