import React, { useState } from "react";
import {AnimalApplicationInterface, AnimalApplicationStatus} from "../../interfaces/AnimalApplicationInterface";
import {VolunteeringApplicationService} from "../../services/VolunteeringApplicationService";
import {AnimalApplicationService} from "../../services/AnimalApplicationService";

interface AdoptionFormProps {
id: number;
setShowApplicationForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const AnimalApplicationForm: React.FC<AdoptionFormProps> = ({ id, setShowApplicationForm }) => {
    const [formData, setFormData] = useState<Partial<AnimalApplicationInterface>>({
        name: "",
        phone: "",
        status: AnimalApplicationStatus.CREATED,
        animalId: id,
        email: "",
        motivationLetter: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            let res = await AnimalApplicationService.create(formData);
            console.log(res)
            setShowApplicationForm(false);
        } catch (error) {
            console.error("Error submitting application:", error);
        }
    };

    return (
        <div className='border p-4 shadow-sm rounded-2xl'>
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-1 w-full'>
                <label htmlFor="name" className='text-sm font-semibold'>Ім'я:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    className='border rounded p-2 text-sm'
                    onChange={handleChange}
                    required
                />
            </div>

            <div className='flex flex-col gap-1 w-full'>
                <label htmlFor="email" className='text-sm font-semibold'>Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    className='border rounded p-2 text-sm'
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='flex flex-col gap-1 w-full'>
                <label htmlFor="phone" className='text-sm font-semibold'>Телефон:</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    className='border rounded p-2 text-sm'
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='flex flex-col gap-1 w-full'>
                <label htmlFor="motivationLetter" className='text-sm font-semibold'>Лист мотивації:</label>
                <textarea
                    id="motivationLetter"
                    name="motivationLetter"
                    value={formData.motivationLetter}
                    className='border rounded p-2 text-sm'
                    onChange={handleChange}
                    required
                />
            </div>

            <button onClick={() => setShowApplicationForm(false)} className="my-2 w-full border-black border-2 text-sm font-semibold px-4 py-2 rounded hover:bg-gray-100">
                Скасувати
            </button>
            <button type="submit" className="w-full bg-black text-white text-sm font-semibold px-4 py-2 rounded hover:bg-gray-800 ">Надіслати заявку</button>
        </form>
        </div>
    );
};

export default AnimalApplicationForm;
