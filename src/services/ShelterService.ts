import axios, {AxiosResponse} from "axios";
import {ShelterInterface} from "../interfaces/ShelterInterface";

const URL = 'http://localhost:8080/api/v1/shelters'

export class ShelterService{
    static async getAll(): Promise<ShelterInterface[]> {
        try {
            const response: AxiosResponse<ShelterInterface[]> = await axios.get(URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching shelters:', error);
            throw error;
        }
    }

    static async getOne(id: string): Promise<ShelterInterface> {
        const urlId = `${URL}/${id}`;
        try {
            const response: AxiosResponse<ShelterInterface> = await axios.get(urlId);
            return response.data;
        } catch (error) {
            console.error('Error fetching shelter:', error);
            throw error;
        }
    }

    static async create(data: Partial<ShelterInterface>): Promise<ShelterInterface> {
        try {
            const response: AxiosResponse<ShelterInterface> = await axios.post(URL, data);
            return response.data;
        } catch (error) {
            console.error('Error creating shelter:', error);
            throw error;
        }
    }

    static async update(id: number, data: Partial<ShelterInterface>): Promise<ShelterInterface> {
        const urlId = `${URL}/${id}`;
        try {
            const response = await axios.put<ShelterInterface>(urlId, data);
            return response.data as ShelterInterface;
        } catch (error) {
            console.error('Error updating shelter:', error);
            throw error;
        }
    }
}
