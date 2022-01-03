import { Project } from '@dataTypes/project.type';
import logger from './logger';
const fs = require('fs');
const fsp = require('fs/promises');

/**
 * TODO: Convert this file into a class
 * 
 * This file contains methods to c / r / u / d items
 * stored in local filesystem and acts as local database apis.
 * 
 * Items are stored in a document fashion in json files,
 * Think of it as your naive local document db
 */

let baseURL = './src/dataTypes/';
let SchemaURLMap = Object.freeze({
    "projects": baseURL + 'projects.json',
    "users": baseURL + 'users.json',
    "datasets": baseURL + 'datasets.json',
    "datapoints": baseURL + 'datapoints.json'
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

export const findItemByIdAndPartialUpdate: <T>(schema: keyof typeof SchemaURLMap, id: string, partialUpdateData: Partial<T>) => Promise<T> = async (schema, id, partialUpdateData) => {
    
    let schemaURL = SchemaURLMap[schema];
    if(!schemaURL) {
        return `Schema ${schema} not found`;
    }

    let updatedItem: any = null;
    await fsp.readFile(schemaURL, 'utf8').then(data => {
        // logger.info("Before parsing json", typeof data);
        let currentItems = JSON.parse(data);
        let itemIndex = currentItems.findIndex(p => p?.id === id);
        if(itemIndex > -1) {
            currentItems[itemIndex] = {
                ...currentItems[itemIndex],
                ...partialUpdateData
            };
            updatedItem = currentItems[itemIndex];
            fsp.writeFile(schemaURL, JSON.stringify(currentItems, null, 2), 'utf8');
        }
    }).catch(err => {
        logger.error('Error Finding Item: ', err);
    })
    return updatedItem;
}

export const findAndUpdateItemById: <T>(schema: keyof typeof SchemaURLMap, id: string, item: T) => Promise<T> = async (schema, id, item) => {
    let schemaURL = SchemaURLMap[schema];
    if(!schemaURL) {
        return `Schema ${schema} not found`;
    }

    let updatedItem: any = null;
    await fsp.readFile(schemaURL, 'utf8').then(data => {
        let currentItems = JSON.parse(data);
        let itemIndex = currentItems.findIndex(p => p?.id === id);
        logger.debug('Item Index: ', itemIndex);
        if(itemIndex > -1) {
            currentItems[itemIndex] = item;
            updatedItem = currentItems[itemIndex];
            fsp.writeFile(schemaURL, JSON.stringify(currentItems, null, 2), 'utf8');
        }
    }).catch(err => {
        logger.error('Error Finding Item: ', err);
    })
    return updatedItem;
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