import React, { useEffect, useState } from "react";
import { AnimalInterface } from "../../interfaces/AnimalInterface";
import { Utils } from "../../services/Utils";
import { useNavigate, useParams } from "react-router-dom";
import { AnimalService } from "../../services/AnimalService";
import AnimalApplicationForm from "../../components/forms/AnimalApplicationForm";
import EditAnimalForm from "../../components/forms/EditAnimalForm";
import LoginService, {UserRole} from "../../services/LoginService";

function OneAnimal() {
    const { id } = useParams();
    const [animal, setAnimal] = useState<AnimalInterface>();
    const [showApplicationForm, setShowApplicationForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getOne = async () => {
            try {
                const response = await AnimalService.getOne(id!);
                setAnimal(response);
            } catch (error) {
                console.error("Error fetching animal:", error);
            }
        };

        getOne();
    }, [id]);

    const openShelter = ({ shelterId }: { shelterId: number }) => {
        navigate(`/shelters/${shelterId}`);
    };

    const openApplications = ({ id }: { id: number }) => {
        navigate(`/animal-applications/${id}`);
    };

    const handleSave = async (updatedAnimal: Partial<AnimalInterface>) => {
        if (!animal) return; // Early return if animal is undefined
        try {
            const updated = await AnimalService.update(animal.id, updatedAnimal);
            setAnimal(updated); // Update local state
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update animal:', error);
            // Consider showing a notification or alert to the user here
        }
    };

    const deleteAnimal = async () => {
        try {
            await AnimalService.delete(animal!.id);
            navigate("/animals"); // Переходимо назад на список тварин або іншу сторінку
        } catch (error) {
            console.error("Failed to delete animal:", error);
            // Показуємо користувачеві повідомлення про помилку
        }
    };

    return (
        <div className='p-12 flex gap-12 justify-center'>
            {animal ? (
                <>
                {!showApplicationForm&&!isEditing&&<img src={animal.photoLink} alt={animal.name} className='rounded w-1/3'/>}
                    <div>
                        {isEditing ? (
                            <EditAnimalForm
                                animal={animal}
                                onSave={handleSave}
                                onCancel={() => setIsEditing(false)}
                            />
                        ) : (
                            <>
                                <h2 className='text-2xl font-semibold'>{animal.name}</h2>
                                <p className='text-gray-500 text-sm'>( {animal.type} )</p>
                                <div className='flex flex-wrap gap-2 my-4'>
                                    <p className='py-1 px-4 text-sm font-semibold rounded-2xl border bg-white'>{animal.breed}</p>
                                    <p className='py-1 px-4 text-sm font-semibold rounded-2xl border bg-white'>{animal.gender === 'MALE' ? 'Хлопчик' : 'Дівчинка'}</p>
                                    <p className='py-1 px-4 text-sm font-semibold rounded-2xl border bg-white'>{animal.birthDate}</p>
                                    <p className='py-1 px-4 text-sm font-semibold rounded-2xl border bg-white'>🗓 {Utils.calculateAge(animal.birthDate)}</p>
                                    <p className='py-1 px-4 text-sm font-semibold rounded-2xl border bg-white'>{animal.medicalCondition}</p>
                                </div>
                                <p>{animal.description}</p>
                                <p onClick={() => openShelter({ shelterId: animal.shelter.id })} className="my-4 font-semibold text-blue-600 cursor-pointer hover:underline">
                                    {animal.shelter.name} ↗️
                                </p>
                                <div className='flex flex-col gap-1'>
                                {LoginService.getEmail() ? (
                                    <><button onClick={() => setIsEditing(true)} className="border-black border-2 text-sm font-semibold px-4 py-2 rounded hover:bg-gray-100">Редагувати</button>
                                    <button onClick={deleteAnimal} className="bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-red-700">Видалити</button>
                                        <button onClick={() => openApplications({ id: animal.id })} className="my-4 font-semibold text-blue-600 cursor-pointer hover:underline">Запити на тварину</button></>) :
                                    (<button onClick={() => setShowApplicationForm(true)} className="bg-black text-white text-sm font-semibold px-4 py-2 rounded hover:bg-gray-800">Подати заявку на всиновлення</button>)}
                                </div>
                            </>
                        )}
                    </div>
                    {showApplicationForm && (
                        <AnimalApplicationForm
                            id={animal.id}
                            setShowApplicationForm={setShowApplicationForm}
                        />
                    )}
                </>
            ) : (
                <p>Такої тварини немає</p>
            )}
        </div>
    );
}

export default OneAnimal;
