import { QueryDocumentSnapshot } from "firebase/firestore";

export interface IShlokmodel {
    cloud_id: string;
    id: number;
    verse_number: number;
    chapter_number: number;
    slug: string;
    text_hindi: string;
    text_english: string;
    word_meanings: string;
    description_english: string;
    description_hindi: string;
}
export interface IGitamodel {
    id: string;
    name_hindi: string;
    slug: string;
    name_transliterated: string;
    name_translated: string;
    verses_count: number;
    chapter_number: number;
    name_english: string;
    chapter_summary_english: string;
    chapter_summary_hindi: string;
}


export interface IUsableShlokmodel {
    cloud_id: string,
    id: number;
    verse_number: number;
    chapter_number: number;
    slug: string;
    text: string;
    description: string;
}
export interface IUsableGitamodel {
    id: string;
    name: string;
    slug: string;
    verses_count: number;
    chapter_number: number;
    chapter_summary: string;
}