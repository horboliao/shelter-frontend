import React, {useEffect, useRef, useState} from "react";
import {ShelterInterface} from "../interfaces/ShelterInterface";
import EditShelterForm from "./forms/EditShelterForm";
import {ShelterService} from "../services/ShelterService";
import LoginService from "../services/LoginService";

interface ShelterCardProps {
    shelter: ShelterInterface;
}

const ShelterCard: React.FC<ShelterCardProps> = ({ shelter }) => {
   // const mapLink = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.8293831270043!2d30.504909976566953!3d50.44427858780821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cef7ac54a97b%3A0x8f8e22354e24b0e3!2z0LHRg9C70YzQstCw0YAg0KLQsNGA0LDRgdCwINCo0LXQstGH0LXQvdC60LAsINCa0LjRl9CyLCAwMjAwMA!5e0!3m2!1suk!2sua!4v1727990416489!5m2!1suk!2sua`;
    //посилання на карту брати в googlemap (Embed a map) берем лише посилання без html!!!
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentShelter, setCurrentShelter] = useState<ShelterInterface>(shelter);
    const [mapError, setMapError] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSave = async (updatedShelter: ShelterInterface) => {
        try {
            const savedShelter = await ShelterService.update(currentShelter.id, updatedShelter);
            setCurrentShelter(savedShelter);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to save shelter:", error);
            alert("Error saving shelter. Please try again.");
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const openModal = () => {
        if (currentShelter.address && !mapError) {
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const iframe = iframeRef.current;
        if (iframe) {
            iframe.onload = () => {
                try {
                    const iframeTitle = iframe.contentDocument?.title || '';
                    if (iframeTitle.includes("404") || iframeTitle.includes("Error")) {
                        setMapError(true);
                    } else {
                        setMapError(false);
                    }
                } catch (error) {
                    // Catch any cross-origin errors or load errors
                    setMapError(true);
                }
            };
        }
    }, [isModalOpen, currentShelter.address]);


    return (
        <div className='p-6 rounded-2xl border shadow-sm '>
            {isEditing ? (
                <EditShelterForm
                    shelter={currentShelter}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            ) : (
                <div className='flex flex-col gap-1'>
                    <h2 className='text-2xl font-semibold'>{currentShelter.name}</h2>
                    <img src={currentShelter.photoLink} alt={currentShelter.name} className='rounded'/>
                    <p className='my-1 text-xs text-gray-500'>{currentShelter.description}</p>
                    <p className='font-semibold'>📍 {currentShelter.city}</p>
                    <div className="bg-black text-white text-sm font-semibold px-4 py-2 rounded hover:bg-gray-800 flex items-center">
                        <a
                            href="https://banklink.com/happytails"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='mx-auto'
                        >
                            Підтримати хвостика
                        </a>
                    </div>
                    {LoginService.getShelterId() ? (
                        <button
                            className="border-black border-2 text-sm font-semibold px-4 py-2 rounded hover:bg-gray-100"
                            onClick={handleEditClick}>
                            Редагувати
                        </button>
                    ): (<></>)}
                    <button
                        className="mt-2 text-sm font-semibold text-blue-600 hover:underline"
                        onClick={openModal}
                    >
                        Показати карту
                    </button>
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                            <div className="bg-white p-4 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2">
                                <h3 className="text-lg font-semibold mb-4">{currentShelter.name}</h3>
                                {!mapError ? (
                                    <iframe
                                        ref={iframeRef}
                                        src={currentShelter.address}
                                        width="100%"
                                        height="450"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title={`${currentShelter.name} Location`}
                                    />
                                ) : (
                                    <p className="text-red-500">Address: {currentShelter.address}</p>
                                )}
                                <button
                                    onClick={closeModal}
                                    className="bg-black text-white text-sm font-semibold px-4 py-2 rounded hover:bg-gray-800 w-full mt-4"
                                >
                                    Закрити
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ShelterCard;
