import React from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import {Home, Contact, News, Plants, Animals2, Nav, Login_Registr} from './pages'


const Router = () => {
    console.log('Router');
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/home' component={Home} exact/>
                <Route path='/nav' component={Nav} exact/>
                <Route path='/contacts' component={Contact} exact/>
                <Route path='/news' component={News} exact/>
                <Route path='/plants' component={Plants} exact/>
                <Route path='/animals' component={Animals2}/>
                <Route path='/:typePage' component={Login_Registr} exact/>
                <Redirect to='/home'/>
            </Switch>
        </BrowserRouter>
    )
}

export default Router