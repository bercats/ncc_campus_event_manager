import React from 'react';

function EventCard({ event }) {
  const numTicketsAvailable = event.total_tickets - event.tickets.length;
  const bookable = event.tickets.length < event.total_tickets;

  function getFormattedDate() {
    const date = new Date(event.event_datetime_start);
    const day = date.getDate().toString().padStart(2, "0");
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(date);
    const year = date.getFullYear().toString();
    let hours = date.getHours();
    const amPm = hours >= 12 ? "PM" : "AM";
    hours %= 12;
    hours = hours ? hours : 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const endHour = hours + event.event_duration;

    const formattedDate = `${day} ${month} ${year}, ${hours}:${minutes} ${amPm} - ${endHour}:00 ${amPm}`;
    return formattedDate;
  }

  function bookTicket() {
    // Implement your book ticket logic here
  }

  return (
    <div className="card mx-auto" style={{maxWidth: '300px'}}>
      <img src={event.url} alt="Event" style={{width: '100%'}} />
      <div className="card-body">
        <h5 className="card-title">{event.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{getFormattedDate()}</h6>
        <h6 className="card-subtitle mb-2 text-red">{event.room_name}</h6>
        <p className="card-text">{event.description}</p>
        <h6 className="card-subtitle mb-2 text-muted">Tickets available: {numTicketsAvailable} (capacity: {event.total_tickets})</h6>
        <hr className="mx-4 mb-1" />
        {bookable ? (
          <button className="btn btn-primary" onClick={bookTicket}>Book Ticket</button>
        ) : (
          <button className="btn btn-warning" disabled>Sold Out!</button>
        )}
      </div>
    </div>
  );
}

export default EventCard;