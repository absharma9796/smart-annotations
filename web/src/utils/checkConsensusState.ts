import { DataPoint, LabelsEntity } from "@dataTypes/datapoint.type";
import logger from "./logger";

/**
 *  1. All labels are concatenated into a single string
 *  and the count of each concatenated string is stored in a map.
 *  2. ✅ Consesus is achieved if the map with the most occurences 
 *  has at least minimum_consensus occurences 
 *  @param labels 
 *  @param minimum_consensus 
 *  @param maximum_voters 
 *  @returns {state, winners, winnerLabel}
 */
export const checkConsensusState: (labels: LabelsEntity[], minimum_consensus: number, maximum_voters: number) => {
    state: DataPoint["state"],
    winnerLabel?: string[];
    winners?: (string | number)[];
} = (
    labels,
    minimum_consensus,
    maximum_voters
) => {
    if(!Array.isArray(labels)) {
        logger.error("checkConsensusAchieved: labels is not an array");
        return;
    }

    const labelsLength = labels.length;
    let winners: (string | number)[] = [];
    if(labelsLength >= minimum_consensus) {

        const trueValueArray = labels.map(labelEntity => ({...labelEntity, label: labelEntity?.label.slice().sort().join("")}));
        let valueCountMap = {};
        trueValueArray.forEach(({user_id, label}) => {
            valueCountMap[label] = (valueCountMap[label] || 0) + 1;
        })
        const achievedConsensus = Math.max.apply(null, Object.values(valueCountMap));
        
        if(achievedConsensus >= minimum_consensus && labels?.length <= maximum_voters) {
            const winnerLabel = Object.keys(valueCountMap).filter(key => valueCountMap[key] === achievedConsensus)[0];
            winners = trueValueArray.filter(({label}) => winnerLabel === label).map(({user_id}) => user_id);
            return {state: "COMPLETE", winners, winnerLabel: Object.keys(valueCountMap).filter(key => valueCountMap[key] === achievedConsensus)};
        } else if(achievedConsensus <= minimum_consensus && labels?.length === maximum_voters) {
            return {state: "CONFLICT"}
        }
    }
    return {state: "PENDING"};
}
