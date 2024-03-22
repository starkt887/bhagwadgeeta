import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'

type Props = {}

const Adhyays = (props: Props) => {
  return (
           <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Adhyays</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className='ion-padding'>
                Adhyays Page
            </IonContent>
        </IonPage>

  )
}

export default Adhyays