import { API, Auth, graphqlOperation } from "aws-amplify";
import {
  createEvent,
  deleteEvent,
} from "./graphql/mutations";
import { listEvents } from "./graphql/queries";

export const deleteAllRecords = async () => {
  console.log("Attempting to delete all records");

  const events = await API.graphql(graphqlOperation(listEvents));
  const event_ids = events.data.listEvents.items.map((event) => event.eventId);

  event_ids.map((id) => {
    return API.graphql(graphqlOperation(deleteEvent, { input: { id } }));
  });

  console.log("All records deleted");
};

export const addMockRecords = async () => {
  // First, create some availabilities (that will be added to a room)
  // On the 24 hour clock, these are the possible start and end hours
  const startHours = [17, 18, 19, 20];
  let availabilities = [];

  try {
    for (let i = 0; i < 7; i++) {
      // Set initial date to today's date
      var datetime_start = new Date();
      datetime_start.setDate(datetime_start.getDate() + i);


      datetime_start.setHours(startHours[getRandomIndex(startHours.length)]);
      datetime_start.setMinutes(0);
      datetime_start.setSeconds(0);
      datetime_start.setMilliseconds(0);


      availabilities.push({
        datetime_start: datetime_start.toISOString(),
      });
    }

  } catch (error) {
    console.log(error);
    }

  // Now add some events (the current admin is the 'owner' in each case)
  try {
    const userInfo = await Auth.currentAuthenticatedUser();
    let signedin_student_id = userInfo.attributes.sub;
    var names = [
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

    for (var i = -5; i < 5; i++) {
      // Some events are in the past, some are in the future (for testing purposes)
      var event_datetime_start = new Date();
      event_datetime_start.setDate(event_datetime_start.getDate() + i);
      event_datetime_start.setHours(17);
      event_datetime_start.setMinutes(0);
      event_datetime_start.setSeconds(0);
      event_datetime_start.setMilliseconds(0);


      var randomClub = getRandomIndex(names.length);

      const response = await API.graphql({
        query: createEvent,
        variables: {
          input: {
            eventId: i+5,
            eventName: names[randomClub],
            description: "All welcome at our events",
            eventPlanner: signedin_student_id,
            place: "Zoom",
            // image_file_name: storage_key.key,
            timeAndDate: event_datetime_start.toISOString(),
            price: 0,   
            capacity: getRandomIndex(25) + 25, // the creator gets the first ticket
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