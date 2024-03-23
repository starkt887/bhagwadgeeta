import { addDoc, collection, deleteDoc, doc, getCountFromServer, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useId, useState } from "react";
import { firestoreDb } from "./firebaseService";
import { IGitamodel, IShlokmodel, IUsableGitamodel, IUsableShlokmodel } from "../models/geetamodel";
import { useAuthContext } from "../util/auth";
import { useLanguageFormatter } from "../util/langFormatter";

export function useGitaChapters() {
    const { formatChaptersLang, formatShlokLang } = useLanguageFormatter()
    const [Chapters, setChapters] = useState<IUsableGitamodel[]>()
    const [ShlokOfDay, setShlokOfDay] = useState<IUsableShlokmodel>()
    async function getAllChapters(lang: string) {
        try {
            const queryRef = query(collection(firestoreDb, 'gita'), orderBy('chapter_number'))
            const querySnapshot = await getDocs(queryRef);
            let preFormattedChapters = querySnapshot.docs.map((doc) => doc.data() as IGitamodel);
            let chapters = formatChaptersLang(preFormattedChapters, lang)
            setChapters(chapters)
        } catch (error) {
            console.error(error);
        }
    }
    async function getShlokOfDay(lang: string) {
        try {
            const gitaRef = query(collection(firestoreDb, 'gita'), orderBy('chapter_number'))
            const gitaSnapshot = await getCountFromServer(gitaRef);
            let randomChap = Math.round(Math.random() * gitaSnapshot.data().count)
            // console.log(randomChap)
            const shlokRef = query(collection(firestoreDb, 'gita', `chapter${randomChap}`, 'shloks'))
            const shlokSnapshot = await getDocs(shlokRef);
            let randomShlok = Math.round(Math.random() * shlokSnapshot.docs.length)
            // console.log(shlokSnapshot.docs.at(randomShlok)?.data())
            let preFormattedShlokOfDay = shlokSnapshot.docs.at(randomShlok)?.data() as IShlokmodel
            let shlokOfDay = formatShlokLang(preFormattedShlokOfDay, lang)
            setShlokOfDay(shlokOfDay)
        } catch (error) {
            console.error(error);
        }
    }
    return { Chapters, ShlokOfDay, getAllChapters, getShlokOfDay }
}

export function useGitaGetSingleChapter() {
    const { formatChapterLang, formatShloksLang } = useLanguageFormatter()
    const [Chapter, setChapter] = useState<IUsableGitamodel>()
    const [Shloks, setShloks] = useState<IUsableShlokmodel[]>()

    async function getSingleChapter(chapter_number: number, lang: string) {
        try {
            const queryRef = query(collection(firestoreDb, 'gita'), where("chapter_number", "==", chapter_number))
            const querySnapshot = await getDocs(queryRef);
            let preFormattedChapter = querySnapshot.docs.map((doc) => doc.data() as IGitamodel);
            //console.log(chapter)
            let chapter = formatChapterLang(preFormattedChapter.at(0)!, lang)
            setChapter(chapter)
        } catch (error) {
            console.error(error);
        }
    }

    async function getAllChapterSholks(chapter_number: number, lang: string) {
        try {
            const queryRef = query(collection(firestoreDb, 'gita', `chapter${chapter_number}`, 'shloks'), orderBy('id'))
            const querySnapshot = await getDocs(queryRef);
            const preFormattedShloks = querySnapshot.docs.map((doc) => ({ ...doc.data(), cloud_id: doc.id } as IShlokmodel));
            //console.log(shloks)
            let shloks = formatShloksLang(preFormattedShloks, lang)
            setShloks(shloks)
        } catch (error) {
            console.error(error);
        }
    }
    return { Chapter, Shloks, getSingleChapter, getAllChapterSholks }
}

