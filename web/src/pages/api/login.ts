import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Axios from 'axios';
import { ApiResponse } from 'src/dataTypes/api.type';
import { SampleEmailPassMap, SampleUsers } from 'src/dataTypes/user.type';
import logger from 'src/utils/logger';

/**
 * Server Side Request Handlers
 */
const handler = nc<NextApiRequest, NextApiResponse>();

/**
 * /login POST endpoint - server side
 */
handler.post(async (req, res) => {

    logger.debug(req.body);
    const email: string = req.body?.email;
    const password: string = req.body?.password;

    if(!email || !password) {
        res.status(400).json({
            success: false,
            message: 'Email and password are required'
        });
        return;
    }
    if(SampleUsers.map(user => user.email.toLowerCase()).includes(email.toLowerCase())) {
        if(SampleEmailPassMap[email.toLowerCase()] === password) {
            res.status(200).json({
                success: true,
                data: {
                    token: process.env.API_ACCESS_TOKEN,
                    user: SampleUsers.find(user => user.email.toLowerCase() === email.toLowerCase())
                }
            });
        }
        return;
    }
})

export default handler;

/**
 * Client Side Request Handlers
 */
export const login__api: (email: string, password: string) => Promise<ApiResponse<any>> = async (email, password) => {
    const url = '/api/login';
    let result: ApiResponse<any> = {
        success: false,
    }
    await Axios.post(url, { email, password }).then(response => {
        result = {...result, ...response.data};
    }).catch(error => {
        result = {...result, message: error.message};
    })
    return result;
}