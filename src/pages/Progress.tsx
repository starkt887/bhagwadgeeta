import { IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonPage, IonProgressBar, IonRow, IonSpinner, IonText, IonTitle, IonToolbar } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useGitaChapters, useGitaShloksSingle } from '../services/gitaService';
import { IGitamodel } from '../models/geetamodel';
import { useAuthContext } from '../util/auth';

type tempChapterProgress = {
  chapter_number: number,
  name_english: string,
  progress: number,
  verses_count: number
}

const Progress = () => {

  const { isloggedin, userid } = useAuthContext()
  const { Chapters } = useGitaChapters();
  const { getProgress } = useGitaShloksSingle();
  const [chaptersWProgress, setChaptersWProgress] = useState<tempChapterProgress[]>([])
  const [globalProgress, setGlobalProgress] = useState<number>(0)

  useEffect(() => {
    chapterProgress()

  }, [Chapters])


  const chapterProgress = async () => {
    // console.log("Getting progress..")
    let tempChapwProgress: tempChapterProgress[] = []
    let totalShloks = 0;
    let completedShloks = 0
   
    if (Chapters) {
      await Promise.all(Chapters.map(async (chapter) => {
        let count = await getProgress(userid!, chapter.chapter_number!)
        totalShloks += chapter.verses_count
        completedShloks += count;
        tempChapwProgress.push({
          chapter_number: chapter.chapter_number,
          name_english: chapter.name_english,
          progress: count,
          verses_count: chapter.verses_count
        })
      }))
    }
    // console.log(tempChapwProgress)
    setChaptersWProgress(tempChapwProgress)
    // console.log((completedShloks / totalShloks * 100))
    let totalProgress = (completedShloks / totalShloks * 100)
    if (!isNaN(totalProgress))
      setGlobalProgress(totalProgress)
  }

  return (
    <IonPage>
      <Header title='Progress' />
      <IonContent fullscreen className='ion-padding'>
        <div style={{ display: "flex", justifyContent: "center", width: "100%", height: 200 }}>
          <CircularProgressbar value={globalProgress} text={`${Math.round(globalProgress)}%`} strokeWidth={10} styles={buildStyles({
            // Rotation of path and trail, in number of turns (0-1)
            rotation: 0.25,

            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: 'round',

            // Text size
            textSize: '16px',

            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 5,

            // Can specify path transition in more detail, or remove it entirely
            // pathTransition: 'none',

            // Colors
            pathColor: `#512eff`,
            textColor: '#512eff',
            trailColor: '#d6d6d6',
            backgroundColor: '#3e98c7',
          })} />
        </div>

        {/* Activity */}

        <IonLabel class='ion-text-center'>
          <h3>Activity</h3>
        </IonLabel>
        <IonList>
          {chaptersWProgress && chaptersWProgress.map((chapter: tempChapterProgress) => {
            return <IonItem key={chapter.chapter_number}>
              <IonLabel>
                <IonGrid>
                  <IonRow class='ion-justify-content-between' >
                    <IonCol class='ion-text-start'>
                      <IonText>
                        <h3>{chapter.name_english}</h3>
                      </IonText>
                    </IonCol>
                    <IonCol class='ion-text-end'>
                      <IonText color='secondary'>
                        <h3>{chapter.progress} / {chapter.verses_count}</h3>
                      </IonText>
                    </IonCol>
                  </IonRow>
                </IonGrid>
                <IonProgressBar value={chapter.progress / chapter.verses_count} class='ion-margin-top' />
              </IonLabel>
            </IonItem>
          })}

        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default Progress