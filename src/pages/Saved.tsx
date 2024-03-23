import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonListHeader, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ListItem from '../components/ListItem'
import { useGitaSaves } from '../services/gitaService'
import { useAuthContext } from '../util/auth'
import { IShlokmodel, IUsableShlokmodel } from '../models/geetamodel'
import { useLocation } from 'react-router'



const Saved = () => {

  const { isloggedin, userid, language } = useAuthContext()
  const { SavedShloks, getSavedShloks } = useGitaSaves()

  const { pathname } = useLocation()
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    if (pathname !== '/saved')//a small trick to dynamicall update saved list whenever jumped on the saved url
      return;
    console.log("Getting saved")
    console.log(pathname)
    async function loadShloks() {
      setLoading(true)
      await getSavedShloks(userid!, language!)
      setLoading(false)
    }
    if (isloggedin && userid)
      loadShloks()
  }, [pathname])





  return (
    <IonPage>
      <Header title='Saved' />
      <IonLoading isOpen={loading} />
      <IonContent fullscreen className='ion-padding'>
        {/* list of all the shloks */}
        <IonList>
          <IonListHeader>
            <IonLabel>
              <h2>Saved Shloks</h2>
            </IonLabel>
          </IonListHeader>

          {SavedShloks && SavedShloks.map((data: IUsableShlokmodel) => {
            return <ListItem
              key={data.id}
              id={String(data.id)}
              title={`Shlok - ${data.id}`}
              shortdescription={data.text}
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