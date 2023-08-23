import AWS, { S3 } from "aws-sdk";

import { S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_BUCKET_NAME } from "@env";

const ID: string = S3_ACCESS_KEY_ID!;
const SECRET: string = S3_SECRET_ACCESS_KEY!;
const BUCKET_NAME: string = S3_BUCKET_NAME!;

/** aws configuration */
AWS.config.update({
  accessKeyId: ID,
  secretAccessKey: SECRET,
  region: "ap-northeast-2",
});

const s3: S3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
});

export default async function uploadImage(uri: string): Promise<string> {
  try {
    // URI로부터 이미지를 불러옴
    const response = await fetch(uri);
    const imageBlob = await response.blob();

    console.log(BUCKET_NAME);

    // 유니크한 파일명을 위해 현재 시간을 기반으로 파일명 생성
    const currentDateTime: Date = new Date();
    const formattedDateTime: string = currentDateTime
      .toISOString()
      .replace(/[-:.TZ]/g, "")
      .replace(/T/g, "-")
      .substring(0, 17);

    const fileKey: string = `${formattedDateTime}_${Math.random()
      .toString(36)
      .substring(7)}.jpg`;

    // S3에 이미지 업로드
    const params: S3.PutObjectRequest = {
      Bucket: BUCKET_NAME!,
      Key: fileKey,
      Body: imageBlob,
      ACL: "public-read",
    };
    await s3.upload(params).promise();

    // 업로드한 이미지의 url을 반환
    const imageUrl: string = `https://${BUCKET_NAME}.s3.amazonaws.com/${fileKey}`;
    return imageUrl;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw new Error("이미지 업로드에 실패했습니다.");
  }
}
