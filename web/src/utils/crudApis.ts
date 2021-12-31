import { Project } from '@dataTypes/project.type';
import logger from './logger';
const fs = require('fs');
const fsp = require('fs/promises');

let baseURL = './src/dataTypes/';
let SchemaURLMap = Object.freeze({
    "projects": baseURL + 'projects.json',
    "users": baseURL + 'users.json',
    "datasets": baseURL + 'datasets.json',
});
export const Schemas = Object.keys(SchemaURLMap).map(key => ({key: key}));

type FunctionResponse = {success: boolean, message?: string}

export const addItem: <T>(schema: keyof typeof SchemaURLMap, item: T | any) => Promise<FunctionResponse> = async (schema, item) => {
    let response: FunctionResponse = {success: false};
    let schemaURL = SchemaURLMap[schema];

    if(!schemaURL) {
        response.message = `Schema ${schema} not found`;
        return response;
    }

    const currentItems: (typeof item)[] = JSON.parse(fs.readFileSync(schemaURL, 'utf8'));
    if(!currentItems.find(p => p?.id === item?.id)) {
        currentItems.push(item);
        await fsp.writeFile(schemaURL, JSON.stringify(currentItems, null, 2), 'utf8').then(() => {
            response.success = true;
        }).catch(err => {
            response.success = false;
            response.message = err.message;
            logger.error('Error Adding Item: ', err);
        })
    }
    return response;
}

export const readItems: <T>(schema: keyof typeof SchemaURLMap) => Promise<T[] | string> = async (schema) => {
    let schemaURL = SchemaURLMap[schema];
    if(!schemaURL) {
        return `Schema ${schema} not found`;
    }
    let items: any[] = [];

    await fsp.readFile(schemaURL, 'utf8').then(data => {
        items = JSON.parse(data);
    }).catch(err => {
        logger.error('Error Reading Items: ', err);
    })
    return items;
}

export const findItemById: <T>(schema: keyof typeof SchemaURLMap, id: string) => Promise<T> = async (schema, id) => {
    let schemaURL = SchemaURLMap[schema];
    if(!schemaURL) {
        return `Schema ${schema} not found`;
    }

    let item: any = null;
    await fsp.readFile(schemaURL, 'utf8').then(data => {
        item = JSON.parse(data).find(p => p?.id === id);
    }).catch(err => {
        logger.error('Error Finding Item: ', err);
    })
    return item;
}

export const deleteItemById: (schema: keyof typeof SchemaURLMap, id: string) => Promise<FunctionResponse | string> = async (schema, id) => {
    let schemaURL = SchemaURLMap[schema];
    if(!schemaURL) {
        return `Schema ${schema} not found`;
    }

    let response: FunctionResponse = {success: false};
    const currentItems = JSON.parse(fs.readFileSync(schemaURL, 'utf8'));
    if(currentItems.find(p => p?.id === id)) {
        currentItems.splice(currentItems.findIndex(p => p?.id === id), 1);
        await fsp.writeFile(schemaURL, JSON.stringify(currentItems, null, 2), 'utf8').then(() => {
            response.success = true;
        }).catch(err => {
            response.success = false;
            response.message = err.message;
            logger.error('Error Deleting Item: ', err);
        })
    }
    return response;
}