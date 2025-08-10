import { render, screen } from '@testing-library/react'
import EventCard from '../Card'
import type { Event } from '../../types/event'
 
describe('EventCard', () => {
  it('renders event details correctly', () => {
    const mockEvent: Event = {
      id: '1',
      name: 'Show de Rock',
      startDate: new Date('2025-12-25T20:00:00'),
      endDate: new Date('2025-12-25T23:00:00'),
    }
 
    render(<EventCard {...mockEvent} />)
 
    const eventName = screen.getByText('Show de Rock')
    expect(eventName).toBeInTheDocument()
 
    const eventDate = screen.getByText('25/12/2025')
    expect(eventDate).toBeInTheDocument()

    const eventTime = screen.getByText('20:00 até às 23:00')
    expect(eventTime).toBeInTheDocument()
  })
})