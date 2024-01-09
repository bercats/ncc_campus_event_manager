import {EventUpdateForm} from "./index";
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import {ScrollView} from "@aws-amplify/ui-react";
const EventCard = ({ event, isAdmin, onEdit, onDelete  }) => {
  const [showEditForm, setShowEditForm] = useState(false);

  // Parse numbers from event data
  const parseInteger = (value) => isNaN(parseInt(value)) ? 'N/A' : parseInt(value);

  // If event.seatsLeft is not provided, we assume all seats are available.
  const price = event.price || '0';
  const parsedCapacity = parseInt(event.capacity);
  const parsedSeatsLeft = parseInt(event.seatsLeft);
  const numTicketsAvailable = event.capacity - event.seatsLeft;
  const isBookable =  numTicketsAvailable > 0;
  console.log('Editing event:', event);
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
    <div className="event-card" style={{display: "grid" , alignItems: "center"}} >

        
        <div className="event-details" style={{alignSelf:"left", maxHeight:"100%",maxWidth: "100%"}}>
          <h2>{event.eventName || 'Event Name Not Available'}</h2>
          <p className="event-timeAndDate">{getFormattedDate()}</p>
          <p className="place">{event.place || 'Location Not Available'}</p>
          <p className="event-description">{event.description || 'No Description Provided'}</p>
          <p className="ticket-info">
            Tickets available: {event.seatsLeft || '0'} / {parsedCapacity}
          </p>
          <span className="event-price">{event.price || 'Free'}</span>
          <p className="seats">{event.seatsLeft || 'No seats available'}</p>
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
            
            {isAdmin && (
                <div className="card-actions">
                  <button onClick={() => setShowEditForm(true)}>Edit</button>
                  <button onClick={() => onDelete(event.id)}>Delete</button>
                </div>
            )}
            {showEditForm && (
                <Popup
                    open={showEditForm}
                    onClose={() => setShowEditForm(false)}
                    modal
                    closeOnDocumentClick
                >
                  <ScrollView maxHeight="700px">
                    <div>
                      <EventUpdateForm
                          event={event}
                          onSubmit={(event) => {
                            // Example function to trim all string inputs
                            const updatedFields = {}
                            Object.keys(event).forEach(key => {
                              if (typeof event[key] === 'string') {
                                updatedFields[key] = event[key].trim()
                              } else {
                                updatedFields[key] = event[key]
                              }
                            })
                            return updatedFields
                          }}
                          onClose={() => setShowEditForm(false)}
                          // Add other props you need to pass to EventUpdateForm
                      />
                    </div>
                  </ScrollView>
                </Popup>
            )}
          </div>
        </div>
        <div style={{alignSelf:"right"}}>{event.eventPoster && <img src={event.url} alt="Event" className="event-image" width="300px"/>} 
        </div>
        
      </div>
  );
};

export default EventCard;
