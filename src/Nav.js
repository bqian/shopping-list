import React, { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { HomeOutlined, UserOutlined, ProfileOutlined } from '@ant-design/icons'
import checkUser from './CheckUser'
import { Hub } from 'aws-amplify'

const Nav = (props) => {
    const { current } = props
    const [user, updateUser] = useState({})

    useEffect(() => {
        console.log('check user')
        checkUser(updateUser)
        Hub.listen('auth', (data) => {
            const { payload: {event} } = data
            console.log(event)
            if(event === 'signIn' || event === 'signOut') {
                checkUser(updateUser)
            }
        })
    }, [])

    return (
        <div>
            <Menu selectedKeys={[current]} mode="horizontal">
                <Menu.Item key="home">
                    <Link to={`/`}><HomeOutlined/>Home</Link>
                </Menu.Item>
                <Menu.Item key="profile">
                    <Link to={`/profile`}><ProfileOutlined/>Profile</Link>
                </Menu.Item>
                {
                    // return admin menu if user is authorized administrator
                    user.isAuthorized && (
                        <Menu.Item key="admin">
                        <Link to={`/admin`}><UserOutlined/>Admin</Link>
                        </Menu.Item>
                    )
                }
            </Menu>
        </div>
    )
}

export default Nav