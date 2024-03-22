import { IonButton, IonContent, IonIcon, IonLabel, IonList, IonListHeader, IonPage } from '@ionic/react';

import Header from '../components/Header';
import { arrowForward as arrowIcon } from "ionicons/icons"
import ListItem from '../components/ListItem';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useGitaGetSingleChapter } from '../services/gitaService';
import { IShlokmodel } from '../models/geetamodel';

interface useParameters {
  aid: string
}

const SingleAadhyay: React.FC = () => {
  const { aid } = useParams<useParameters>();
  const { Chapter, Shloks, getSingleChapter, getAllChapters } = useGitaGetSingleChapter();

  useEffect(() => {
    console.log("Running singleaadyay effect")
    getSingleChapter(Number(aid))
    getAllChapters(Number(aid))
  }, [])


  return (
    <IonPage>
      <Header title={`Chapter ${aid}`} />
      <IonContent fullscreen class='ion-padding'>

        <IonLabel class='ion-text-center'>
          <h2>{Chapter?.name_english}</h2>
        </IonLabel>
        <p className='ion-text-center' style={{ fontSize: "12px" }}>

          {Chapter?.chapter_summary_english}

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



          {Shloks && Shloks.map((data: IShlokmodel) => {
            return <ListItem
              key={data.id}
              id={String(data.id)}
              title={`Shlok - ${data.id}`}
              shortdescription={data.text_english}
              path={`home/chapter/${aid}/shlok`}
            />
          })}

        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SingleAadhyay;
