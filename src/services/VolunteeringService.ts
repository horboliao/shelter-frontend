import axios, {AxiosResponse} from "axios";
import {CreateVolunteeringInterface, VolunteeringInterface} from "../interfaces/VolunteeringInterface";

const URL = 'http://localhost:8080/api/v1/volunteerings'

export class VolunteeringService {
    static async getAll(): Promise<VolunteeringInterface[]> {
        try {
            const response: AxiosResponse<VolunteeringInterface[]> = await axios.get(URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching volunteerings:', error);
            throw error;
        }
    }

    static async getOne(id: number): Promise<VolunteeringInterface> {
        const urlId = `${URL}/${id}`;
        try {
            const response: AxiosResponse<VolunteeringInterface> = await axios.get(urlId);
            return response.data;
        } catch (error) {
            console.error('Error fetching volunteering:', error);
            throw error;
        }
    }

    static async create(data: CreateVolunteeringInterface): Promise<VolunteeringInterface> {
        try {
            const response: AxiosResponse<VolunteeringInterface> = await axios.post(URL, data);
            return response.data;
        } catch (error) {
            console.error('Error creating volunteering:', error);
            throw error;
        }
    }

    static async delete(id: number): Promise<void> {
        const urlId = `${URL}/${id}`;
        try {
            await axios.delete(urlId);
            console.log(`Volunteering with ID ${id} deleted successfully`);
        } catch (error) {
            console.error('Error deleting volunteering:', error);
            throw error;
        }
    }

    static filterVolunteerings(
        volunteerings: VolunteeringInterface[],
        city: string,
        date: string,
        shelter: string
    ): VolunteeringInterface[] {
        let filtered = volunteerings;
console.log(date)
        if (city) {
            filtered = filtered.filter(volunteering =>
                volunteering.shelter.city.toLowerCase().includes(city.toLowerCase())
            );
        }
        if (date) {
            filtered = filtered.filter(volunteering => {
                    const volunteeringDate = new Date(volunteering.startDateTime).toISOString().split('T')[0];

                    return volunteeringDate === date;
                }
            );
        }
        if (shelter) {
            filtered = filtered.filter(volunteering =>
                volunteering.shelter?.name.toLowerCase().includes(shelter.toLowerCase())
            );
        }

        return filtered;
    }

    static searchVolunteerings(volunteerings: VolunteeringInterface[], searchTerm: string): VolunteeringInterface[] {
        if (!searchTerm) return volunteerings;

        return volunteerings.filter(volunteering =>
            volunteering.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            volunteering.shelter.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            volunteering.shelter.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
}
