// Home.js
import React, { useEffect, useState } from 'react';
import { Storage, Auth, API, graphqlOperation  } from 'aws-amplify';
import { listEvents} from "../graphql/queries";
import { listMockEvents } from '../mock';
import EventCard from "../ui-components/EventCard";
import './Home.css';
import { deleteAllRecords, addMockRecords } from "../mock.js"
const menuItems = [
    {
        menuText: 'All Upcoming Events',
        iconName: 'mdi-calendar-arrow-right',
        methodName: 'showAllUpcomingEvents',
    },
    {
        menuText: 'All Past Events',
        iconName: 'mdi-calendar-arrow-left',
        methodName: 'showAllPastEvents',
    },
    {
        menuText: 'My Tickets',
        iconName: 'mdi-ticket',
        methodName: 'showMyTickets',
    },
    {
        menuText: 'My Planned Events',
        iconName: 'mdi-calendar-edit',
        methodName: 'showMyPlannedEvents',
    },
];

const Home = () => {
    const [currentEventsView, setCurrentEventsView] = useState('All Upcoming Events');
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminDialog, setAdminDialog] = useState(false);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const userInfo = await Auth.currentAuthenticatedUser();
                const groups = userInfo.signInUserSession.accessToken.payload['cognito:groups'];
                if (groups && groups.includes('admins')) {
                    setIsAdmin(true);
                }
                console.log('User is admin:', isAdmin);
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
            default:
                break;
        }
    };

    const showAllUpcomingEvents = async () => {
        setCurrentEventsView('All Upcoming Events');
        
        try {
            const results = await API.graphql(graphqlOperation(listEvents, {
              filter: { event_datetime_start: { gt: new Date().toISOString(), }, }, }));
        
            let events = results.data.listEvents.items;
            const mockEvents = await listMockEvents();
            console.log('Mock Events:', mockEvents);
            mockEvents.sort((a, b) => {
              const astart = new Date(a.event_datetime_start);
              const bstart = new Date(b.event_datetime_start);
              return astart - bstart;
            });
        
            setEvents(mockEvents);
            console.log('Updated Events State:', events);
        
            await getSecureImageUrls();
            
        
          } catch(err) {
            console.log("Error retrieving events: ", err)
          }
    };

    const showAllPastEvents = () => {
        setCurrentEventsView('All Past Events');
    };

    const showMyTickets = () => {
        setCurrentEventsView('My Tickets');
    };

    const showMyPlannedEvents = () => {
        setCurrentEventsView('My Planned Events');
    };

    const adminTools = () => {
        setCurrentEventsView('Admin Tools');
        deleteAllRecords();
        addMockRecords();
        setAdminDialog(false);
    };

    const signOut = async () => {
        await Auth.signOut();
        // Redirect to sign-in page
    };

    const handleAdminDialogClose = () => {
        setAdminDialog(false);
    };

    const handleAdminDialogProceed = () => {
        // Add your logic for adminTools
        console.log('Proceeding with adminTools');

        // Call the adminTools function
        adminTools();
    };
    
    const getSecureImageUrls = async (events) => { // Modify function signature
        const updatedEvents = await Promise.all(
            events.map(async (event) => {
                event.url = ""; // add the url field to the event
                if (event.image_file_name) {
                    try {
                        const preSignedImageURL = await Storage.get(event.image_file_name, {
                            level: "protected",               // defaults to `public`
                            identityId: event.student_id,     // id of another user, if `level: protected`
                            download: false,                  // defaults to false
                            contentType: "image/*",           // set return content type, eg "text/html"
                        });
                        console.log("Url: ", preSignedImageURL);
                        event.url = preSignedImageURL;
                    } catch (err) {
                        console.log(err);
                    }
                }
                return event;
            })
        );

        return updatedEvents; // Return the updated events
    };


    return (
        <div className="home">
            <div className="sidebar">
                <div className="sidebar-header">
                    <h2>NCC Event Planner</h2>
                </div>
                {menuItems.map((item) => (
                        <div className="menu-item" onClick={() => callMethod(item.methodName)} key={item.menuText}>
                            <i className={item.iconName}></i>
                            <span>{item.menuText}</span>
                        </div>
                    ))}
            </div>
            <div className="content">
                <div className="app-bar">
                    <h1>{currentEventsView}</h1>
                    <div className="admin-signout">
                        {isAdmin && <button onClick={() => setAdminDialog(true)}>ADMIN</button>}
                        <button onClick={signOut}>Sign Out</button>
                    </div>
                </div>
                <div className="main-container">
                    {/* This is where events will appear */}
                    {events.map(event => (
                        <div key={event.id}>
                            <EventCard event={event} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Admin Dialog */}
            {adminDialog && (
                <div className="admin-dialog">
                    <p>Warning: This command will delete ALL the data in the database, and then add some mock (fake) data.</p>
                    <button onClick={handleAdminDialogProceed}>Proceed</button>
                    <button onClick={handleAdminDialogClose}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default Home;
