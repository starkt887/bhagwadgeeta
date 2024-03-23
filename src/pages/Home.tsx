import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonLoading, IonPage, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import classes from './Home.module.css';
import Header from '../components/Header';
import { arrowForward as arrowIcon } from "ionicons/icons"
import ListItem from '../components/ListItem';
import { useGitaChapters } from '../services/gitaService';
import { IGitamodel, IUsableGitamodel } from '../models/geetamodel';
import { useEffect, useState } from 'react';
import mahabharat from "../assets/mahabharat.jpg"
import { useAuthContext } from '../util/auth';


const Home: React.FC = () => {

  const { Chapters, ShlokOfDay, getAllChapters, getShlokOfDay } = useGitaChapters();

  const { language } = useAuthContext()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log('running effect')
    async function loadChaptersShlokOD() {
      setLoading(true)
      await getAllChapters(language!)
      await getShlokOfDay(language!)
      setLoading(false)
    }
    loadChaptersShlokOD()
  }, [language])


  return (
    <IonPage>
      <Header title='Bhagavad Gita' />
      <IonLoading isOpen={loading} />
      <IonContent fullscreen class='ion-padding'>
        {/* Shlok of the day */}
        <IonCard>
          <img alt="Silhouette of mountains" src={mahabharat} />
          <IonCardHeader>
            <IonCardSubtitle>Chapter {ShlokOfDay?.chapter_number}</IonCardSubtitle>
            <IonCardTitle>Shlok {ShlokOfDay?.verse_number}</IonCardTitle>

          </IonCardHeader>
          <IonCardContent>{ShlokOfDay?.text}</IonCardContent>
          <IonButton fill="solid" color='primary' routerLink={`home/chapter/${ShlokOfDay?.chapter_number}/shlok/${ShlokOfDay?.id}`}>View</IonButton>
        </IonCard>
        {/* Continue to last shlok if read before */}
        <IonButton expand="block" fill='clear' color='tertiary' >Continue with shlok "no"<IonIcon icon={arrowIcon} /></IonButton>

        {/* list of all the adhyays */}
        <IonList>
          <IonListHeader>
            <IonLabel>
              <h2>Aadhyay</h2>
            </IonLabel>
          </IonListHeader>
          {Chapters && Chapters.map((data: IUsableGitamodel) => {

            return <ListItem
              key={data.slug} id={String(data.chapter_number)}
              title={data.name}
              shortdescription={data.verses_count + " shloks"}
              path='home/chapter'
            />

          })}

        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
