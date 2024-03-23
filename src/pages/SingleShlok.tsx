import { IonContent, IonFab, IonFabButton, IonIcon, IonLoading, IonPage, IonText, } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useHistory, useLocation, useParams } from 'react-router'
import { book as bookIcon, heart as heartIcon, arrowForward as arrowForwardIcon, arrowBack as arrowBackIcon } from "ionicons/icons"
import { useGitaSaves, useGitaShloksSingle } from '../services/gitaService'
import { useAuthContext } from '../util/auth'

interface useParameters {
  aid: string
  sid: string
}

const SingleShlok = () => {
  const { aid, sid } = useParams<useParameters>();
  const { pathname } = useLocation();
  const history = useHistory()

  const { isloggedin, userid, language } = useAuthContext()
  const { currentShlok, getAllShloksSetCurrent, nextShlok, prevShlok } = useGitaShloksSingle();
  const { saveShlok, isShlokInFavorites } = useGitaSaves()
  const [isFavorite, setisFavorite] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)

  let rendercount = 0//work around for strict modes twice rerender and can be removed at production
  useEffect(() => {
    // console.log(aid, sid)
    // console.log(isloggedin, userid)
    async function loadSingleShlok() {
      setLoading(true)
      await getAllShloksSetCurrent(Number(aid), Number(sid), userid!, language!)
      setLoading(false)
    }
    if (rendercount == 0)
      loadSingleShlok()
    rendercount++;
  }, [])

  useEffect(() => {
    favStatusChk()
  }, [currentShlok])

  const verifyAndSave = async () => {
    console.log("Loggedin:", isloggedin, "Userid:", userid)
    if (!isloggedin && !userid) {
      history.replace(`/login/home-chapter-${currentShlok?.chapter_number}-shlok-${currentShlok?.id}`)
      return
    }
    await saveShlok(userid!, currentShlok!)
    favStatusChk()
  }




  const favStatusChk = async () => {
    // console.log(isFavorite)
    let result = await isShlokInFavorites(userid!, currentShlok!)
    !result ? setisFavorite(false) : setisFavorite(true)

  }
  const isOnSaved = () => {
    return pathname.includes('saved')
  }
  return (
    <IonPage>
      <Header title='Shlok no' />
      <IonLoading isOpen={loading} />
      <IonContent fullscreen className='ion-padding'>
        <IonText class='ion-text-center ion-justify-center'>
          <h4>Shlok: {currentShlok?.verse_number}</h4>
        </IonText>
        <div><hr style={{ color: '#d9d9d9', borderTop: "1px solid", marginBottom: "20px" }} /></div>
        <IonText class='ion-text-center'>
          <h3>"{currentShlok?.text}"</h3>
        </IonText>
        <div><hr style={{ color: '#d9d9d9', borderTop: "2px solid", marginBottom: "20px" }} /></div>
        <IonText class='ion-text-center'>
          <h4>Description</h4>
          <p>{currentShlok?.description}</p>
        </IonText>



        <IonFab slot="fixed" vertical="top" horizontal="end">
          <IonFabButton size='small' onClick={verifyAndSave} color='secondary' >
            <IonIcon icon={heartIcon} color={isFavorite ? "danger" : "light"}></IonIcon>
          </IonFabButton>
        </IonFab>

        {!isOnSaved() ? <>
          <IonFab slot="fixed" vertical="bottom" horizontal="start">
            <IonFabButton size='small' color='tertiary' onClick={() => {
              prevShlok()
              favStatusChk()
            }}>
              <IonIcon icon={arrowBackIcon}></IonIcon>
            </IonFabButton>
          </IonFab>
          <IonFab slot="fixed" vertical="bottom" horizontal="end">
            <IonFabButton size='small' color='tertiary' onClick={() => {
              nextShlok()
              favStatusChk()
            }}>
              <IonIcon icon={arrowForwardIcon}></IonIcon>
            </IonFabButton>
          </IonFab></> : ""}

      </IonContent>
    </IonPage >

  )
}

export default SingleShlok