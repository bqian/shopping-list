/* eslint-disable-line */

const aws = require('aws-sdk');

exports.handler = async (event, context, callback) => {
  const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });

  let isAdmin = false
  const adminEmails = ['binsen1988@gmail.com']
  if(adminEmails.indexOf(event.request.userAttributes.email) !== -1) {
    isAdmin = true
  }

  const groupParams = {
    GroupName: process.env.GROUP,
    UserPoolId: event.userPoolId,
  };

  const addUserParams = {
    GroupName: process.env.GROUP,
    UserPoolId: event.userPoolId,
    Username: event.userName,
  };

  if(isAdmin) {
    groupParams.GroupName = 'Admin'
    addUserParams.GroupName = 'Admin'
  } else {
    // do nothing for not admin user
    callback(null, event)
  }

  // create group if not exits
  try {
    await cognitoidentityserviceprovider.getGroup(groupParams).promise();
  } catch (e) {
    await cognitoidentityserviceprovider.createGroup(groupParams).promise();
  }

  // add user to group
  try {
    await cognitoidentityserviceprovider.adminAddUserToGroup(addUserParams).promise();
    callback(null, event)
    return {
      statusCode: 200,
      body: JSON.stringify(event)
    }
  } catch (error) {
    callback(error)
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
};
