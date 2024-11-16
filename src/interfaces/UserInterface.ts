import {ShelterInterface} from "./ShelterInterface";

enum Role {
    ADMIN = "ADMIN",
    UNKNOWN = "UNKNOWN",
    SHELTER_MANAGER = "SHELTER_MANAGER"
}

export interface UserInterface {
    id: number;
    email: string;
    role: Role;
    shelter?: ShelterInterface;
}

