"use client"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface Props {
    eventsInPage: number;
    totalEvents: number;
    paginate: (pageNumber: number) => void;
}

export default function Pagination({ eventsInPage, totalEvents, paginate }: Props) {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalEvents / eventsInPage); i++) {
        pageNumbers.push(i);
    }

    return (

        <nav>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '1em' }}>

                {pageNumbers.map(number => (
                    
                    <div key={number} >
                        <Button sx={{ backgroundColor: 'primary.main', color: 'white' }} onClick={() => paginate(number)}  >
                            {number}
                        </Button>
                    </div>
                ))}

            </Box>
        </nav>

    )
}

