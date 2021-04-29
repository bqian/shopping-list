import React, { useEffect, useState } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Nav from './Nav'
import Main from './Main'
import Admin from './Admin'
import Profile from './Profile'

export default function Router() {
    const [current, setCurrent] = useState('home')

    function setRoute() {
        const location = window.location.href.split('/')
        const pathname = location[location.length-1]
        console.log('path name: ', pathname)
        setCurrent(pathname?pathname:'home')
    }

    useEffect(() => {
        setRoute()
        window.addEventListener('hashchange', setRoute)

        return () => {
            window.removeEventListener('hashchange', setRoute)
        }
    }, [])

    return (
        <HashRouter>
            <Nav current={current}/>
            <Switch>
                <Route exact path='/' component={Main}/>
                <Route path='/admin' component={Admin}/>
                <Route path='/profile' component={Profile}/>
                <Route component={Main}/>
            </Switch>
        </HashRouter>
    )
}