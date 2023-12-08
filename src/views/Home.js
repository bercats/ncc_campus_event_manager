// Home.js
import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
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
            default:
                break;
        }
    };

    const showAllUpcomingEvents = () => {
        setCurrentEventsView('All Upcoming Events');
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

    return (
        <div className="home">
            <div className="sidebar">
                <div className="sidebar-header">
                    <h2>Event Planner</h2>
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
