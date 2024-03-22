import { IonButton, IonContent, IonInput, IonItem, IonList, IonPage, IonTextarea } from '@ionic/react'
import React from 'react'
import Header from '../components/Header'

const Contact = () => {
    return (
        <IonPage>
            <Header title='Contact' />
            <IonContent>
                <IonList className='ion-padding'>
                    <IonItem>
                        <IonInput label='Name' labelPlacement='floating' />
                    </IonItem>
                    <IonItem>
                        <IonInput label='Email' labelPlacement='floating' />
                    </IonItem>
                    <IonItem>
                        <IonTextarea label="Message" labelPlacement='floating' placeholder="Enter message"></IonTextarea>
                    </IonItem>

                </IonList>
                <IonButton expand='block' className='ion-padding'>Submit</IonButton>
            </IonContent>
        </IonPage>
    )
}

export default Contact