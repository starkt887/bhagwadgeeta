import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react'

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../services/firebaseService'
import back from '../assets/back.jpg'

// interface props {
//     isloggedin: boolean
//     nump: number
// }

const Login = () => {


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
    return (
        <IonPage>
            
            <IonContent fullscreen >

                <div className='ion-padding' style={{
                    background: `url(${back})`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: "100%",

                }}>
                    <div style={{ width: '100%' }}>

                        <IonButton shape='round' expand='full' onClick={loginGoogle}>Login Now</IonButton>
                    </div>
                </div>


            </IonContent>
        </IonPage>
    )
}

export default Login