import { DocumentData, addDoc, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { firestoreDb } from "./firebaseService";

export function useLangauge() {

    async function changeLanguage(lang: string, userid: string) {
        let id = await getLanguage(userid, 'id')
        console.log("Changing lang to:", lang)

        if (id === undefined) {
            await addDoc(collection(firestoreDb, 'users', userid, 'settings'), {
                key: 'language',
                value: lang
            })
        }
        else {
            await setDoc(doc(firestoreDb, 'users', userid, 'settings', id?.toString()!), {
                key: 'language',
                value: lang
            })
        }
    }

    async function getLanguage(userid: string, need: string) {
        const q = query(collection(firestoreDb, 'users', userid, 'settings'), where('key', '==', 'language'))
        const snapshot = await getDocs(q)
        // console.log(snapshot.docs.at(0)?.data())
        if (need === 'id')
            return snapshot.docs.at(0)?.id
        else
            return snapshot.docs.at(0)?.data().value
    }

    return { changeLanguage, getLanguage }
}