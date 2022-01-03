import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Axios from 'axios';
import { ApiResponse, ExtendedRequest } from 'src/dataTypes/api.type';
import logger from '@utils/logger';
import { authenticationMiddleware } from 'src/middlewares/authentication.mw';
import { addItem, readItems } from '@utils/crudApis';
import { DataPoint } from '@dataTypes/datapoint.type';
import fs from 'fs';
import { fileParserMiddleware } from 'src/middlewares/fileParser.mw';
import crypto from 'crypto';

/**
 * Server Side Request Handlers
 */
const handler = nc<ExtendedRequest, NextApiResponse>();
handler.use(authenticationMiddleware, fileParserMiddleware);
/**
 * /data GET endpoint - server side 
 *  Gives a list of datapoints
 */
handler.get(async (req, res) => {
    logger.info('GET /data', req.query);
    const dataset_id = req.query?.dataset_id as string;
    logger.info(`GET /data?dataset_id=${dataset_id}`);
    if(!dataset_id) {
        res.status(400).json({
            success: false,
            message: "dataset_id is required"
        })
        return;
    }

    let datapoints = null;
    try {

        datapoints = await readItems("datapoints");
        logger.info({datapoints});
        if(Array.isArray(datapoints)) {
            const requestedDatapoints = datapoints.filter(data => (data?.dataset_id === dataset_id) && !data?.is_deleted);
            res.status(200).json({
                success: true,
                data: requestedDatapoints
            });
            return;
        }

        res.status(404).json({
            success: true,
            message: datapoints
        });
        return;

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
    return;
})

/**
 * /data POST endpoint - server side 
 *  Uploads and creates data points (files) in local db
*/
handler.post(async (req, res) => {
    const { dataset_id } = req?.body;
    const files = req?.files;
    logger.debug("Inside post", dataset_id);
    if(!dataset_id) {
        res.status(400).json({
            success: false,
            message: "dataset_id is required"
        })
        return;
    }
    let newFileNamesArray = [];
    files.forEach((file, idx) => {
        const currentTime = new Date().toISOString();
        const newFileName = `${dataset_id}__${currentTime}__${file?.originalFilename}`;
        fs.rename(file.path, `public/uploads/${newFileName}`, (err) => {
            if(err) {
                logger.error(err);
            }
            logger.info(idx, "Adding data point to db: ", newFileName);
            newFileNamesArray.push(newFileName);
            addItem<DataPoint>("datapoints", {
                id: crypto.randomUUID(),
                dataset_id: dataset_id[0],
                audio: `/uploads/${newFileName}`,
                created_on: currentTime,
                last_updated_on: currentTime,
                alternatives: null,
                tagged_by: 0,
                labels: [],
                score: 0.0,
                state: "PENDING",
                is_deleted: false
            })
            logger.info(`File uploaded to ${newFileName}`);
        })
    });
    logger.log({newFileNamesArray});
    res.status(200).json({
        success: true,
    });
    return;
})

export const config = {
    api: {
      bodyParser: false
    }
}
  
export default handler;


//*********************************
//  Client Side Request Handlers **
//*********************************

/**
 * GET: Fetches Data Points for a given dataset - Client Side
 */
type GetDataPointsApiProps = {
    dataset_id?: string | number;
}
export const getDataPoints__api: (args: GetDataPointsApiProps) => Promise<ApiResponse<DataPoint[]>> = async ({
    dataset_id
}) => {
    const url = '/api/data';
    let result: ApiResponse<DataPoint[]> = {
        success: false,
    }

    const params = new URLSearchParams();
    params.append("dataset_id", `${dataset_id}`);

    await Axios.get(url, {
        params
    }).then(response => {
        result = {...result, ...response.data};
    }).catch(error => {
        result = {...result, message: error.message};
    })
    return result;
}


/**
 * POST: Upload data points with files for a given dataset - Client Side
 */
type UploadDataPointsApiProps = {
    dataset_id: string | number;
    files: any[];
}
export const uploadDataPoints__api: (args: UploadDataPointsApiProps) => Promise<ApiResponse> = async ({
    dataset_id,
    files
}) => {
    const url = '/api/data';
    let result: ApiResponse = {
        success: false
    }

    const formData = new FormData();
    formData.append("dataset_id", `${dataset_id}`); 
    files.forEach(file => {
        formData.append("files", file)
    });

    await Axios.post(url, formData, {
        headers: {
            "content-type": "multipart/form-data"
        }
    }).then(response => {
        result = {...result, ...response.data};
    }).catch(error => {
        result = {...result, message: error.message};
    })
    return result;
}