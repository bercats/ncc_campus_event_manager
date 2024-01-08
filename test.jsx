import React, { useState, useEffect } from 'react';
import { Auth, API, graphqlOperation, Storage } from 'aws-amplify';
import EventCard from './EventCard'; // Assuming you have this component
import CreateEventForm from './CreateEventForm'; // Assuming you have this component
import { listEvents, getRoom } from '../graphql/queries';
import { deleteAllRecords, addMockRecords } from '../mock'; // AdminTools requirement

const Home = () => {
  const [currentEventsView, setCurrentEventsView] = useState('All Upcoming Events');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminDialog, setAdminDialog] = useState(false);
  const [events, setEvents] = useState([]);
  const [showCreateEventDialog, setShowCreateEventDialog] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser();
        const groups = userInfo.signInUserSession.accessToken.payload['cognito:groups'];
        if (groups && groups.includes('admins')) {
          setIsAdmin(true);
        }
      } catch (err) {
        console.log('Error', err);
      }
    };
    checkAdmin();
  }, []);

  const callMethod = (methodName) => {
    switch (methodName) {
      case 'showAllUpcomingEvents':
        showAllUpcomingEvents();
        break;
      case 'showAllPastEvents':
        showAllPastEvents();
        break;
      case 'showMyTickets':
        showMyTickets();
        break;
      case 'showMyPlannedEvents':
        showMyPlannedEvents();
        break;
      case 'showCreateEventForm':
        setShowCreateEventDialog(true);
        break;
      default:
        break;
    }
  };

  const showAllUpcomingEvents = async () => {
    // ... (Same logic as your Vue method)
  };

  // ... (Other methods like showAllPastEvents, showMyTickets, etc.)

  const adminTools = () => {
    setCurrentEventsView('Admin Tools');
    deleteAllRecords();
    addMockRecords();
    setAdminDialog(false);
  };

  const signOut = async () => {
    await Auth.signOut();
    // Redirect logic (using react-router-dom or any other routing library)
  };

  // ... (Other helper methods like getRoomNames, getSecureImageUrls, etc.)

  return (
    <div>
      {/* Navigation Drawer (using Material-UI or any other UI library) */}
      {/* AppBar (using Material-UI or any other UI library) */}
      {/* Main Content */}
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
      {/* Create Event Dialog (if using a modal library like Material-UI Dialog) */}
      <CreateEventForm onClose={() => setShowCreateEventDialog(false)} open={showCreateEventDialog} />
    </div>
  );
};

export default Home;
