'use client'

import Checkout from "@/components/Checkout";
import type { Event } from "@/types/event";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import api from '@/utils/api';
import { Typography } from '@mui/material';
import { ToastContainer, toast} from 'react-toastify';


export default function CheckoutPage() {
    const { id } = useParams();
    const [event, setEvent] = useState<Event | null>(null);

    useEffect(() => {
        if (id) {

            getEvent();
        }
    }, [id]);


    async function getEvent() {

        try {
            const fetchingData = api.get<Event>(`events/getEvent?id=${id}`);
            toast.promise(
                fetchingData,
                {
                    pending: 'Carregando evento',
                    success: {
                        render({ data }) {
                            return 'Evento carregado com sucesso!';
                        }
                    },
                    error: 'Erro ao carregar evento',
                }
            );
            const { data: eventData } = await fetchingData;
            const event: Event = {
                ...eventData,
                startDate: new Date(eventData.startDate),
                endDate: new Date(eventData.endDate),
            };
            setEvent(event);
        } catch (error) {
            console.log('Erro no toast:', error);
        }

    }

    if (!event) {
        return <Typography>Event not found.</Typography>;
    }

    return (

        <>
            <ToastContainer />
            <Checkout event={event} />
        </>
    );
}