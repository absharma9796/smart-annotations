import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Axios from 'axios';
import { ApiResponse, ExtendedRequest } from 'src/dataTypes/api.type';
import { SampleEmailPassMap, SampleUsers } from 'src/dataTypes/user.type';
import logger from '@utils/logger';
import { authenticationMiddleware } from 'src/middlewares/authentication.mw';
import { User } from '@dataTypes/user.type';
import { readItems } from '@utils/crudApis';

/**
 * Server Side Request Handlers
 */
const handler = nc<ExtendedRequest, NextApiResponse>();
handler.use(authenticationMiddleware);
/**
 * /users GET endpoint - server side 
 *  Gives a list of users
 */
handler.get(async (req, res) => {
    let users = null;
    try {
        users = await readItems("users");
        if(users) {
            res.status(200).json({
                success: true,
                data: users
            });
            return;
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
    return;
})

export default handler;

/**
 * Client Side Request Handlers
 */
export const getUsers__api: () => Promise<ApiResponse<User[]>> = async () => {
    const url = '/api/users';
    let result: ApiResponse<User[]> = {
        success: false,
    }
    await Axios.get(url).then(response => {
        result = {...result, ...response.data};
    }).catch(error => {
        result = {...result, message: error.message};
    })
    return result;
}