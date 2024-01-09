// Home.js
import React, { useEffect, useState } from 'react';
import {Amplify, Storage, Auth, API, graphqlOperation  } from 'aws-amplify';
import { ScrollView } from '@aws-amplify/ui-react';
import {getAdmin, listEvents} from "../graphql/queries";
import EventCard from "../ui-components/EventCard";
import './Home.css';
import { deleteAllRecords, addMockRecords } from "../mock2.js"
import  EventCreator from "../ui-components/EventCreator";
import {createEvent, deleteEvent, updateEvent} from '../graphql/mutations';
import {EventUpdateForm} from '../ui-components';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import amplifyconfig from '../amplifyconfiguration.json';
//const client = generateClient()
Amplify.configure(amplifyconfig);

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
];



const Home = () => {
    const [currentEventsView, setCurrentEventsView] = useState('All Upcoming Events');
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminDialog, setAdminDialog] = useState(false);
    const [events, setEvents] = useState([]);
    const [showEventCreateForm, setShowEventCreateForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showMockDataAddedPopup, setShowMockDataAddedPopup] = useState(false);

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
    }, [isAdmin]);

    const callMethod = (methodName) => {
        switch (methodName) {
            case 'showAllUpcomingEvents':
                showAllUpcomingEvents();
                break;
            case 'showAllPastEvents':
                showAllPastEvents();
                break;
            default:
                break;
        }
    };

    const showAllUpcomingEvents = async () => {
        setCurrentEventsView('All Upcoming Events');

        try {
            const results = await API.graphql(graphqlOperation(listEvents, {
                filter: { timeAndDate: { gt: new Date().toISOString(), }, }, }));

            let events = results.data.listEvents.items;
            // const mockEvents = await listMockEvents();
            // console.log('Mock Events:', mockEvents);
            events.sort((a, b) => {
                const astart = new Date(a.timeAndDate);
                const bstart = new Date(b.timeAndDate);
                return astart - bstart;
            });

            
            console.log('Updated Events State:', events);

            events=await getSecureImageUrls(events);
            setEvents(events);

        } catch(err) {
            console.log("Error retrieving events: ", err)
        }
    };


    const showAllPastEvents = async () => {
        setCurrentEventsView('All Past Events');
        try {
            // Use the current date and time as the reference point
            const currentDate = new Date();
    
            // Adjust the GraphQL query to fetch events with timeAndDate less than the current date
            const results = await API.graphql(graphqlOperation(listEvents, {
                filter: {
                    timeAndDate: {
                        lt: currentDate.toISOString(),
                    },
                },
            }));
    
            let pastEvents = results.data.listEvents.items;
            pastEvents.sort((a, b) => {
                const aDate = new Date(a.timeAndDate);
                const bDate = new Date(b.timeAndDate);
                return bDate - aDate; // Sorting in descending order (most recent past events first)
            });
    
            setEvents(pastEvents);
            console.log('Updated Events State with Past Events:', pastEvents);
    
            // Optionally, update the event URLs if needed
            pastEvents=await getSecureImageUrls(pastEvents);
            setEvents(pastEvents);
    
        } catch (err) {
            console.log("Error retrieving past events: ", err);
        }
    };

    const signOut = async () => {
        await Auth.signOut();
        // Redirect to sign-in page
    };

    const handleAdminDialogClose = () => {
        setShowMockDataAddedPopup(false);
        setAdminDialog(false);
    };

    const handleAdminDialogProceed = async () => {
        console.log('Proceeding with adminTools');
        try {
            setShowMockDataAddedPopup(true);
            await addMockRecords();
            setAdminDialog(false);
            await showAllUpcomingEvents();
        } catch (error) {
            console.error('Error performing adminTools:', error);
        }
    };

    const editEvent = async (event) => {
        setShowUpdateForm(!showUpdateForm)
        try {
            await API.graphql(graphqlOperation(updateEvent, {input: {eventId: event.eventId,
                    timeAndDate: event.timeAndDate,
                    eventName: event.eventName,
                    eventPoster: event.poster,
                    place: event.place,
                    price: event.price,
                    capacity: event.capacity,
                    eventPlanner: event.eventPlanner,
                    description: event.description,
                    id: event.id,
                    createdAt: event.createdAt,
                    updatedAt: getAdmin,
                    __typename: event.__typename}}));

            await showAllUpcomingEvents();
        } catch (err) {
            console.error('Error deleting event:', err);
        }
        return (<EventUpdateForm/>);
    };

    const ondeleteEvent = async (eventId) => {
        try {
            await API.graphql(graphqlOperation(deleteEvent, { input: { id: eventId } }));

            await showAllUpcomingEvents();
        } catch (err) {
            console.error('Error deleting event:', err);
        }
    };

    const toggleEventCreateForm = () => {
        setShowEventCreateForm(!showEventCreateForm);
        
        return (<EventCreator/>);
    };
    
    const getSecureImageUrls = async (events) => { // Modify function signature
        const updatedEvents = await Promise.all(
            events?.map(async (event) => {
                event.url = ""; // add the url field to the event
                if (event.eventPoster) {
                    try {
                        const preSignedImageURL = await Storage.get(event.eventPoster, {
                            level: "public",               // defaults to `public`
                            //identityId: event.student_id,     // id of another user, if `level: protected`
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
                    {isAdmin && (
                    <div className="menu-item" onClick={() => toggleEventCreateForm()}>
                        <i className="fas fa-plus"></i>
                        
                        <Popup  name="popup" trigger={<button className="button"> Create Event </button>}  modal>
                        <ScrollView maxHeight='700px'>
                        <EventCreator
                            onSubmit={(fields) => {
                                // Example function to trim all string inputs
                                const updatedFields = {}
                                Object.keys(fields).forEach(key => {
                                    if (typeof fields[key] === 'string') {
                                        updatedFields[key] = fields[key].trim()
                                    } else {
                                        updatedFields[key] = fields[key]
                                    }
                                })
                                return updatedFields
                            }}
                        />
                        </ScrollView>
                        </Popup>
                    </div>)}
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
                    {events.map((event) => (
                        <div key={event.id} className="event-card-container">
                            <EventCard
                                event={event}
                                isAdmin={isAdmin}
                                onEdit={(event) => editEvent(event)}
                                onDelete={(id) => ondeleteEvent(id)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            {adminDialog && (
                <div className="admin-dialog">
                    <p>Warning: This command will add some 10 mock (fake) data.</p>
                    <button onClick={handleAdminDialogProceed}>Proceed</button>
                    <button onClick={handleAdminDialogClose}>Cancel</button>
                </div>
            )}
            <Popup open={showMockDataAddedPopup} onClose={handleAdminDialogClose} modal closeOnDocumentClick>
                <div>
                    <p>10 mock data entries have been added.</p>
                    <button onClick={handleAdminDialogClose}>OK</button>
                </div>
            </Popup>
        </div>
    );
};

export default Home;
