import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { Event } from '../types/event';
import Link from 'next/link';

export default function EventCard(props: Event) {

    const eventDay = props.startDate.toLocaleDateString();
    const startTime = `${props.startDate.getHours().toString().padStart(2, '0')}:${props.startDate.getMinutes().toString().padStart(2, '0')}`;
    const endTime = `${props.endDate.getHours().toString().padStart(2, '0')}:${props.endDate.getMinutes().toString().padStart(2, '0')}`;

    return (
        <Link href={`/checkout/${props.id}`} style={{ textDecoration: 'none' }}>
            <Card sx={{ height: '15em', transition: 'all 0.5s', width: '20em', "&:hover": { transform: 'scale(1.05)', cursor: 'pointer'} }}>      
                <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100%' }}>
                    <Typography variant="h5" component="div">
                        {props.name}
                    </Typography>

                    <Typography variant="h6" color="text.secondary">
                        {eventDay}
                    </Typography>

                    <Typography variant="h6" color="text.secondary">
                        {startTime} até às {endTime}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    )
}
