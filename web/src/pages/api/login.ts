import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Axios from 'axios';

/**
 * Server Side Request Handlers
 */
const handler = nc<NextApiRequest, NextApiResponse>();

/**
 * /login POST endpoint - server side
 */
handler.post(async (req, res) => {
    const { email, password } = req.body;
})

export default handler;

/**
 * Client Side Request Handlers
 */
export const login__api = async (email: string, password: string) => {
    const url = '/api/login';
    let result = {
        success: false,
    }
    await Axios.post(url, { email, password }).then(response => {
        result.success = response.data.success;
    }).catch(error => {
        result = {...result, message: error.message};
    })
    return result;
}