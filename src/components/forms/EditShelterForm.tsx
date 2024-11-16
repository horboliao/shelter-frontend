import React, { useState } from "react";
import {ShelterInterface} from "../../interfaces/ShelterInterface";

interface EditShelterFormProps {
    shelter: ShelterInterface;
    onSave: (updatedShelter: ShelterInterface) => void;
    onCancel: () => void;
}

const EditShelterForm: React.FC<EditShelterFormProps> = ({ shelter, onSave, onCancel }) => {
    const [editedShelter, setEditedShelter] = useState<ShelterInterface>({ ...shelter });
    const [isAddressValid, setIsAddressValid] = useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedShelter({ ...editedShelter, [name]: value });

        // If the field being changed is "address", validate it
        if (name === "address") {
            validateAddress(value);
        }
    };

    // Function to validate the Google Maps link
    const validateAddress = (address: string) => {
        const googleMapsRegex = /https:\/\/www\.google\.com\/maps\/(embed\?pb=|place\/|.*(@-?\d+(\.\d+)?,-?\d+(\.\d+)?)).*$/;
        setIsAddressValid(googleMapsRegex.test(address));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAddressValid) {
            alert("Please enter a valid Google Maps link.");
            return;
        }
        onSave(editedShelter);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
            <h3 className='text-xl font-semibold mb-2'>Редагувати притулок</h3>
            <input name="name" value={editedShelter.name} onChange={handleChange} placeholder="Назва" className='border rounded p-2 text-sm'/>
            <input name="photoLink" value={editedShelter.photoLink} onChange={handleChange} placeholder="Посилання на фото" className='border rounded p-2 text-sm'/>
            <textarea name="description" value={editedShelter.description} onChange={handleChange} placeholder="Опис" className='border rounded p-2 text-sm'/>
            <input name="city" value={editedShelter.city} onChange={handleChange} placeholder="Місто" className='border rounded p-2 text-sm'/>
            <input name="address" value={editedShelter.address} onChange={handleChange} placeholder="Адреса" className='border rounded p-2 text-sm'/>
            <p className='text-xs font-semibold text-red-600'>* Зауважте адреса - це посилання на GoogleMap</p>
            <div className='flex justify-between gap-1 mt-2'>
                <button type="button" onClick={onCancel} className="w-full border-black border-2 text-sm font-semibold px-4 py-2 rounded hover:bg-gray-100">Скасувати</button>
                <button type="submit" className="w-full border-black border-2 bg-black text-white text-sm font-semibold px-4 py-2 rounded hover:bg-gray-800">Зберегти</button>
            </div>
        </form>
    );
};

export default EditShelterForm;
