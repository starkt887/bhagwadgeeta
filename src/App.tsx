import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonFab, IonFabButton, IonIcon, IonLoading, IonNav, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import AppTabs from './router/AppTabs';
import { AuthContext, AuthProvider, useAuthInit } from './util/auth';
import Login from './pages/Login';
import { useEffect, useState } from 'react';
import { add as addIcon } from 'ionicons/icons';
import { useGitaChapters } from './services/gitaService';



const App: React.FC = () => {


  const { loading, isloggedin, userid } = useAuthInit();

  if (loading) {
    return <IonLoading isOpen={loading} />
  }




  return (
    <IonApp>
      <AuthProvider value={{ isloggedin, userid, loading }}>
        <IonReactRouter>
          <Switch>
            {isloggedin ?
              <Route path="/">
                <AppTabs />
              </Route> :
              <>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Redirect to="/login" />
              </>}

          </Switch>

        </IonReactRouter>
      </AuthProvider>
    </IonApp>
  );
}

export default App;
