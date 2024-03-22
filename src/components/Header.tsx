import { IonBackButton, IonButton, IonButtons, IonHeader, IonIcon,  IonTitle, IonToolbar } from '@ionic/react'

import { notifications as notificationIcon, share as shareIcon } from "ionicons/icons"
import { useLocation } from 'react-router'
// import Notifications from '../pages/Notifications'
import { Share } from '@capacitor/share'

interface Props {
    title: string
    goback?: false
}

const Header = ({ title, goback }: Props) => {


    const { pathname } = useLocation();



    const handleShareClick = async () => {
        await Share.share({
            title: 'Bhagavad Gita',
            text: `Welcome to our Bhagavad Gita App, where ancient wisdom meets modern technology, aiming to contribute to society by spreading the profound teachings of the Bhagavad Gita.
            At the core of our mission lies a deep-rooted belief in the transformative power of knowledge. The Bhagavad Gita, often referred to as the essence of the Vedas, serves as a timeless guide to navigating life's complexities with wisdom and grace. Through our app, we strive to make this invaluable treasure of wisdom accessible to everyone, irrespective of their background or beliefs.`,
            url: '',
            dialogTitle: 'Share with Friends & Family',
        });
    }
    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot='start' >
                    <IonBackButton color='dark' />
                </IonButtons>
                <IonButtons slot='end'>

                    {/* {!pathname.includes('notifications') &&
                        <IonButton routerLink='/notifications'>
                            <IonIcon icon={notificationIcon} />
                        </IonButton>} */}

                    <IonButton onClick={handleShareClick} >
                        <IonIcon color='secondary' icon={shareIcon} />
                    </IonButton>
                </IonButtons>
                <IonTitle color='primary'>{title}</IonTitle>
            </IonToolbar>
        </IonHeader>
    )
}

export default Header