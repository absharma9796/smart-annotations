import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Axios from 'axios';
import { ApiResponse, ExtendedRequest } from 'src/dataTypes/api.type';
import { SampleEmailPassMap, SampleUsers, User } from 'src/dataTypes/user.type';
import logger from '@utils/logger';
import { authenticationMiddleware } from 'src/middlewares/authentication.mw';
import { readItems } from '@utils/crudApis';

/**
 * Server Side Request Handlers
 */
const handler = nc<ExtendedRequest, NextApiResponse>();
handler.use(authenticationMiddleware);
/**
 * /login POST endpoint - server side
 */
handler.get(async (req, res) => {

    const users = await readItems<User>('users');
    const user = Array.isArray(users) ? users.find(user => user.email.toLowerCase() === req.email.toLowerCase()) : undefined;
    if(!user) {
        res.status(404).json({
            success: false,
            message: 'User Not Found'
        });
        return;
    }
    res.status(200).json({
        success: true,
        data: user
    });
    return;
})

export default handler;

/**
 * Client Side Request Handlers
 */
export const getLoggedInUserDetails__api: () => Promise<ApiResponse<any>> = async () => {
    const url = '/api/users/me';
    let result: ApiResponse<any> = {
        success: false,
    }
    await Axios.get(url).then(response => {
        result = {...result, ...response.data};
    }).catch(error => {
        result = {...result, message: error.message};
    })
    return result;
}