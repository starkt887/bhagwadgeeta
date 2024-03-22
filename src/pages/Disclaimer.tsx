import { IonContent, IonLabel, IonPage, IonText } from '@ionic/react'
import React from 'react'
import Header from '../components/Header'

const Disclaimer = () => {
    return (
        <IonPage>
            <Header title='Disclaimer' />
            <IonContent class='ion-padding'>
                <IonText>
                    Disclaimer:

                    The Bhagavad Gita App and its associated content are intended for informational and educational purposes only. While we strive to provide accurate and reliable information, we cannot guarantee the completeness, accuracy, or timeliness of the content available on the app.

                    The teachings of the Bhagavad Gita are open to interpretation and may vary based on cultural, philosophical, and spiritual perspectives. Users are encouraged to exercise their own judgment and discretion when interpreting and applying the teachings of the Gita to their lives.

                    The Bhagavad Gita App does not provide medical, legal, or financial advice. Users seeking professional advice in these areas should consult qualified professionals.

                    The views and opinions expressed in user-generated content, including forum discussions and community interactions, are those of the individual users and do not necessarily reflect the views of the Bhagavad Gita App or its administrators.

                    By using the Bhagavad Gita App, users acknowledge and agree to the above disclaimer. We encourage users to engage with the app responsibly and respectfully, fostering a supportive and inclusive community dedicated to personal growth and spiritual exploration.
                </IonText>
            </IonContent>
        </IonPage>
    )
}

export default Disclaimer