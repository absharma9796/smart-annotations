import { DataPoint, LabelsEntity } from "@dataTypes/datapoint.type";
import { getUsers__api } from "src/pages/api/users";
import { updateUser__api } from "src/pages/api/users/[user_id]";

/**
 * Given an array of winners, increases the average
 * score of the winners
 * @param winners 
 * @returns boolean
 */
export const rewardUserScore = async (winners: (string | number)[]) => {
    const {success , data: users} = await getUsers__api();
    if(success) {
        winners.forEach(winner => {
            const user = users.find(user => user.id === winner);
            let newScore;
            if(user) {
                newScore = (user?.score*user?.annotated_count + 1) / Math.max(1, user?.annotated_count + 1);

                updateUser__api({
                    user_id: user?.id,
                    data: {
                        score: newScore
                    }
                });
            }
        })
        return true;
    }
    return false;
}