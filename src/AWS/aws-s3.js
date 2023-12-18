const AWS = require('aws-sdk');
const s3 = new AWS.S3({apiVersion: '2006-03-01'})

// ! NEVER SHARE THE CREDENTIALS.
AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION, 
    accessKeyId: process.env.accessKeyId, 
    secretAccessKey: process.env.secretAccessKey
})

exports.listDirectories = async () => {
    return s3.listBuckets().promise()
}

exports.getBucketObjects = (bucketName) => {
    const parameters = {
        Bucket: bucketName
    }
    return s3.listObjects(parameters).promise()
}