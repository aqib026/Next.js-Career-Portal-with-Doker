import S3 from 'aws-sdk/clients/s3'

export default async function handler(
  req,
  res
) {
  const s3 = new S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: "us-east-1",
    signatureVersion: 'v4',
  })

  const upload = await s3.createPresignedPost({
    Bucket: process.env.BUCKET_NAME,
    Fields: {
      key: req.query.file
    },
    Expires: 600,
    acl: "public-read",
    Conditions: [
      ['content-length-range', 0, 2096576],
    ],
  })

  res.status(200).json(upload)
}