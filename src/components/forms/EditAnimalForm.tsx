import React, { useState } from "react";
import { AnimalInterface } from "../../interfaces/AnimalInterface";

interface EditAnimalFormProps {
    animal: AnimalInterface;
    onSave: (updatedAnimal: Partial<AnimalInterface>) => void;
    onCancel: () => void;
}

const EditAnimalForm: React.FC<EditAnimalFormProps> = ({ animal, onSave, onCancel }) => {
    const [formData, setFormData] = useState<AnimalInterface>(animal);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSaveClick = () => {
        const updatedFields: Partial<AnimalInterface> = {};
        for (const key in formData) {
            // @ts-ignore
            if (formData[key] !== animal[key]) {
                // @ts-ignore
                updatedFields[key] = formData[key];
            }
        }
        console.log(updatedFields);
        onSave(updatedFields);
    };

    return (
        <div className='p-6 rounded-2xl border shadow-sm'>
            <h2 className='text-2xl font-semibold'>Редагування тварини</h2>
            <div className='flex gap-1 mt-4'>
                <div className='flex flex-col gap-1 w-full'>
                    <label className='text-sm font-semibold'>Ім'я:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className='border rounded p-2 text-sm'
                    />
                </div>
                <div className='flex flex-col gap-1 w-full'>
                    <label className='text-sm font-semibold'>Порода:</label>
                    <input
                        type="text"
                        name="breed"
                        value={formData.breed}
                        onChange={handleChange}
                        className='border rounded p-2 text-sm'
                    />
                </div>
            </div>

            <div className='flex flex-col gap-1 w-full mt-2'>
                <label className='text-sm font-semibold'>Посилання на фото:</label>
                <input
                    type="text"
                    name="photoLink"
                    value={formData.photoLink}
                    onChange={handleChange}
                    className='border rounded p-2 text-sm'
                />
            </div>

            <div className='flex flex-col gap-1 w-full mt-2'>
                <label className='text-sm font-semibold'>Опис:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className='border rounded p-2 text-sm'
                />
            </div>

            <div className='flex flex-col gap-1 w-full mt-2'>
                <label className='text-sm font-semibold'>Медичний стан:</label>
                <textarea
                    name="medicalCondition"
                    value={formData.medicalCondition}
                    onChange={handleChange}
                    className='border rounded p-2 text-sm'
                />
            </div>

            <div className='flex gap-1 mt-2'>
                <div className='flex flex-col gap-1 w-full'>
                    <label className='text-sm font-semibold'>Стать:</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className='border rounded p-2 text-sm'
                    >
                        <option value="MALE">Хлопчик</option>
                        <option value="FEMALE">Дівчинка</option>
                    </select>
                </div>

                <div className='flex flex-col gap-1 w-full'>
                    <label className='text-sm font-semibold'>День народження:</label>
                    <input
                        type="date"
                        name="birthDate"
                        className='border rounded p-2 text-sm'
                        value={formData.birthDate}
                        onChange={handleChange}
                    />
                </div>

                <div className='flex flex-col gap-1 w-full'>
                    <label className='text-sm font-semibold'>Тип:</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className='border rounded p-2 text-sm'
                    >
                        <option value="DOG">Собака</option>
                        <option value="CAT">Кіт</option>
                    </select>
                </div>
            </div>

            <div className="flex gap-1 justify-between mt-4">
                <button onClick={onCancel} className="w-full border-black border-2 text-sm font-semibold px-4 py-2 rounded hover:bg-gray-100">Скасувати</button>
                <button onClick={handleSaveClick} className="w-full bg-black text-white text-sm font-semibold px-4 py-2 rounded hover:bg-gray-800 ">Зберегти</button>
            </div>
        </div>
    );
};

export default EditAnimalForm;
