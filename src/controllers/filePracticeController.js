/* eslint-disable consistent-return */

import AWS from 'aws-sdk';
import Busboy from 'busboy';
import { INTERNAL_SERVER_ERROR, BAD_REQUEST, OK } from 'http-status';

import responseHelper from '../Helpers/responseHelper';

const s3bucket = new AWS.S3({
  Bucket: 'rivopets',
  accessKeyId: 'AKIAVPPMXB5IOX5XGBXV',
  secretAccessKey: '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',
});

const uploadToS3 = (file, res) => {
  try {
    s3bucket.createBucket(() => {
      const params = {
        Bucket: 'rivopets',
        Key: `${new Date().toGMTString()}-${file.name}`,
        Body: file.data,
      };

      s3bucket.upload(params, (err, data) => {
        if (err) {
          responseHelper.handleSuccess(BAD_REQUEST, err);
          return responseHelper.response(res);
        }

        responseHelper.handleSuccess(OK, 'File uploaded successfully', data);
        return responseHelper.response(res);
      });
    });

    return;
  } catch (error) {
    responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseHelper.response(res);
  }
};
class FileController {
  static async uploadFile(req, res) {
    const busboy = new Busboy({ headers: req.headers });
    busboy.on('finish', () => { req.files.element2.map((element) => uploadToS3(element, res)); });
    req.pipe(busboy);
  }
}

export default FileController;