export function useGitaShloksSingle() {
    const { formatShloksLang } = useLanguageFormatter()
    const [Shloks, setShloks] = useState<IUsableShlokmodel[]>()
    const [currentShlok, setCurrentShlok] = useState<IUsableShlokmodel>()

    const [totalShloks, setTotalShloks] = useState<number>()
    const [currentId, setCurrentId] = useState<number>()

    async function setProgress(chapter_number: number, id: number, userid: string) {
        try {
            const q = query(collection(firestoreDb, 'users', userid, 'progress'),
                where('chapter_number', '==', chapter_number),
                where('id', '==', id))
            const count = await getCountFromServer(q);
            console.log(count.data().count);

            if (count.data().count === 0) {
                let doc = await addDoc(collection(firestoreDb, 'users', userid, 'progress'), {
                    chapter_number, id
                })
                console.log("Added to progress:", doc.id)
            }

        } catch (error) {
            console.error("Progress error:", error)
        }
    }
    async function getProgress(userid: string, chapter_number: number): Promise<number> {
        try {
            const q = query(collection(firestoreDb, 'users', userid, 'progress'), where("chapter_number", "==", chapter_number))
            let result = await getCountFromServer(q);
            // console.log(result.data().count)
            return result.data().count
        } catch (error) {
            console.error("Progress get error:", error)
            return 0
        }
    }

    async function getAllShloksSetCurrent(chapter_number: number, id: number, userid: string, lang: string)//as their are static number of sholks for lifetime so get all ane locally manage pagination
    {
        try {
            const queryRef = query(collection(firestoreDb, 'gita', `chapter${chapter_number}`, 'shloks'), orderBy('id'))
            const querySnapshot = await getDocs(queryRef);
            let preFormattedShloks = querySnapshot.docs.map((doc) => ({ ...doc.data(), cloud_id: doc.id } as IShlokmodel));
            let shloks = formatShloksLang(preFormattedShloks, lang)
            // console.log(shloks)
            setShloks(shloks)
            setTotalShloks(shloks.length)
            // console.log(chapter_number, id)

            // console.log(shloks.find((shlok) => shlok.id == id))

            let currentId = 0;//default
            //here we are setting current shlok based on its internal id, but calculating its current array index position for array navigation
            setCurrentShlok(shloks.find((shlok) => {
                if (shlok.id == id) {
                    return shlok as IUsableShlokmodel
                }
                currentId++
            }))
            setCurrentId(currentId)//array starts from 0 and shloks internal id starts from 1, we are managing by array index

            //update progress if loggedin
            if (userid) setProgress(chapter_number, id, userid)
        } catch (error) {
            console.error(error);
        }
    }
    function nextShlok() {
        try {

            let nextId = currentId! + 1
            // console.log("Current id:", currentId, "Next id:", nextId)
            if (nextId < totalShloks!) {
                setCurrentShlok(Shloks?.at(nextId))
                setCurrentId(nextId)
            }
            // else console.log("We are at end")
        } catch (error) {
            console.log("Next shlok error:", error)
        }
    }
    function prevShlok() {
        try {

            let prevId = currentId! - 1
            // console.log("Current id:", currentId, "Previous id:", prevId)
            if (prevId >= 0) {
                setCurrentShlok(Shloks?.at(prevId))
                setCurrentId(prevId)
            }
            // else console.log("We are at start")
        } catch (error) {
            console.log("Previous shlok error:", error)
        }
    }

    return { currentShlok, getAllShloksSetCurrent, nextShlok, prevShlok, getProgress }
}

export function useGitaSaves() {
    const { formatShloksLang } = useLanguageFormatter()
    const [SavedShloks, setSavedShloks] = useState<IUsableShlokmodel[]>([])

    async function isShlokInFavorites(userid: string, shlok: IUsableShlokmodel) {
        if (shlok && userid) {
            const q1 = query(collection(firestoreDb, 'users', userid, 'saved'),
                where("chapter_number", '==', shlok.chapter_number),
                where("id", '==', shlok.id))
            const result = await getDocs(q1)

            if (result.docs.length > 0) {
                // console.log("Result:", result.docs.length)
                return result.docs.at(0)?.id!;
            }
            return ''
        } return ''
    }

    async function saveShlok(userid: string, shlok: IUsableShlokmodel) {

        //check if the chapter number and shlok id is already there
        const favStat = await isShlokInFavorites(userid, shlok)
        // return
        if (!favStat) {
            //add
            console.log("Adding to favorites...")
            const docRef = await addDoc(collection(firestoreDb, 'users', userid, 'saved'), { ...shlok })
            // console.log("Saved Success:", docRef.id)

        }
        else {
            //remove
            // console.log(result.docs.at(0)?.id)
            console.log("Removing from favorites...")
            const savedShlokId = favStat;
            await deleteDoc(doc(firestoreDb, 'users', userid, 'saved', savedShlokId))
            // delete

        }

    }

    async function getSavedShloks(userid: string, lang: string) {
        const queryRef = query(collection(firestoreDb, 'users', userid, 'saved'))
        const queryDocs = (await getDocs(queryRef)).docs
        let preFormattedShloks = queryDocs.map((doc) => (doc.data() as IShlokmodel))
        // console.log(shloks)
        let shloks = formatShloksLang(preFormattedShloks, lang)
        setSavedShloks(shloks)
    }
    return { SavedShloks, isShlokInFavorites, saveShlok, getSavedShloks }
}