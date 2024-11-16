export interface AnimalApplicationInterface {
    id: number;
    name: string;
    phone: string;
    status: AnimalApplicationStatus;
    animalId: number;
    email: string;
    motivationLetter: string;
}

export enum AnimalApplicationStatus {
    CREATED = "CREATED",
    APPROVED = "APPROVED",
    DECLINED = "DECLINED",
    UNKNOWN = "UNKNOWN",
}
