import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {AnimalApplicationInterface} from "../../interfaces/AnimalApplicationInterface";
import {AnimalApplicationService} from "../../services/AnimalApplicationService";

function AnimalApplications() {
    const { id } = useParams<{ id: string }>();
    const [applications, setApplications] = useState<AnimalApplicationInterface[]>([]);

    useEffect(() => {
        const fetchApplications = async () => {
            if (id) {
                try {
                    const Id = parseInt(id);
                    const data = await AnimalApplicationService.getAllOfOneAnimal(Id);
                    setApplications(data);
                } catch (error) {
                    console.error("Failed to fetch volunteering applications:", error);
                }
            }
        };

        fetchApplications();
    }, [id]);

    return (
        <div className='p-12'>
            <h2 className='text-2xl font-semibold'>Запити на тваринку</h2>

            {applications.length > 0 ? (
                <ul className='flex flex-col gap-2 mt-4'>
                    {applications.map(application => (
                        <div key={application.id} className='p-4 border rounded-2xl'>
                            <h2 className='font-semibold text-lg'>{application.name}</h2>
                            <div className='flex gap-2 my-2'>
                                <p className='py-1 px-4 text-sm font-semibold rounded-2xl border bg-white'>{application.phone}</p>
                                <p className='py-1 px-4 text-sm font-semibold rounded-2xl border bg-white text-blue-600'>{application.email}</p>
                            </div>
                            <p>{application.motivationLetter}</p>
                        </div>
                    ))}
                </ul>
            ) : (
                <p>Не знайдено запиту</p>
            )}
        </div>
    );
}

export default AnimalApplications;
