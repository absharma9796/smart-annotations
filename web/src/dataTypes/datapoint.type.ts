export interface DataPoint {
    id: number;
    dataset_id: number;
    audio: string;
    created_on: string;
    last_updated_on: string;
    alternatives?: ((AlternativesEntityEntity)[] | null)[] | null;
    tagged_by?: (number)[] | null;
    labels?: (LabelsEntity)[] | null;
    score: number;
    state: string;
    is_delete: boolean;
}

export interface AlternativesEntityEntity {
transcript: string;
confidence: number;
}

export interface LabelsEntity {
user_id: number;
label?: (string)[] | null;
}
  