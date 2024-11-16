import { UserInterface } from "../interfaces/UserInterface";
import axios, { AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";
import {UserService} from "./UserService";

export enum UserRole {
    ADMIN = "ADMIN",
    SHELTER_MANAGER = "SHELTER_MANAGER"
}

export interface LoginResponse {
    accessToken: string;
}

export interface DecodedToken {
    sub: string;
    iat: number;
    exp: number;
    role: UserRole;
}

export default class LoginService {
    static async login(email: string, password: string): Promise<DecodedToken> {
        const url = "http://localhost:8080/api/v1/auth/authenticate";
        try {
            const response: AxiosResponse<LoginResponse> = await axios.post(url, {
                email,
                password,
            });
            const { accessToken } = response.data;
            // @ts-ignore
            const decodedToken: DecodedToken = jwtDecode(accessToken);
            console.log(decodedToken);
            localStorage.clear();
            console.log(localStorage.getItem("shelterId"));
            let user = await this.getShelterManagerUser(decodedToken.sub, decodedToken.role)
            if (user){
                // @ts-ignore
                localStorage.setItem("shelterId", user.shelter?.id);
            }
            localStorage.setItem("role", decodedToken.role);
            localStorage.setItem("email", decodedToken.sub);
            return decodedToken;
        } catch (error) {
            console.error("Error during login:", error);
            throw error;
        }
    }

    static getRole(): UserRole | null {
        const role = localStorage.getItem("role");
        return role as UserRole || null;
    }

    static getEmail(): string | null {
        return localStorage.getItem("email");
    }

    static getShelterId(): string | null {
        return localStorage.getItem("shelterId");
    }

    static async getShelterManagerUser(email: string, role: string): Promise<UserInterface | null> {

        if (role === UserRole.SHELTER_MANAGER) {
            let user = await UserService.getUserByEmail(email);
            return user
        }
        console.log("User is not a shelter manager or email is missing");
        return null;
    }
}
