'use client';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  let [userEmail, setUserEmail] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(true);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem('userEmail');
    setUserEmail(false);
    router.push('/');
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link href="/" passHref style={{ textDecoration: 'none', color: 'white' }}>
            <Typography variant="h4">
              Tickets
            </Typography>
          </Link>
          <Box display={'flex'} gap={2}>

            {userEmail ? (
              <>

                <Link href="/myEvents" passHref>
                  <Button variant='outlined' color="inherit" sx={{ backgroundColor: 'primary.main', color: 'white' }}>Meus Eventos</Button>
                </Link>
                <Button variant='outlined' onClick={handleLogout} color="inherit" sx={{ backgroundColor: 'primary.main', color: 'white' }}>Logout</Button>
              </>

            ) : (
              <Link href="/login" passHref>
                <Button variant='outlined' color="inherit" sx={{ backgroundColor: 'primary.main', color: 'white' }}>Login</Button>
              </Link>
            )}

          </Box>



        </Toolbar>
      </AppBar>
    </Box>
  );
}