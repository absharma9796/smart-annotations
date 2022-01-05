import { DataPoint, LabelsEntity } from "@dataTypes/datapoint.type";
import { getUsers__api } from "src/pages/api/users";
import { updateUser__api } from "src/pages/api/users/[user_id]";

/**
 * Given a user_id, increases 
 * the annotated_count of that user
 * @param winners 
 * @returns boolean
 */
export const increaseAnnotationCountForUser = async (user_id: (string | number), previousAnnotatedCount: number) => {

    if(!user_id) {
        return false;
    }
    await updateUser__api({
        user_id,
        data: {
            annotated_count: previousAnnotatedCount + 1
        }
    });
}
