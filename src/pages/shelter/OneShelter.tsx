import React, {useEffect, useState} from "react";
import ShelterCard from "../../components/ShelterCard";
import {useParams} from "react-router-dom";
import {ShelterInterface} from "../../interfaces/ShelterInterface";
import {ShelterService} from "../../services/ShelterService";

function OneShelter() {
    const { id } = useParams();
    const [shelter, setShelter] = useState<ShelterInterface>();

    useEffect(() => {
        const getOne = async () => {
            try {
                const response = await ShelterService.getOne(id!);
                console.log(response);
                setShelter(response);
            } catch (error) {
                console.error('Error fetching shelter:', error);
            }
        };

        getOne();
    }, []);

    return (
        <div className='w-1/3 mx-auto p-12'>
            {shelter ? (
        <ShelterCard shelter={shelter}/>
                ): (
                <p>Такого притулку немає</p>
            )}
        </div>
    );
}

export default OneShelter;
