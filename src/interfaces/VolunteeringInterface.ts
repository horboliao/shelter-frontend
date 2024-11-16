import {ShelterInterface} from "./ShelterInterface";

export interface VolunteeringInterface {
    id: number;
    name: string;
    description: string;
    startDateTime: Date; // Use ISO 8601 format (string) or Date type
    endDateTime: Date;   // Use ISO 8601 format (string) or Date type
    address: string;
    requiredPeople: number;
    shelter: ShelterInterface;
}

export interface CreateVolunteeringInterface {
    name: string;
    description: string;
    startDateTime: string; // ISO 8601 format (e.g., "2024-10-01T09:00:00")
    address: string;
    requiredPeople: number;
    shelterId: number;
}


