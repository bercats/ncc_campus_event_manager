import React from 'react';

<<<<<<< Updated upstream
const EventCard = ({ event }) => {
  // Parse numbers from event data
  const parseInteger = (value) => isNaN(parseInt(value)) ? 'N/A' : parseInt(value);

  // If event.seatsLeft is not provided, we assume all seats are available.
  const price = event.price || '0';
  const parsedCapacity = parseInt(event.capacity);
  const parsedSeatsLeft = parseInt(event.seatsLeft);
=======
const EventCard = ({ event, isAdmin, onEdit, onDelete  }) => {
>>>>>>> Stashed changes
  const numTicketsAvailable = event.capacity - event.seatsLeft;
  const isBookable =  numTicketsAvailable > 0;

  function getFormattedDate() {
    const dateString = event.timeAndDate;
    if (!dateString) {
      return 'Date information not available';
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    // Formatting the date
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    let hours = date.getHours();
    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12; // the hour '0' should be '12'
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day} ${month} ${year}, ${hours}:${minutes} ${amPm}`;
  }

  function bookTicket() {
    // Implement the booking logic here
  }

  return (
<<<<<<< Updated upstream
      <div className="event-card">
        {event.eventPoster && <img src={event.eventPoster} alt="Event" className="event-image" />}
        <div className="event-details">
          <h2>{event.eventName || 'Event Name Not Available'}</h2>
          <p className="event-timeAndDate">{getFormattedDate()}</p>
          <p className="place">{event.place || 'Location Not Available'}</p>
          <p className="event-description">{event.description || 'No Description Provided'}</p>
          <p className="ticket-info">
            Tickets available: {event.seatsLeft || '0'} / {parsedCapacity}
          </p>
            <p className="price">Price: {price}₺</p>
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
=======
    <div className="event-card">
      <img src={event.eventPoster} alt="Event" className="event-image" />

      <div className="event-details">
        <h2>{event.eventName}</h2>
        <p className="event-timeAndDate">{getFormattedDate()}</p>
        <p className="place">{event.place}</p>
        <p className="event-description">{event.description}</p>
        <p className="ticket-info">
          Tickets available: {numTicketsAvailable} (capacity: {event.capacity})
        </p>

        <div className="event-actions">
        {isBookable ? (
          <button className="book-button" onClick={() => bookTicket()}>
              Book Ticket
            </button>
        ) : (
          <button className="sold-out-button">Sold Out!</button>
        )}
          {isAdmin && (
              <div className="admin-actions">
                <button onClick={() => onEdit(event)}>Edit</button>
                <button onClick={() => onDelete(event.id)}>Delete</button>
              </div>
          )}
>>>>>>> Stashed changes
        </div>
      </div>
  );
};

export default EventCard;
