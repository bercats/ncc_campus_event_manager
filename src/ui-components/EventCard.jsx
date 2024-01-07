import React from 'react';

const EventCard = ({ event }) => {
  // Ensure that the capacity and seatsLeft are numbers before subtracting
  const numTicketsAvailable = !isNaN(event.capacity) && !isNaN(event.seatsLeft)
    ? event.capacity - event.seatsLeft
    : 'N/A';
  
  // Ensure that numTicketsAvailable is a number before comparing
  const isBookable = !isNaN(numTicketsAvailable) && numTicketsAvailable > 0;

  function getFormattedDate() {
    if (!event.event_datetime_start) {
      return 'Date information not available';
    }
    
    const date = new Date(event.event_datetime_start);
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear().toString();
    let hours = date.getHours();
    const amPm = hours >= 12 ? "PM" : "AM";
    hours %= 12;
    hours = hours || 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");

    let endHour = hours + (isNaN(event.event_duration) ? 0 : event.event_duration);
    endHour = endHour > 12 ? endHour - 12 : endHour;

    const formattedDate = `${day} ${month} ${year}, ${hours}:${minutes} ${amPm} - ${endHour}:${minutes} ${amPm}`;
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
      {event.eventPoster && <img src={event.eventPoster} alt="Event" className="event-image" />}
      <div className="event-details">
        <h2>{event.eventName || 'Event Name Not Available'}</h2>
        <p className="event-timeAndDate">{getFormattedDate()}</p>
        <p className="place">{event.place || 'Location Not Available'}</p>
        <p className="event-description">{event.description || 'No Description Provided'}</p>
        {numTicketsAvailable !== 'N/A' && (
          <p className="ticket-info">
            Tickets available: {numTicketsAvailable} (capacity: {event.capacity || 'N/A'})
          </p>
        )}

        <div className="event-actions">
          {isBookable ? (
            <button className="book-button" onClick={bookTicket}>
              Book Ticket
            </button>
          ) : (
            <button className="sold-out-button" disabled>
              Sold Out!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;