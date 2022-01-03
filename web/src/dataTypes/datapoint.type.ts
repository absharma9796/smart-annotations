export type DataPoint = {
    id: string | number;
    dataset_id: string | number;
    audio: string;
    created_on: string;
    last_updated_on: string;
    alternatives?: ((AlternativesEntityEntity)[] | null)[] | null;
    tagged_by?: number | null;
    labels?: (LabelsEntity)[] | null;
    reviewer_labels?: LabelsEntity| null;
    score: number;
    state: DatapointState;
    is_delete: boolean;
}

export type AlternativesEntityEntity = {
    transcript: string;
    confidence: number;
}

export type LabelsEntity = {
    user_id: (string | number);
    label?: (string)[] | null;
}

type DatapointState = "PENDING" | "COMPLETE" | "CONFLICT";
  