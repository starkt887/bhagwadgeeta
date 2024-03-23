import { IonFab, IonFabButton, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router'
import Home from '../pages/Home'
import Saved from '../pages/Saved'
import Settings from '../pages/Settings'
import Progress from '../pages/Progress'
import { home as HomeIcon, settings as SettingsIcon, statsChart as ProgressIcon, heart as heartIcon, add as addIcon } from 'ionicons/icons';
import Header from '../components/Header'
import Footer from '../components/Footer'
import Notifications from '../pages/Notifications'
import SingleAadhyay from '../pages/SingleAadhyay'
import SingleShlok from '../pages/SingleShlok'
import Contact from '../pages/Contact'
import About from '../pages/About'
import Privacy from '../pages/Privacy'
import Login from '../pages/Login'
import { useAuthContext, useAuthInit } from '../util/auth'
import Disclaimer from '../pages/Disclaimer'



const AppTabs = () => {


    const { isloggedin, userid } = useAuthContext()

    const { pathname } = useLocation()



    if (pathname.includes('saved') || pathname.includes('progress')) {
        console.log('Checking route', pathname)
        if (!isloggedin && !userid)
            return <Redirect to='/login' />
    }

    // if (!isloggedin) {
    //     console.log('Going to login')
    //     return <Redirect to='/login' />
    // }

    return (

        <IonTabs>
            <IonRouterOutlet>
                <Route exact path="/home">
                    <Home />
                </Route>
                <Route exact path="/home/chapter/:aid">
                    <SingleAadhyay />
                </Route>
                <Route exact path="/home/chapter/:aid/shlok/:sid">
                    <SingleShlok />

                </Route>

                <Route exact path="/saved/chapter/:aid/shlok/:sid">
                    <SingleShlok />
                </Route>

                <Route exact path="/saved">
                    <Saved />
                </Route>
                <Route exact path="/progress">
                    <Progress />
                </Route>


                <Route exact path="/settings">
                    <Settings />
                </Route>
                <Route exact path="/contact">
                    <Contact />
                </Route>
                <Route exact path="/about">
                    <About />
                </Route>
                <Route exact path="/privacy">
                    <Privacy />
                </Route>
                <Route exact path="/disclaimer">
                    <Disclaimer />
                </Route>
                {/* <Route exact path="/notifications">
                    <Notifications />
                </Route>
                 */}
                <Route exact path="/">
                    <Redirect to={"/home"} />
                </Route>
                <Route exact path="/login">
                    <Redirect to={"/home"} />
                </Route>
            </IonRouterOutlet>
            <IonTabBar slot='bottom'>
                <IonTabButton tab='home' href='/home'>
                    <IonIcon icon={HomeIcon} />
                    <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab='saved' href='/saved'>
                    <IonIcon icon={heartIcon} />
                    <IonLabel>Saved</IonLabel>
                </IonTabButton>
                <IonTabButton tab='progress' href='/progress'>
                    <IonIcon icon={ProgressIcon} />
                    <IonLabel>Progress</IonLabel>
                </IonTabButton>
                <IonTabButton tab='settings' href='/settings'>
                    <IonIcon icon={SettingsIcon} />
                    <IonLabel>Settings</IonLabel>
                </IonTabButton>
            </IonTabBar>

        </IonTabs>

    )
}

export default AppTabs