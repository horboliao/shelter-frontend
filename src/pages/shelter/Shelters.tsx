import React, { useEffect, useState } from 'react';
import {ShelterService} from "../../services/ShelterService";
import ShelterCard from "../../components/ShelterCard";
import {ShelterInterface} from "../../interfaces/ShelterInterface";
import LoginService from "../../services/LoginService";

function Shelters() {
    const [shelters, setShelters] = useState<ShelterInterface[]>([]);

    useEffect(() => {
        const getAll = async () => {
            try {
                let response;
                let shelterId = LoginService.getShelterId();
                if (shelterId){
                    response = await ShelterService.getOne(shelterId);
                    setShelters([response]);
                }else {
                    response = await ShelterService.getAll();
                    setShelters(response);
                }
            } catch (error) {
                console.log('Error fetching shelters:', error);
            }
        };

        getAll();
    }, []);

    return (
        <div className='grid grid-cols-4 gap-5 p-12'>
            {shelters.map(shelter => (
                <ShelterCard key={shelter.id} shelter={shelter} />
            ))}
        </div>
    );
}

export default Shelters;
