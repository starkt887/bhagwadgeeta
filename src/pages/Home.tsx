import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import classes from './Home.module.css';
import Header from '../components/Header';
import { arrowForward as arrowIcon } from "ionicons/icons"
import ListItem from '../components/ListItem';
import { useGitaChapters } from '../services/gitaService';
import { IGitamodel } from '../models/geetamodel';
import { useEffect } from 'react';
import mahabharat from "../assets/mahabharat.jpg"


const Home: React.FC = () => {

  const { Chapters, ShlokOfDay } = useGitaChapters();



  return (
    <IonPage>
      <Header title='Bhagavad Gita' />
      <IonContent fullscreen class='ion-padding'>


        {/* Shlok of the day */}
        <IonCard>
          <img alt="Silhouette of mountains" src={mahabharat} />
          <IonCardHeader>
            <IonCardSubtitle>Chapter {ShlokOfDay?.chapter_number}</IonCardSubtitle>
            <IonCardTitle>Shlok {ShlokOfDay?.verse_number}</IonCardTitle>

          </IonCardHeader>
          <IonCardContent>{ShlokOfDay?.text_english}</IonCardContent>
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
          {Chapters && Chapters.map((data: IGitamodel) => {

            return <ListItem
              key={data.slug} id={String(data.chapter_number)}
              title={data.name_english}
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
