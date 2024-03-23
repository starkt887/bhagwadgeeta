import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react'

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../services/firebaseService'
import back from '../assets/back.jpg'
import bhagavadgita from '../assets/bhagavadgita.png'
import { useParams } from 'react-router'

// interface props {
//     isloggedin: boolean
//     nump: number
// }
type Params = {
    route: string
}

const Login = () => {

    const { route } = useParams<Params>();


    const loginGoogle = () => {
        // login!()
        signInWithPopup(auth, provider).
            then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                console.log(credential, token, user)
                console.log(user.email)
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                console.log(errorCode, errorMessage, email, credential)
            })
    }

    const processPreRoute = () => {
        let routeP = String(route).replaceAll('-', '/')
        console.log(routeP)
        return routeP
    }
    return (
        <IonPage>

            <IonContent fullscreen >

                <div className='ion-padding' style={{
                    background: `url(${back})`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'end',
                    height: "100%",


                }}>
                    <div style={{ width: '100%' }}>
                        <IonImg src={bhagavadgita} />
                        <div style={{
                            padding: '0 25px 0 25px'
                        }}>
                            <IonButton color='light' shape='round' expand='full' onClick={loginGoogle}>Login Now</IonButton>
                            <IonButton fill='outline' color='secondary' shape='round' expand='full'
                                routerLink={`/${route ? processPreRoute() : 'home'}`} routerDirection='none'>Continue as Guest</IonButton>
                        </div>
                        <div className='ion-padding' style={{

                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'end',
                            height: "100%",
                            paddingTop: '125px'

                        }}>
                            <IonLabel>
                                <p style={{ color: 'black', fontSize: '10px' }}>
                                    © Copyrights 2024. All Rights Reserved
                                </p>
                            </IonLabel>
                        </div>

                    </div>
                </div>


            </IonContent>
        </IonPage>
    )
}

export default Login