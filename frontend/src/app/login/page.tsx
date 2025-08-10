'use client'

import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import api from '../../utils/api';
import Header from '@/components/Header';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();


    const response = api.post('users/login', { email, password, });
    toast.promise(
      response,
      {
        pending: 'Carregando',
        success: {
          render({ data }: any) {
            localStorage.setItem('userEmail', data.data.user.email);
            router.push('/');
            return 'Login realizado com sucesso';
          }
        },
        error: {
          render({ data }: any) {
            if (data.response?.data?.message) {
              return data.response.data.message
            }
            return 'Erro no login'
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


  };

  return (
    <>
      <Header />
      <ToastContainer />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '90vh',
          padding: '2em',
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5em',
            padding: '2em',
            backgroundColor: 'white',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '400px',
          }}
        >
          <Typography variant="h4" component="h1" sx={{ textAlign: 'center' }}>
            Login
          </Typography>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Senha"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>

        </Box>
      </Box>
    </>
  );
}
