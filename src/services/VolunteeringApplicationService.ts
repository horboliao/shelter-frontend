import axios, {AxiosResponse} from "axios";
import {VolunteeringApplicationInterface} from "../interfaces/VolunteeringApplicationInterface";

const URL = 'http://localhost:8080/api/v1/volunteering-applications'

export class VolunteeringApplicationService {
    static async getAll(): Promise<VolunteeringApplicationInterface[]> {
        try {
            const response: AxiosResponse<VolunteeringApplicationInterface[]> = await axios.get(URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching volunteering-applications:', error);
            throw error;
        }
    }

    static async getAllOfOneVolunteering(id: number): Promise<VolunteeringApplicationInterface[]> {
        try {
            const response: AxiosResponse<VolunteeringApplicationInterface[]> = await axios.get(URL);
            // Filter applications based on the volunteeringId
            return response.data.filter(application => application.volunteeringId === id);
        } catch (error) {
            console.error(`Error fetching applications for volunteering ID ${id}:`, error);
            throw error;
        }
    }

    static async getOne(id: number): Promise<VolunteeringApplicationInterface> {
        const urlId = `${URL}/${id}`;
        try {
            const response: AxiosResponse<VolunteeringApplicationInterface> = await axios.get(urlId);
            return response.data;
        } catch (error) {
            console.error('Error fetching volunteering-applications:', error);
            throw error;
        }
    }

    static async create(data: Partial<VolunteeringApplicationInterface>): Promise<VolunteeringApplicationInterface> {
        try {
            const response: AxiosResponse<VolunteeringApplicationInterface> = await axios.post(URL, data);
            return response.data;
        } catch (error) {
            console.error('Error creating volunteering-applications:', error);
            throw error;
        }
    }
}
