import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonLoading, } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import AppTabs from './router/AppTabs';
import { AuthProvider, useAuthInit } from './util/auth';
import Login from './pages/Login';
import { useState } from 'react';

import { useLangauge } from './services/settingService';



const App: React.FC = () => {


  const { loading, isloggedin, userid, language } = useAuthInit();
  const { changeLanguage } = useLangauge()
  const [lang, setLang] = useState(language)

  if (loading) {
    return <IonLoading isOpen={loading} />
  }

  const updateLanguage = (lang: string) => {
    // console.log("langauge:", lang)
    changeLanguage(lang, userid!)
    setLang(lang)
  }



  return (
    <IonApp>
      <AuthProvider value={{ isloggedin, userid, language: lang, updateLanguage, }}>

        <IonReactRouter>
          <Switch>

            <Route exact path="/login">
              {isloggedin && <Redirect to='/home' />}
              <Login />
            </Route>
            <Route exact path="/login/:route">
              {isloggedin && <Redirect to='/home' />}
              <Login />
            </Route>

            <Route path="/">
              <AppTabs />
            </Route>
          </Switch>

        </IonReactRouter>

      </AuthProvider>
    </IonApp>
  );
}

export default App;
