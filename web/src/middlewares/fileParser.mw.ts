import { NextApiResponse } from 'next';
import { ExtendedRequest } from '../dataTypes/api.type';
import multiparty from 'multiparty';
import logger from '@utils/logger';

export const fileParserMiddleware = async (req: ExtendedRequest, res: NextApiResponse, next) => {
    
    if(req.method.toLowerCase() === "post") {
        logger.info('######### File parser middleware #########');

        const form = new multiparty.Form({
            autoFiles: true,
            uploadDir: "./public/uploads"
        });

        form.parse(req, async (err, fields, files) => {
            if(err) {
                logger.error('Error parsing file', err);
                res.status(400);
                return res.json({
                    success: false,
                    message: 'MW Error parsing file'
                })
            }
            logger.info('MW Body', fields);
            req.body = fields;
            req.files = files?.files;
            next();
        })
    } else {
        next();
    }
}