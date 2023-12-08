import { API, Auth, graphqlOperation } from "aws-amplify";
import {
    createUser,
    createAdmin,
    createEvent,
    updateUser,
    updateEvent,
    updateAdmin,
    deleteUser,
    deleteEvent,
    deleteAdmin,
} from "./graphql/mutations";
import { listEvents, listUsers, listAdmins } from "./graphql/queries";

export const deleteAllRecords = async () => {
    console.log("Attempting to delete all events");
    const events = await API.graphql(graphqlOperation(listEvents));
    const event_ids = events.data.listEvents.items.map((event) => event.id);
    await Promise.all(
        event_ids.map(async (id) => {
            return API.graphql(graphqlOperation(deleteEvent, { input: { id } }));
        })
    );
    console.log("All events deleted");
};

export const addMockRecords = async () => {
    const userInfo = await Auth.currentAuthenticatedUser();
    const signedin_student_id = userInfo.attributes.sub;
    const names = [
        "Chess Club",
        "Debate Club",
        "Photography Society",
        "Student Newspaper",
        "Model UN",
        "Film Club",
        "Creative Writing Society",
        "LGBTQI+ Alliance",
        "Engineering Club",
        "Dance Team",
    ];

    try {
        for (let i = -5; i < 5; i++) {
            // Some events are in the past, some are in the future (for testing purposes)
            const event_datetime_start = new Date();
            event_datetime_start.setDate(event_datetime_start.getDate() + i);
            const event_datetime_end = new Date(event_datetime_start);
            event_datetime_start.setHours(17);
            event_datetime_start.setMinutes(0);
            event_datetime_start.setSeconds(0);
            event_datetime_start.setMilliseconds(0);

            event_datetime_end.setHours(19);
            event_datetime_end.setMinutes(0);
            event_datetime_end.setSeconds(0);
            event_datetime_end.setMilliseconds(0);

            const randomClub = getRandomIndex(names.length);

            const response = await API.graphql({
                query: createEvent,
                variables: {
                    input: {
                        name: names[randomClub],
                        description: "All welcome at our events",
                        event_owner: signedin_student_id,
                        // image_file_name: storage_key.key,
                        event_datetime_start: event_datetime_start.toISOString(),
                        event_datetime_end: event_datetime_end.toISOString(),
                        event_duration: 2,
                        total_tickets: getRandomIndex(25) + 25,
                        tickets: [{ student_id: signedin_student_id }], // the creator gets the first ticket
                    },
                },
            });
            console.log("Response: ", response.data.createEvent);
        }
    } catch (err) {
        console.log("Error: ", err);
    }
};

function getRandomIndex(maxIndex) {
    return Math.floor(Math.random() * maxIndex);
}