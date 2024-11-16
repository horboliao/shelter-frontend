import axios, {AxiosResponse} from "axios";
import {AnimalInterface} from "../interfaces/AnimalInterface";
import {AnimalApplicationInterface} from "../interfaces/AnimalApplicationInterface";

const URL = 'http://localhost:8080/api/v1/animal-applications'

export class AnimalApplicationService {
    static async getAll(): Promise<AnimalApplicationInterface[]> {
        try {
            const response: AxiosResponse<AnimalApplicationInterface[]> = await axios.get(URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching animals-applications:', error);
            throw error;
        }
    }

    static async getAllOfOneAnimal(animalId: number): Promise<AnimalApplicationInterface[]> {
        const urlId = `${URL}/animal/${animalId}`;
        try {
            const response: AxiosResponse<AnimalApplicationInterface[]> = await axios.get(URL);
            return response.data
        } catch (error) {
            console.error(`Error fetching applications for animal ID ${animalId}:`, error);
            throw error;
        }
    }

    static async getOne(id: string): Promise<AnimalApplicationInterface> {
        const urlId = `${URL}/${id}`;
        try {
            const response: AxiosResponse<AnimalApplicationInterface> = await axios.get(urlId);
            return response.data;
        } catch (error) {
            console.error('Error fetching animals-applications:', error);
            throw error;
        }
    }

    static async create(data: Partial<AnimalApplicationInterface>): Promise<AnimalApplicationInterface> {
        try {
            const response: AxiosResponse<AnimalApplicationInterface> = await axios.post(URL, data);
            return response.data;
        } catch (error) {
            console.error('Error creating animals-applications:', error);
            throw error;
        }
    }
}
