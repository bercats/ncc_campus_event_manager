import React from 'react';

const EventCard = ({ event }) => {
  const numTicketsAvailable = event.total_tickets - event.tickets.length;
  const isBookable = event.tickets.length < event.total_tickets;

  function getFormattedDate() {
    const date = new Date(event.event_datetime_start);
    const day = date.getDate().toString().padStart(2, "0");
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(date);
    const year = date.getFullYear().toString();
    let hours = date.getHours();
    const amPm = hours >= 12 ? "PM" : "AM";
    hours %= 12;
    hours = hours || 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const endHour = hours + event.event_duration;

    const formattedDate = `${day} ${month} ${year}, ${hours}:${minutes} ${amPm} - ${endHour}:00 ${amPm}`;
    return formattedDate;
  }

  function bookTicket() {
    fetch(`/api/events/${event.id}/book_ticket`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Ticket booked!');
        } else {
          alert('Ticket booking failed!');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

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
          <button className="book-button" onClick={() => bookTicket()}>
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