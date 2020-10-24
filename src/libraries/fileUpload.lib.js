const AWS = require('./aws');
const { APIError, ErrorKeys } = require('.');

/**
 * Upload a file using the multipart file object from forms
 * @param {object} file file object recieved in form data
 * @param {string} fileName name of the file which must be used
 * @param {string} pathPrefix path prefix to specify where the file must be stored
 */
const multipartFileUpload = async (file, fileName, pathPrefix) => {
  try {
    if (!file) {
      throw new APIError(
        'Upload file not found',
        ErrorKeys.UPLOAD_FILE_NOT_FOUND.key,
        ErrorKeys.UPLOAD_FILE_NOT_FOUND.statusCode,
        true,
      );
    }
    const mimeType = file.mimetype.split('/')[1];
    const data = Buffer.from(file.data, 'base64');
    const fileUrl = await AWS().s3.uploadImage(data, mimeType, fileName, pathPrefix);
    return fileUrl;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  multipartFileUpload,
};
