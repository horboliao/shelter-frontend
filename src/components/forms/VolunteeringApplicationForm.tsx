import React, { useState } from "react";
import {VolunteeringApplicationInterface} from "../../interfaces/VolunteeringApplicationInterface";
import {VolunteeringApplicationService} from "../../services/VolunteeringApplicationService";

interface VolunteeringFormProps {
    id: number;
    setShowApplicationForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const VolunteeringApplicationForm: React.FC<VolunteeringFormProps> = ({ id, setShowApplicationForm }) => {
    const [formData, setFormData] = useState<Partial<VolunteeringApplicationInterface>>({
        name: "",
        phone: "",
        volunteeringId: id,
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
            let res = await VolunteeringApplicationService.create(formData);
            console.log(res)
            setShowApplicationForm(false);
        } catch (error) {
            console.error("Error submitting application:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col gap-1 w-full mt-4'>
                    <label htmlFor="name" className='text-sm font-semibold'>Ім'я:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className='border rounded p-2 text-sm'
                        required
                    />
                </div>
                <div className='flex flex-col gap-1 w-full mt-2'>
                    <label htmlFor="phone" className='text-sm font-semibold'>Телефон:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className='border rounded p-2 text-sm'
                        required
                    />
                </div>
                <div className='flex gap-1 mt-4'>
                    <button onClick={() => setShowApplicationForm(false)} className="w-full border-black border-2 text-sm font-semibold px-4 py-2 rounded hover:bg-gray-100">
                        Скасувати
                    </button>
                    <button type="submit" className="bg-black w-full text-white text-sm font-semibold px-4 py-2 rounded hover:bg-gray-800">Надіслати</button>
                </div>
            </form>
        </div>
    );
};

export default VolunteeringApplicationForm;
