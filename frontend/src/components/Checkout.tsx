'use client'

import { useState } from "react";
import type { Event } from "@/types/event";
import { Box, Card, CardContent, TextField, Button, Typography } from "@mui/material";
import Header from "./Header";
import api from "@/utils/api";
import { toast, ToastContainer, Bounce } from 'react-toastify';

export default function Checkout({ event }: { event: Event }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const fetchingData = api.post("users/checkout", { email, password, eventId: event.id })
        toast.promise(
            fetchingData,
            {
                pending: 'Carregando',
                success: {
                    render({ data }) {
                        return 'Evento agendado com sucesso';
                    }
                },
                error: {
                    render({ data }: any) {
                        if (data.response?.data?.message) {
                            return data.response.data.message
                        }
                        return 'Erro ao agendar evento'
                    },
                },
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

    }

    return (
        <>
            <Header />
            <ToastContainer />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>

                <Card sx={{ width: '30em' }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <Typography variant="h5" component="div">
                                {event.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {event.startDate.toLocaleDateString()} {event.startDate.toLocaleTimeString()} - {event.endDate.toLocaleTimeString()}
                            </Typography>

                            <Typography variant="body2">
                                Entre com seus dados para fazer a reserva!
                            </Typography>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="E-mail"
                                type="email"
                                fullWidth
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                label="Senha"
                                type="password"
                                fullWidth
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button variant="contained" color="primary" type="submit">
                                Checkout
                            </Button>
                        </form>

                    </CardContent>
                </Card>
            </Box>
        </>
    );
}