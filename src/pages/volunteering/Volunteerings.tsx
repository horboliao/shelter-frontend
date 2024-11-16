import React, {useEffect, useState} from 'react';
import {CreateVolunteeringInterface, VolunteeringInterface} from "../../interfaces/VolunteeringInterface";
import {VolunteeringService} from "../../services/VolunteeringService";
import VolunteeringCard from "../../components/VolunteeringCard";
import AddVolunteeringForm from "../../components/forms/AddVolunteeringForm";
import LoginService, {UserRole} from "../../services/LoginService";
import ShelterCard from "../../components/ShelterCard";

function Volunteerings() {
    const [volunteerings, setVolunteerings] = useState<VolunteeringInterface[]>([]);
    const [filteredVolunteerings, setFilteredVolunteerings] = useState<VolunteeringInterface[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>(''); // Для пошуку
    const [city, setCity] = useState<string>(''); // Для фільтра міста
    const [date, setDate] = useState<string>(''); // Для фільтра по даті
    const [shelter, setShelter] = useState<string>('');
    const [showAddForm, setShowAddForm] = useState<boolean>(false);

    const [cityOptions, setCityOptions] = useState<string[]>([]);
    const [shelterOptions, setShelterOptions] = useState<string[]>([]);

    useEffect(() => {
        const getAll = async () => {
            try {
                let response = await VolunteeringService.getAll();
                console.log('Fetched Volunteerings:', response);

                let id = Number(LoginService.getShelterId());
                if (id) {
                    response = response.filter(v => v.shelter.id == id);
                }
                setVolunteerings(response);
                setFilteredVolunteerings(response);

// Extract unique options
                setCityOptions(Array.from(new Set(response.map(v => v.shelter?.city || ''))));
                setShelterOptions(Array.from(new Set(response.map(v => v.shelter?.name || ''))));

            } catch (error) {
                console.log('Error fetching volunteerings:', error);
            }
        };

        getAll();
    }, []);

    const filterVolunteerings = () => {
        let filtered = volunteerings;

        // Пошуковий термін
        if (searchTerm) {
            filtered = VolunteeringService.searchVolunteerings(filtered, searchTerm);
        }

        // Фільтрація за містом, датою та притулком
        filtered = VolunteeringService.filterVolunteerings(filtered, city, date, shelter);

        setFilteredVolunteerings(filtered);
    };

    const handleDateFilter = () => {
        filterVolunteerings();
    };

    // Виклик фільтрації при зміні фільтрів або пошукового терміну
    useEffect(() => {
        filterVolunteerings();
    }, [city, shelter, volunteerings]);

    const handleAddVolunteering = async (newVolunteering: CreateVolunteeringInterface) => {
        try {
            const createdVolunteering = await VolunteeringService.create(newVolunteering);
            setVolunteerings(prev => [...prev, createdVolunteering]); // Update list with new item
            setShowAddForm(false); // Close the form after submission
        } catch (error) {
            console.log('Error creating volunteering:', error);
        }
    };

    const handleDeleteVolunteering = (id: number) => {
        setVolunteerings((prev) => prev.filter(volunteering => volunteering.id !== id));
        setFilteredVolunteerings((prev) => prev.filter(volunteering => volunteering.id !== id));
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
                    <button onClick={filterVolunteerings} className="bg-black text-white text-sm font-semibold px-4 py-2 rounded hover:bg-gray-800">Пошук</button>
                </div>

                <div className='flex gap-2'>
                    <select value={city} onChange={(e) => setCity(e.target.value)} className='border rounded py-2 px-4 text-sm font-semibold'>
                        <option value="">Місто</option>
                        {cityOptions.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>

                    <select value={shelter} onChange={(e) => setShelter(e.target.value)} className='border rounded py-2 px-4 text-sm font-semibold'>
                        <option value="">Притулок</option>
                        {shelterOptions.map((shelter) => (
                            <option key={shelter} value={shelter}>
                                {shelter}
                            </option>
                        ))}
                    </select>

                    <div className='flex gap-2 ml-4'>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className='border rounded py-2 px-4 text-sm font-semibold'
                        />
                        <button onClick={handleDateFilter} className="bg-black text-white text-sm font-semibold px-4 py-2 rounded hover:bg-gray-800">Застосувати фільтр за датою</button>
                    </div>
                    </div>

                {LoginService.getRole() == UserRole.SHELTER_MANAGER ? (
                    <button onClick={() => setShowAddForm(true)} className="bg-black text-white text-sm font-semibold px-4 py-2 rounded hover:bg-gray-800">+</button>) : (<></>)}
            </div>

            {showAddForm && (
                <AddVolunteeringForm
                    onAdd={handleAddVolunteering}
                    onCancel={() => setShowAddForm(false)}
                />
            )}

            <div className='grid grid-cols-4 gap-5 p-12'>
                {filteredVolunteerings.map(volunteering => (
                    <VolunteeringCard key={volunteering.id} volunteering={volunteering}  onDelete={handleDeleteVolunteering} />
                ))}
            </div>
        </div>
    );
}

export default Volunteerings;
