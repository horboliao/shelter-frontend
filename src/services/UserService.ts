import axios, {AxiosResponse} from "axios";
import {UserInterface} from "../interfaces/UserInterface";

const URL = 'http://localhost:8080/api/v1/users'

export class UserService{
    static async getAll(): Promise<UserInterface[]> {
        try {
            const response: AxiosResponse<UserInterface[]> = await axios.get(URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    static async getUserByEmail(email: string): Promise<UserInterface | null> {
        try {
            const response: AxiosResponse<UserInterface[]> = await axios.get(URL);
            const users = response.data;
            const user = users.find((user) => user.email == email) || null;
            return user;
        } catch (error) {
            console.error("Error fetching user by email:", error);
            throw error;
        }
    }

    static async delete(userId: number): Promise<void> {
        try {
            const deleteUrl = `${URL}/${userId}`;
            await axios.delete(deleteUrl);
            console.log(`User with ID ${userId} deleted successfully.`);
        } catch (error) {
            console.error(`Error deleting user with ID ${userId}:`, error);
            throw error;
        }
    }

    static async add(data: { email: string, password: string, role?: string}) {
        const URL = 'http://localhost:8080/api/v1/auth/registration'
        try {
            if (!data.role) { data.role = "SHELTER_MANAGER"; }
            const response: AxiosResponse<UserInterface> = await axios.post(URL, data);
            console.log('User added successfully:', response.data);
            //return response.data;
        } catch (error) {
            console.error('Error adding user:', error);
            throw error;
        }
    }
}
