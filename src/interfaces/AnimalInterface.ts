import {ShelterInterface} from "./ShelterInterface";

export interface AnimalInterface {
    id: number;
    name: string;
    gender: string;
    birthDate: string;
    type: string;  // Could be 'DOG' / 'CAT'
    status: string;  // Could be 'AVAILABLE', 'ADOPTED'
    breed: string;
    description: string;
    medicalCondition: string;
    photoLink: string;
    shelter: ShelterInterface;
}

export interface CreateAnimalInterface {
    name: string;
    gender: string;
    birthDate: string;
    type: string;  // 'DOG' / 'CAT'
    breed: string;
    description: string;
    medicalCondition: string;
    photoLink: string;
    shelterId: number;
}
