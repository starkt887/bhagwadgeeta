import { IonButton, IonContent, IonIcon, IonLabel, IonList, IonListHeader, IonLoading, IonPage } from '@ionic/react';

import Header from '../components/Header';
import { arrowForward as arrowIcon } from "ionicons/icons"
import ListItem from '../components/ListItem';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useGitaGetSingleChapter } from '../services/gitaService';
import { IShlokmodel, IUsableShlokmodel } from '../models/geetamodel';
import { useAuthContext } from '../util/auth';

interface useParameters {
  aid: string
}

const SingleAadhyay: React.FC = () => {
  const { language } = useAuthContext()
  const { aid } = useParams<useParameters>();
  const { Chapter, Shloks, getSingleChapter, getAllChapterSholks } = useGitaGetSingleChapter();

  const [loading, setLoading] = useState(false)


  useEffect(() => {
    console.log("Running singleaadyay effect")
    async function loadSChapAllShloks() {
      setLoading(true)
      await getSingleChapter(Number(aid), language!)
      await getAllChapterSholks(Number(aid), language!)
      setLoading(false)
    }
    loadSChapAllShloks()
  }, [])


  return (
    <IonPage>
      <Header title={`Chapter ${aid}`} />
      <IonLoading isOpen={loading} />
      <IonContent fullscreen class='ion-padding'>
        <IonLabel class='ion-text-center'>
          <h2>{Chapter?.name}</h2>
        </IonLabel>
        <p className='ion-text-center' style={{ fontSize: "12px" }}>

          {Chapter?.chapter_summary}

        </p>
        {/* Continue to last shlok if read before */}
        <IonButton expand="block" fill='clear' color='tertiary' >Continue with shlok "no"<IonIcon icon={arrowIcon} /></IonButton>

        {/* list of all the shloks */}
        <IonList>
          <IonListHeader>
            <IonLabel>
              <h2>Shloks</h2>
            </IonLabel>
          </IonListHeader>



          {Shloks && Shloks.map((data: IUsableShlokmodel) => {
            return <ListItem
              key={data.id}
              id={String(data.id)}
              title={`Shlok - ${data.id}`}
              shortdescription={data.text}
              path={`home/chapter/${aid}/shlok`}
            />
          })}

        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SingleAadhyay;
