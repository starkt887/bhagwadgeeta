import {
    IonAlert, IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList,
    IonListHeader, IonPage, IonTitle, IonToolbar
} from '@ionic/react'
import React, { useState } from 'react'
import Header from '../components/Header'
import { notifcationdata } from '../models/data'
import { notificationModel } from '../models/notificationmodel'
import { eye as viewIcon } from "ionicons/icons"


const Notifications = () => {

    const [isOpen, setisOpen] = useState(false)
    const [selectedNotification, setselectedNotification] = useState<notificationModel>()


    const showAlert = (data: notificationModel) => {
        setisOpen(true)
        setselectedNotification({ id: data.id, title: data.title, msg: data.msg })
        console.log(data)
    }

    return (
        <IonPage>
            <Header title='Notifications' />
            <IonContent fullscreen className='ion-padding'>
                {/* list of all the shloks */}
                <IonList>

                    {/* find the way to store data locally without the need for login */}
                    {notifcationdata.map((data: notificationModel) => {
                        return <IonItem key={data.id} button onClick={() => showAlert(data)}>
                            <IonLabel>
                                <h3>{data.title}</h3>
                                <p className='ion-text-nowrap' style={{
                                    width: "150px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis"
                                }}>{data.msg}</p>
                            </IonLabel>
                            <IonButton fill='clear' onClick={() => showAlert(data)}>
                                <IonIcon icon={viewIcon} />
                            </IonButton>

                        </IonItem>
                    })}

                </IonList>
                <IonAlert
                    isOpen={isOpen}
                    header={selectedNotification?.title}
                    // subHeader="A Sub Header Is Optional"
                    message={selectedNotification?.msg}
                    buttons={[
                        {
                            text: 'Ok',
                            role: 'ok',
                            handler: () => {
                                console.log("You pressed ok")
                            }
                        }]}
                    onDidDismiss={() => setisOpen(false)}
                ></IonAlert>
            </IonContent>
        </IonPage>
    )
}

export default Notifications