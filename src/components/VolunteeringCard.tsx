import React, { useState } from "react";
import { VolunteeringInterface } from "../interfaces/VolunteeringInterface";
import { useNavigate } from "react-router-dom";
import { Utils } from "../services/Utils";
import VolunteeringApplicationForm from "./forms/VolunteeringApplicationForm";
import { VolunteeringService } from "../services/VolunteeringService";
import LoginService from "../services/LoginService";

interface VolunteeringCardProps {
    volunteering: VolunteeringInterface;
    onDelete: (id: number) => void;
}

const VolunteeringCard: React.FC<VolunteeringCardProps> = ({ volunteering, onDelete }) => {
    const navigate = useNavigate();
    const [showApplicationForm, setShowApplicationForm] = useState(false);
    const [volunteeringData, setVolunteeringData] = useState(volunteering);

    const openShelter = (shelterId: number) => {
        navigate(`/shelters/${shelterId}`);
    };

    const openVolunteeringApplicationsPage = () => {
        navigate(`/volunteering-applications/${volunteering.id}`);
    };

    const refreshVolunteering = async () => {
        try {
            const updatedData = await VolunteeringService.getOne(volunteering.id);
            setVolunteeringData(updatedData);
        } catch (error) {
            console.error("Failed to fetch updated volunteering data:", error);
        }
    };

    const deleteVolunteering = async () => {
        try {
            await VolunteeringService.delete(volunteering.id);
            onDelete(volunteering.id);
        } catch (error) {
            console.error("Failed to delete volunteering:", error);
        }
    };

    const handleFormClose = async () => {
        await refreshVolunteering();
        setShowApplicationForm(false);
    };

    return (
        <div className='p-6 rounded-2xl border shadow-sm '>
            {LoginService.getEmail() ? (
            <h2 onClick={openVolunteeringApplicationsPage} className=" font-semibold text-blue-600 hover:underline text-2xl">{volunteering.name}</h2>
                ) : (
                <h2 className='text-2xl font-semibold'>{volunteering.name}</h2>
                )}
            {
                !showApplicationForm &&
                <>
                    <div className='flex flex-wrap gap-2 my-4'>
                        <p className='py-1 px-4 text-sm font-semibold rounded-2xl border bg-white'>🗓 {Utils.formatDate(new Date(volunteeringData.startDateTime))}</p>
                        <p className='py-1 px-4 text-sm font-semibold rounded-2xl border bg-white'>👥 {volunteeringData.requiredPeople}</p>
                        <p className='py-1 px-4 text-sm font-semibold rounded-2xl border bg-white'>📍 {volunteeringData.address}</p>
                    </div>
                    <p onClick={() => openShelter(volunteeringData.shelter.id)} className='text-sm font-semibold text-blue-600 hover:underline'>
                        {volunteeringData.shelter.name} ↗️
                    </p>

                    <p className='text-sm text-gray-500 my-4'>{volunteeringData.description}</p>
                    {LoginService.getEmail() ? (
                            <button onClick={deleteVolunteering} className="bg-red-500 w-full text-white text-sm font-semibold px-4 py-2 rounded hover:bg-red-700">Видалити</button> ) :
                        (<button onClick={() => setShowApplicationForm(true)} className="bg-black w-full text-white text-sm font-semibold px-4 py-2 rounded hover:bg-gray-800">Приєднатися</button>)}
                </>
            }

            {showApplicationForm && <VolunteeringApplicationForm id={volunteeringData.id} setShowApplicationForm={handleFormClose} />}
        </div>
    );
}

export default VolunteeringCard;
