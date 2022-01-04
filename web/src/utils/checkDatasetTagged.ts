import { DataPoint } from "@dataTypes/datapoint.type"
import logger from "./logger"

export const checkDatasetTagged: (datapoints: DataPoint[]) => boolean = (
    datapoints
) => {
    if(!Array.isArray(datapoints)) {
        logger.error("checkDatasetTagged: datapoints is not an array");
        return false;
    }
    if(datapoints.filter((datapoint) => datapoint.state !== "PENDING").length === datapoints.length) {
        return true;
    }
    return false;
}