import React, {useEffect, useState} from 'react';
import {AnimalInterface} from "../../interfaces/AnimalInterface";
import {AnimalService} from "../../services/AnimalService";
import AnimalCard from "../../components/AnimalCard";
import AddAnimalForm from "../../components/forms/AddAnimalForm";
import LoginService, {UserRole} from "../../services/LoginService";
import ShelterCard from "../../components/ShelterCard";

function Animals() {
    const [isManager, setIsManager] = useState(false);
    const [animals, setAnimals] = useState<AnimalInterface[]>([]);
    const [filteredAnimals, setFilteredAnimals] = useState<AnimalInterface[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

     // Фільтри
    const [shelter, setShelter] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [breed, setBreed] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [age, setAge] = useState<string>(''); // age as a range or specific value


    const [shelterOptions, setShelterOptions] = useState<string[]>([]);
    const [genderOptions, setGenderOptions] = useState<string[]>([]);
    const [breedOptions, setBreedOptions] = useState<string[]>([]);
    const [typeOptions, setTypeOptions] = useState<string[]>([]);

    const [isAddingAnimal, setIsAddingAnimal] = useState(false);

    useEffect(() => {
        const getAll = async () => {
            try {
                const role = LoginService.getRole();
                setIsManager(role?.toUpperCase() === 'SHELTER_MANAGER');

                const response = await AnimalService.getAll();
                let shelterId = Number(LoginService.getShelterId());

                let filteredAnimals = response;
                if (shelterId) {
                    filteredAnimals = response.filter((animal) => animal.shelter.id === shelterId);
                }

                setAnimals(filteredAnimals); // Only set filtered animals
                setFilteredAnimals(filteredAnimals);

                // Extract unique options for filters
                const uniqueShelters = Array.from(new Set(response.map((animal) => animal.shelter.name)));
                const uniqueGenders = Array.from(new Set(response.map((animal) => animal.gender)));
                const uniqueBreeds = Array.from(new Set(response.map((animal) => animal.breed)));
                const uniqueTypes = Array.from(new Set(response.map((animal) => animal.type)));

                setShelterOptions(uniqueShelters);
                setGenderOptions(uniqueGenders);
                setBreedOptions(uniqueBreeds);
                setTypeOptions(uniqueTypes);
            } catch (error) {
                console.log('Error fetching animals:', error);
            }
        };

        getAll();
    }, []);


    // Фільтрація
    const filterAnimals = () => {
        let filtered = animals;

        // Фільтрація за пошуковим терміном
        if (searchTerm) {
            filtered = AnimalService.searchAnimals(filtered, searchTerm);
        }

        // Фільтрація за кожним із фільтрів
        filtered = AnimalService.filterAnimals(filtered, shelter, gender, breed, type, age);

        setFilteredAnimals(filtered);
    };

    // Виклик фільтрації при зміні будь-якого фільтра або пошукового терміну
    useEffect(() => {
        filterAnimals();
    }, [shelter, gender, breed, type, age, animals]);

    const handleAddAnimal = (newAnimal: AnimalInterface) => {
        setAnimals(prevAnimals => [...prevAnimals, newAnimal]);
        setFilteredAnimals(prevAnimals => [...prevAnimals, newAnimal]);
        setIsAddingAnimal(false); // Close the add form
    };

    return (
        <div>
            <div className='flex justify-between pb-4 px-12'>
                <div className='flex gap-2'>
                    <input
                        type="text"
                        placeholder="Пошук..."
                        className='border rounded p-2 text-sm w-60'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        onClick={filterAnimals}
                        className="bg-black text-white text-sm font-semibold px-4 py-2 rounded hover:bg-gray-800"
                    >Пошук</button>
                </div>
                <div className='flex gap-2'>
                    {isManager ? (<></>):(
                        <select
                            value={shelter}
                            onChange={(e) => setShelter(e.target.value)}
                            className='border rounded py-2 px-4 text-sm font-semibold'
                        >
                            <option value="">Притулок</option>
                            {shelterOptions.map((shelter) => (
                                <option key={shelter} value={shelter}>
                                    {shelter}
                                </option>
                            ))}
                        </select>
                    )}
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className='border rounded py-2 px-4 text-sm font-semibold'
                    >
                        <option value="">Стать</option>
                        {genderOptions.map((gender) => (
                            <option key={gender} value={gender}>
                                {gender}
                            </option>
                        ))}
                    </select>

                    <select
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                        className='border rounded py-2 px-4 text-sm font-semibold'
                    >
                        <option value="">Порода</option>
                        {breedOptions.map((breed) => (
                            <option key={breed} value={breed}>
                                {breed}
                            </option>
                        ))}
                    </select>

                    <select value={type} onChange={(e) => setType(e.target.value)} className='border rounded py-2 px-4 text-sm font-semibold'>
                        <option value="">Тип</option>
                        {typeOptions.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>

                    <select value={age} onChange={(e) => setAge(e.target.value)} className='border rounded py-2 px-4 text-sm font-semibold'>
                        <option value="">Вік</option>
                        <option value={1}>До 1 року</option>
                        <option value={3}>До 3 років</option>
                        <option value={5}>До 5 років</option>
                        <option value={10}>До 10 років</option>
                    </select>
                </div>
                {LoginService.getRole() == UserRole.SHELTER_MANAGER ? (
                    <button onClick={() => setIsAddingAnimal(true)} className="bg-black text-white text-sm font-semibold px-4 py-2 rounded hover:bg-gray-800">+</button>
                ) : (<></>)}
            </div>
            {isAddingAnimal && (
                <AddAnimalForm
                    onAdd={handleAddAnimal}
                    onCancel={() => setIsAddingAnimal(false)}
                />
            )}

            <div className='grid grid-cols-4 gap-5 p-12'>
                {filteredAnimals.map(animal => (
                    <AnimalCard key={animal.id} animal={animal}/>
                ))}
            </div>
        </div>
    );
}

export default Animals;
