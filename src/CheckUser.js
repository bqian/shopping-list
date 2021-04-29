import { Auth } from 'aws-amplify'

async function checkUser(updateUser) {
    const userData = await Auth.currentSession().catch(err => console.log('Authentication error: ', err))
    if(!userData) {
        console.log('user data: ', userData)
        updateUser({})
        return
    }
    const { idToken: {payload}} = userData
    const isAuthorized = payload['cognito:groups'] && payload['cognito:groups'].includes('Admin')
    updateUser({
        username: payload['cognito:username'],
        isAuthorized
    })
}

export default checkUser