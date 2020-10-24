module.exports = (AWS, config) => {
  const s3 = new AWS.S3();

  /**
   * Upload a file to s3 bucket
   * @param {data} Base64 String of file content
   * @param {mimeType} mime type of file to be uploaded
   * @param {fileName} name of file to set in bucket
   * @param {pathPrefix} path prefix of where the file should be stored in s3
   */
  async function uploadImage(data, mimeType, fileName, pathPrefix) {
    try {
      if (!fileName) {
        throw new Error('Object Undefined');
      }
      const params = {
        ACL: 'public-read',
        Body: data,
        ContentType: mimeType,
        Bucket: config.awsS3BucketName,
        Key: `${pathPrefix}/${fileName}`,
      };
      const result = await s3.upload(params).promise();
      return result.Location;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete a file from S3 bucker
   * @param {url} Url of the file to delete from s3
   */
  async function deleteFile(url) {
    try {
      const Key = url.split('amazonaws.com/')[1];
      const params = {
        Bucket: config.awsS3BucketName,
        Key,
      };

      const result = await s3.deleteObject(params).promise();
      return result;
    } catch (error) {
      throw error;
    }
  }

  function getObjects(pathPrefix) {
    const params = {
      Bucket: config.awsS3BucketName,
      //   Delimiter: '/',
      Prefix: `${pathPrefix}/`,
    };

    const getObjectPromise = s3.listObjectsV2(params).promise();

    return getObjectPromise.then((result) => {
      const urls = [];
      result.Contents.forEach((element) => {
        // urls.push(`https://s3.amazonaws.com/${config.BUCKET_NAME}/${element.Key}`)
      });
      return urls;
    });
  }

  function getSpecificObject(obj) {
    const params = {
      Bucket: config.awsS3BucketName,
      Key: obj.key,
    };

    s3.getObject(params, (err, data) => {
      // Handle any error and exit
      if (err) return err;
      return data;
      //   let objectData = data.Body.toString('utf-8'); // Use the encoding necessary
    });
  }

  return {
    uploadImage,
    getObjects,
    getSpecificObject,
    deleteFile,
  };
};
