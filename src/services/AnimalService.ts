import axios, {AxiosResponse} from "axios";
import {AnimalInterface, CreateAnimalInterface} from "../interfaces/AnimalInterface";
import {Utils} from "./Utils";

const URL = 'http://localhost:8080/api/v1/animals'

export class AnimalService {
   static async getAll(): Promise<AnimalInterface[]> {
        try {
            const response: AxiosResponse<AnimalInterface[]> = await axios.get(URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching animals:', error);
            throw error;
        }
    }

    static async getOne(id: string): Promise<AnimalInterface> {
        const urlId = `${URL}/${id}`;
        try {
            const response: AxiosResponse<AnimalInterface> = await axios.get(urlId);
            return response.data;
        } catch (error) {
            console.error('Error fetching animal:', error);
            throw error;
        }
    }

    static async create(data: Partial<CreateAnimalInterface>): Promise<AnimalInterface> {
        try {
            const response: AxiosResponse<AnimalInterface> = await axios.post(URL, data);
            return response.data;
        } catch (error) {
            console.error('Error creating animal:', error);
            throw error;
        }
    }

    static async update(id: number, data: Partial<AnimalInterface>): Promise<AnimalInterface> {
        const urlId = `${URL}/${id}`;
        try {
            const response = await axios.patch<AnimalInterface>(urlId, data);
            return response.data as AnimalInterface;
        } catch (error) {
            console.error('Error updating animal:', error);
            throw error;
        }
    }

    static async delete(id: number): Promise<void> {
        const urlId = `${URL}/${id}`;
        try {
            await axios.delete(urlId);
            console.log(`Animal with ID ${id} deleted successfully`);
        } catch (error) {
            console.error('Error deleting animal:', error);
            throw error;
        }
    }


    // getAvailableAnimals(animals: AnimalInterface[]): AnimalInterface[] {
    //     return animals.filter(animal => animal.status === 'AVAILABLE');
    // }

    static filterAnimals(animals: AnimalInterface[], shelter: string, gender: string, breed: string, type: string, age: string): AnimalInterface[] {
        let filtered = animals;

        if (shelter) {
            filtered = filtered.filter(animal => animal.shelter?.name.toLowerCase().includes(shelter.toLowerCase()));
        }
        if (gender) {
            filtered = filtered.filter(animal => animal.gender.toLowerCase() === gender.toLowerCase());
        }
        if (breed) {
            filtered = filtered.filter(animal => animal.breed.toLowerCase().includes(breed.toLowerCase()));
        }
        if (type) {
            filtered = filtered.filter(animal => animal.type.toLowerCase() === type.toLowerCase());
        }
        if (age) {
            filtered = filtered.filter(animal => {
                const animalAge = Utils.calculateAge(animal.birthDate);
                return animalAge <= parseInt(age);
            });
        }

        return filtered;
    }

    static searchAnimals(animals: AnimalInterface[], searchTerm: string): AnimalInterface[] {
        if (!searchTerm) return animals;

        return animals.filter(animal =>
            animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            animal.shelter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            animal.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
            animal.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
            animal.type.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

}
