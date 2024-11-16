import React, { useState } from "react";
import { CreateAnimalInterface, AnimalInterface } from "../../interfaces/AnimalInterface";
import { AnimalService } from "../../services/AnimalService";
import LoginService from "../../services/LoginService";

interface AddAnimalFormProps {
    onAdd: (newAnimal: AnimalInterface) => void;
    onCancel: () => void;
}

const AddAnimalForm: React.FC<AddAnimalFormProps> = ({ onAdd, onCancel }) => {
    const [formData, setFormData] = useState<CreateAnimalInterface>({
        name: "",
        gender: "MALE",
        birthDate: "",
        type: "DOG",
        breed: "",
        description: "",
        medicalCondition: "",
        photoLink: "",
        shelterId: Number(LoginService.getShelterId()), // Placeholder
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleAddClick = async () => {
        try {
            const createdAnimal = await AnimalService.create(formData);
            onAdd(createdAnimal); // Passes the full AnimalInterface object to the parent
        } catch (error) {
            console.error("Error adding animal:", error);
        }
    };

    return (
        <div className="m-6 p-6 border shadow-sm rounded-2xl">
            <h2 className='text-2xl font-semibold'>Додати тварину</h2>

            <div className='flex gap-1'>
                <div className='flex gap-1 w-1/2'>
                    <div className='flex flex-col gap-1 w-full'>
                        <label className='text-sm font-semibold'>Ім'я:</label>
                        <input
                            type="text" name="name" value={formData.name} onChange={handleChange}
                            className='border rounded p-2 text-sm'
                        />
                    </div>

                    <div className='flex flex-col gap-1 w-full'>
                        <label className='text-sm font-semibold'>Порода:</label>
                        <input
                            type="text" name="breed" value={formData.breed} onChange={handleChange}
                            className='border rounded p-2 text-sm'
                        />
                    </div>
                </div>
                <div className='flex gap-1 w-1/2'>
                <div className='flex flex-col gap-1 w-full'>
                    <label className='text-sm font-semibold'>Стать:</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} className='border rounded p-2 text-sm'>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                    </select>
                </div>

                <div className='flex flex-col gap-1 w-full'>
                    <label className='text-sm font-semibold'>День народження:</label>
                    <input
                        type="date" name="birthDate" value={formData.birthDate} onChange={handleChange}
                        className='border rounded p-2 text-sm'
                    />
                </div>

                <div className='flex flex-col gap-1 w-full'>
                    <label className='text-sm font-semibold'>Тип:</label>
                    <select name="type" value={formData.type} onChange={handleChange} className='border rounded p-2 text-sm'>
                        <option value="DOG">Dog</option>
                        <option value="CAT">Cat</option>
                    </select>
                </div>
                </div>
            </div>

            <div className='flex gap-1'>
            <div className='flex flex-col gap-1 w-full'>
                <label className='text-sm font-semibold'>Опис:</label>
                <textarea name="description" value={formData.description} onChange={handleChange}
                          className='border rounded p-2 text-sm'/>
            </div>

            <div className='flex flex-col gap-1 w-full'>
                <label className='text-sm font-semibold'>Медичний стан:</label>
                <textarea name="medicalCondition" value={formData.medicalCondition} onChange={handleChange}
                          className='border rounded p-2 text-sm'/>
            </div>
            </div>

            <div className='flex flex-col gap-1 w-full'>
                <label className='text-sm font-semibold'>Посилання на фото:</label>
                <input type="text" name="photoLink" value={formData.photoLink} onChange={handleChange}
                    className='border rounded p-2 text-sm'
                />
            </div>

            <div className="flex gap-2 justify-end mt-4">
                <button onClick={onCancel} className="w-full border-black border-2 text-sm font-semibold px-4 py-2 rounded hover:bg-gray-100">Скасувати</button>
                <button onClick={handleAddClick} className="w-full bg-black text-white text-sm font-semibold px-4 py-2 rounded hover:bg-gray-800 ">Додати тварину</button>
            </div>
        </div>
    );
};

export default AddAnimalForm;
