import React, { useState } from 'react';
import { CreateVolunteeringInterface } from "../../interfaces/VolunteeringInterface";
import LoginService from "../../services/LoginService";
interface AddVolunteeringFormProps {
    onAdd: (newVolunteering: CreateVolunteeringInterface) => void;
    onCancel: () => void;
}

const AddVolunteeringForm: React.FC<AddVolunteeringFormProps> = ({ onAdd, onCancel }) => {
    const [formData, setFormData] = useState<CreateVolunteeringInterface>({
        name: "",
        description: "",
        startDateTime: "",
        address: "",
        requiredPeople: 0,
        shelterId: Number(LoginService.getShelterId()),
    });
    const [date, setDate] = useState<string>("");
    const [time, setTime] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDate(value);
        setFormData((prev) => ({
            ...prev,
            startDateTime: `${value}T${time}`, // Concatenate date and time
        }));
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTime(value);
        setFormData((prev) => ({
            ...prev,
            startDateTime: `${date}T${value}`, // Concatenate date and time
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd(formData);
    };

    return (
        <div className="m-6 p-6 border shadow-sm rounded-2xl">
            <h2 className="text-2xl font-semibold">Додати волонтерство</h2>

            <div className="flex gap-1 mt-4">
                <div className="flex flex-col gap-1 w-1/2">
                    <label className="text-sm font-semibold">Ім'я:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border rounded p-2 text-sm"
                    />
                </div>

                <div className="flex flex-col gap-1 w-1/2">
                    <label className="text-sm font-semibold">Дата початку:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={handleDateChange}
                        className="border rounded p-2 text-sm"
                    />
                </div>

                <div className="flex flex-col gap-1 w-1/2">
                    <label className="text-sm font-semibold">Час початку:</label>
                    <input
                        type="time"
                        value={time}
                        onChange={handleTimeChange}
                        className="border rounded p-2 text-sm"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-1 mt-4">
                <label className="text-sm font-semibold">Опис:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="border rounded p-2 text-sm"
                />
            </div>

            <div className="flex flex-col gap-1 mt-4">
                <label className="text-sm font-semibold">Адреса:</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="border rounded p-2 text-sm"
                />
            </div>

            <div className="flex flex-col gap-1 mt-4">
                <label className="text-sm font-semibold">Кількість людей:</label>
                <input
                    type="number"
                    name="requiredPeople"
                    value={formData.requiredPeople}
                    onChange={handleChange}
                    min="1"
                    className="border rounded p-2 text-sm"
                />
            </div>

            <div className="flex justify-end gap-2 mt-4">
                <button onClick={onCancel} className="border-black border-2 text-sm font-semibold px-4 py-2 rounded hover:bg-gray-100">
                    Скасувати
                </button>
                <button onClick={handleSubmit} className="bg-black text-white text-sm font-semibold px-4 py-2 rounded hover:bg-gray-800">
                    Додати
                </button>
            </div>
        </div>
    );
};

export default AddVolunteeringForm;
