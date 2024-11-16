import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {VolunteeringApplicationInterface} from "../../interfaces/VolunteeringApplicationInterface";
import {VolunteeringApplicationService} from "../../services/VolunteeringApplicationService";

function VolunteeringApplications() {
    const { id } = useParams<{ id: string }>();
    const [applications, setApplications] = useState<VolunteeringApplicationInterface[]>([]);

    useEffect(() => {
        const fetchApplications = async () => {
            if (id) {
                try {
                    const volunteeringId = parseInt(id);
                    const data = await VolunteeringApplicationService.getAllOfOneVolunteering(volunteeringId);
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
            <h2 className='text-2xl font-semibold'>Запити на волонтерство</h2>
            {applications.length > 0 ? (
                <ul className='flex flex-col gap-2 mt-4'>
                    {applications.map(application => (
                        <div key={application.id} className='p-4 border rounded-2xl'>
                            <h2 className='font-semibold text-lg'>{application.name}</h2>
                            <div className='flex gap-2 my-2'>
                                <p className='py-1 px-4 text-sm font-semibold rounded-2xl border bg-white'>{application.phone}</p>
                            </div>
                        </div>
                    ))}
                </ul>
            ) : (
                <p>Не знайденого жодного запиту</p>
            )}
        </div>
    );
}

export default VolunteeringApplications;
