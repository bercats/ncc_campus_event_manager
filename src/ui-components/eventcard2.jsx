import React from 'react';

const EventCard = ({ event }) => {
  // Calculating the number of available tickets
  const numTicketsAvailable = event.total_tickets - event.tickets.length;

  // Checking if tickets are bookable
  const isBookable = event.tickets.length < event.total_tickets;

  // Formatting the event date
  const getFormattedDate = () => {
    const date = new Date(event.event_datetime_start);
    const day = String(date.getDate()).padStart(2, '0');
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
    const year = date.getFullYear();
    let hours = date.getHours();
    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12;
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const endHour = hours + event.event_duration;

    return `${day} ${month} ${year}, ${hours}:${minutes} ${amPm} - ${endHour}:00 ${amPm}`;
  };

  return (
    <div className="event-card">
      <img src={event.url} alt="Event" className="event-image" />

      <div className="event-details">
        <h2>{event.name}</h2>
        <p className="event-date">{getFormattedDate()}</p>
        <p className="room-name">{event.room_name}</p>
        <p className="event-description">{event.description}</p>
        <p className="ticket-info">
          Tickets available: {numTicketsAvailable} (capacity: {event.total_tickets})
        </p>

        <div className="event-actions">
          {isBookable ? (
            <button className="book-button" onClick={() => /* Handle booking logic */}>
              Book Ticket
            </button>
          ) : (
            <button className="sold-out-button">Sold Out!</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;