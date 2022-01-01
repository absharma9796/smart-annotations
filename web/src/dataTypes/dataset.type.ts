export interface Dataset {
    id: number | string;
    source: number | string;
    description: string;
    type?: (number)[] | null;
    labels: (string)[] | null;
    label_colors?: (string)[] | null;
    created_on: string;
    modified_on: string;
    maximum_voters: number;
    minimum_voters: number;
    minimum_consensus: number;
    is_tagged: boolean;
    is_delete: boolean;
    name: string;
    data_type: AcceptableDatasetType;
}

export type AcceptableDatasetType = 'audio' | 'text';
  