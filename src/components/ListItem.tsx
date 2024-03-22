import { IonButton, IonIcon, IonItem, IonLabel, IonText, IonThumbnail } from '@ionic/react'
import React from 'react'
import { arrowForward as arrowIcon } from "ionicons/icons"

interface item {
    id: string//could be aid or sid
    title: string
    shortdescription: string
    path: string
}


const ListItem = ({ id, title, shortdescription, path }: item) => {
    return (
        <IonItem key={id} routerDirection='forward' routerLink={`/${path}/${id}`} button onClick={() => {
            console.log(`item ${id} clicked`)
        }}>

            <IonText style={{
                minWidth: "30px",
                textAign: 'center',
                background: '#ff9900',
                padding: '3px 10px',
                margin: '0px 10px 0px 0px',
                borderRadius: "10px",
                background: "linear-gradient(225deg, #ffa400, #e68a00)",
                boxShadow: "rgb(190, 190, 190) 2px 0px 6px,-17px -17px 34px #ffffff",
            }}>  {id}</IonText>

            <IonLabel>

                {title}


                <p style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: '-webkit-box',
                    WebkitLineClamp: '2',
                    WebkitBoxOrient: 'vertical'
                }}>{shortdescription}</p>
            </IonLabel>

            <IonButton fill='clear'><IonIcon slot="icon-only" icon={arrowIcon} color='secondary' /></IonButton>
        </IonItem >
    )
}

export default ListItem