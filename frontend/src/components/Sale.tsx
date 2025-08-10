'use client'
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import api from '../utils/api';
import Typography from '@mui/material/Typography';
import type { Event } from '../types/event';
import EventCard from './Card';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import { Input } from '@mui/material';
import Pagination from './Pagination';


export default function Sale() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1)
  const eventsInPage = 16
  const lastItemIndex = currentPage * eventsInPage
  const firstItemIndex = lastItemIndex - eventsInPage

  const [filter, setFilter] = useState('')
  const filteredEvents = events.filter((event) => event.name.toLowerCase().includes(filter.toLowerCase()))
  const currentEvents = filteredEvents.slice(firstItemIndex, lastItemIndex)

  useEffect(() => {
    getEvents();
  }, []);

  async function getEvents() {
    const fetchingData = api.get<Event[]>('/events');

    toast.promise(
      fetchingData,
      {
        pending: 'Carregando eventos',
        success: {
          render({ data }) {
            return 'Eventos carregados com sucesso!';
          }
        },
        error: 'Erro ao carregar eventos',
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
      const { data: eventData } = await fetchingData;

      const eventsWithDates = eventData.map(event => ({
        ...event,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate)
      }));
      setEvents(eventsWithDates);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

  };

  return (
    <>
      <ToastContainer />
      <Typography variant='h4' sx={{ color: 'white', margin: '.3em 0' }}>Todos os Eventos</Typography>

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
          <Typography>No events found.</Typography>
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

