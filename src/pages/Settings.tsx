import { IonActionSheet, IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import Header from '../components/Header'
import { signOut } from 'firebase/auth'
import { auth } from '../services/firebaseService'


const Settings = () => {


    const logout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Signed out success!")
        }).catch((error) => {
            // An error happened.
            console.log("signout:", error)
        });
    }

    const selectLanguage = (detail: any) => {
        console.log(detail.data.action)
    }


    return (
        <IonPage>
            <Header title='Settings' />
            <IonContent fullscreen className='ion-padding'>
                <IonList>
                    <IonItem button id='open-lang-sheet'>
                        <IonLabel>
                            Language
                        </IonLabel>
                    </IonItem>
                    {/* <IonItem button routerLink='/notifications'>
                        <IonLabel>
                            Notifications
                        </IonLabel>
                    </IonItem>
                    <IonItem button>
                        <IonLabel>
                            Remove Ads
                        </IonLabel>
                    </IonItem> */}
                    <IonItem button routerLink='/contact'>
                        <IonLabel>
                            Contact
                        </IonLabel>
                    </IonItem>
                    <IonItem button routerLink='/about'>
                        <IonLabel>
                            About
                        </IonLabel>
                    </IonItem>
                    <IonItem button>
                        <IonLabel>
                            Rate us
                        </IonLabel>
                    </IonItem>
                    <IonItem button routerLink='/privacy'>
                        <IonLabel>
                            Privacy Policy
                        </IonLabel>
                    </IonItem>
                    <IonItem button routerLink='/disclaimer'>
                        <IonLabel>
                            Disclaimer
                        </IonLabel>
                    </IonItem>

                </IonList>
                <IonActionSheet
                    trigger="open-lang-sheet"
                    header="Select Language"
                    buttons={[
                        {
                            text: 'English',
                            data: {
                                action: 'english',
                            },
                        },
                        {
                            text: 'Hindi',
                            data: {
                                action: 'hindi',
                            },
                        },
                    ]}
                    onDidDismiss={({ detail }) => selectLanguage(detail)}
                ></IonActionSheet>
                <IonButton expand='full' color="danger" onClick={logout}>
                    Logout
                </IonButton>
            </IonContent>
        </IonPage>
    )
}

export default Settings