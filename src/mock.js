// mock.js

import { API, graphqlOperation } from 'aws-amplify';
import { createEvent, createAdmin, createUser} from './graphql/mutations';
import { listEvents, listUsers, listAdmins } from './graphql/queries';
// Function to delete all records
export const deleteAllRecords = async () => {
    try {
        // Delete all events
        const eventsResult = await API.graphql(graphqlOperation(listEvents));
        const eventsToDelete = eventsResult.data.listEvents.items;
        await Promise.all(
            eventsToDelete.map(async (event) => {
                await API.graphql(graphqlOperation(deleteEvent, { input: { id: event.id } }));
            })
        );

        // Delete all users
        const usersResult = await API.graphql(graphqlOperation(listUsers));
        const usersToDelete = usersResult.data.listUsers.items;
        await Promise.all(
            usersToDelete.map(async (user) => {
                await API.graphql(graphqlOperation(deleteUser, { input: { id: user.id } }));
            })
        );

        // Delete all admins
        const adminsResult = await API.graphql(graphqlOperation(listAdmins));
        const adminsToDelete = adminsResult.data.listAdmins.items;
        await Promise.all(
            adminsToDelete.map(async (admin) => {
                await API.graphql(graphqlOperation(deleteAdmin, { input: { id: admin.id } }));
            })
        );

        console.log('All records deleted successfully.');
    } catch (error) {
        console.error('Error deleting records:', error);
    }
};

// Function to add mock records
export const addMockRecords = async () => {
    try {
        // Add mock events
        const mockEvent1 = {
            input: {
                // Add mock event data
                timeAndDate: new Date().toISOString(),
                eventName: 'Mock Event 1',
                // ... other event fields
            }
        };
        await API.graphql(graphqlOperation(createEvent, mockEvent1));

        const mockEvent2 = {
            input: {
                // Add mock event data
                timeAndDate: new Date().toISOString(),
                eventName: 'Mock Event 2',
                // ... other event fields
            }
        };
        await API.graphql(graphqlOperation(createEvent, mockEvent2));

        // Add mock admins
        const mockAdmin1 = {
            input: {
                // Add mock admin data
                username: 'mock_admin_1',
                // ... other admin fields
            }
        };
        await API.graphql(graphqlOperation(createAdmin, mockAdmin1));

        // Add mock users
        const mockUser1 = {
            input: {
                // Add mock user data
                name: 'Mock User 1',
                // ... other user fields
            }
        };
        await API.graphql(graphqlOperation(createUser, mockUser1));

        console.log('Mock records added successfully.');
    } catch (error) {
        console.error('Error adding mock records:', error);
    }
};


// GraphQL query to list events
export const listMockEvents = async () => {
    try {
        // Mock data for events
        const mockEvents = [
            {
                eventId: '1',
                timeAndDate: '2023-12-31T12:00:00Z',
                eventName: 'Mock Event 1',
                eventPoster: 'mock-event-1.jpg',
                place: 'Mock Venue 1',
                price: 10,
                capacity: 100,
                eventPlanner: 'Mock Planner 1',
                description: 'This is a mock event description.',
                id: 'mock-event-1-id',
                createdAt: '2023-01-01T00:00:00Z',
                updatedAt: '2023-01-01T00:00:00Z',
                __typename: 'Event',
            },
            {
                eventId: '2',
                timeAndDate: '2023-12-31T15:00:00Z',
                eventName: 'Mock Event 2',
                eventPoster: 'mock-event-2.jpg',
                place: 'Mock Venue 2',
                price: 20,
                capacity: 150,
                eventPlanner: 'Mock Planner 2',
                description: 'This is another mock event description.',
                id: 'mock-event-2-id',
                createdAt: '2023-01-02T00:00:00Z',
                updatedAt: '2023-01-02T00:00:00Z',
                __typename: 'Event',
            },
        ];

        // Return the mock events
        return mockEvents;
    } catch (error) {
        console.error('Error listing mock events:', error);
        return [];
    }
};

