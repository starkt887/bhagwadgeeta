import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React, { useEffect } from 'react'
import Header from '../components/Header'
import ListItem from '../components/ListItem'
import { useGitaSaves } from '../services/gitaService'
import { useAuthContext } from '../util/auth'
import { IShlokmodel } from '../models/geetamodel'
import { useLocation } from 'react-router'



const Saved = () => {

  const { isloggedin, userid } = useAuthContext()
  const { SavedShloks, getSavedShloks } = useGitaSaves()

  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname !== '/saved')//a small trick to update saved whenever jumped on the saved url
      return;
    console.log("Getting saved")
    console.log(pathname)
    if (isloggedin && userid)
      getSavedShloks(userid!)

  }, [pathname])





  return (
    <IonPage>
      <Header title='Saved' />
      <IonContent fullscreen className='ion-padding'>
        {/* list of all the shloks */}
        <IonList>
          <IonListHeader>
            <IonLabel>
              <h2>Saved Shloks</h2>
            </IonLabel>
          </IonListHeader>

          {SavedShloks && SavedShloks.map((data: IShlokmodel) => {
            return <ListItem
              key={data.id}
              id={String(data.id)}
              title={`Shlok - ${data.id}`}
              shortdescription={data.text_english}
              path={`saved/chapter/${data.chapter_number}/shlok`}
            />
          })}

        </IonList>
      </IonContent>
    </IonPage>
  )
}
{/* <ListItem
              key={id}
              id={String(id)}
              title={data.title}
              shortdescription={data.description}
              path={`adhyay/0/shlok`}
            /> */}
export default Saved