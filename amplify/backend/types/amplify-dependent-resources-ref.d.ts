export type AmplifyDependentResourcesAttributes = {
  "api": {
    "ncceventplanner": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string"
    }
  },
  "auth": {
    "nccauth": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    },
    "userPoolGroups": {
      "adminsGroupRole": "string"
    }
  },
  "storage": {
    "EventImages": {
      "BucketName": "string",
      "Region": "string"
    }
  }
}