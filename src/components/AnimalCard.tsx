import React from "react";
import {AnimalInterface} from "../interfaces/AnimalInterface";
import {Utils} from "../services/Utils";
import {useNavigate} from "react-router-dom";

export interface AnimalCardProps {
    animal: AnimalInterface;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/animals/${animal.id}`);
    };

    return (
        <div onClick={handleClick} className='p-6 rounded-2xl border shadow-sm flex flex-col gap-1 cursor-pointer relative'>
            <img src={animal.photoLink} alt={animal.name}  className='rounded'/>
            <h2 className='text-2xl font-semibold'>{animal.name}</h2>
            <p className='text-gray-500 text-sm'>( {animal.type} )</p>
            <div className='flex gap-1 absolute top-8 right-8'>
                <p className='py-1 px-4 text-sm font-semibold rounded-2xl border bg-white'>{animal.gender === 'MALE' ? 'Хлопчик' : 'Дівчинка'}</p>
                <p className='py-1 px-4 text-sm font-semibold rounded-2xl border bg-white'>🗓 {Utils.calculateAge(animal.birthDate)}</p>
            </div>
        </div>
    );
}

export default AnimalCard;
