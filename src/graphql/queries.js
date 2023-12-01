/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      studentId
      name
      surname
      METUmail
      yoS
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        studentId
        name
        surname
        METUmail
        yoS
        id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getAdmin = /* GraphQL */ `
  query GetAdmin($id: ID!) {
    getAdmin(id: $id) {
      adminId
      username
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listAdmins = /* GraphQL */ `
  query ListAdmins(
    $filter: ModelAdminFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAdmins(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        adminId
        username
        id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      eventId
      timeAndDate
      eventName
      eventPoster
      place
      price
      capacity
      eventPlanner
      description
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        eventId
        timeAndDate
        eventName
        eventPoster
        place
        price
        capacity
        eventPlanner
        description
        id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
