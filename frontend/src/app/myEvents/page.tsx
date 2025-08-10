'use client'
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import api from '../../utils/api';
import Typography from '@mui/material/Typography';
import type { Event } from '../../types/event';
import EventCard from '../../components/Card';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import { Input } from '@mui/material';
import Pagination from '../../components/Pagination';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';

export default function MyEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1)
  const eventsInPage = 16
  const lastItemIndex = currentPage * eventsInPage
  const firstItemIndex = lastItemIndex - eventsInPage

  const [filter, setFilter] = useState('')
  const filteredEvents = events.filter((event) => event.name.toLowerCase().includes(filter.toLowerCase()))
  const currentEvents = filteredEvents.slice(firstItemIndex, lastItemIndex)

  const router = useRouter();

  useEffect(() => {
    getEvents();
  }, []);

  async function getEvents() {
    const userEmail = localStorage.getItem('userEmail');

    if (!userEmail) {
      toast.error('Faça login para ver seus eventos.');
      router.push('/login');
      setLoading(false);
      return;
    }

    const fetchingData = api.get(`/users/myEvents?email=${userEmail}`);

    toast.promise(
      fetchingData,
      {
        pending: 'Carregando seus eventos',
        success: {
          render({ data }) {
            return 'Eventos carregados com sucesso';
          }
        },
        error: 'Erro ao carregar os eventos',
      },
      {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      }
    );

    try {
      const { data: { events } } = await fetchingData;

      const eventsWithDates = events.map((event: Event) => ({
        ...event,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate)
      }));
      setEvents(eventsWithDates);
    } catch (error) {
      console.error('Erro ao buscar os eventos', error);
    } finally {
      setLoading(false);
    }

  };

  return (
    <>
      <Header />
      <ToastContainer />
      <Typography variant='h4' sx={{ color: 'white', margin: '.3em 0' }}>Meus Eventos</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1em', margin: '1em 5em' }}>

        <Input placeholder='Filtre pelo nome do evento'
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{ backgroundColor: 'white', borderRadius: '5px', padding: '0 .5em', minWidth: '250px', fontSize: '1.2em' }}
        />

        <Pagination
          eventsInPage={eventsInPage}
          totalEvents={filteredEvents.length}
          paginate={setCurrentPage}
        />

      </Box>

      <Box sx={{ display: 'flex', gap: '2em', flexWrap: 'wrap', justifyContent: 'center', padding: '2em' }}>

        {events.length === 0 && !loading ? (
          <Typography>Nenhum evento encontrado.</Typography>
        ) : (
          currentEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))
        )}

        {loading && <Typography variant='h3' sx={{ color: 'white' }}>Carregando</Typography>}
      </Box>
    </>
  );
}