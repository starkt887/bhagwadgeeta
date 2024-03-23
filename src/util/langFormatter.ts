import { IGitamodel, IShlokmodel, IUsableGitamodel, IUsableShlokmodel } from "../models/geetamodel";

export function useLanguageFormatter() {

    function formatChapterLang(chapter: IGitamodel, lang: string): IUsableGitamodel {
        let formattedChapter: IUsableGitamodel = {
            id: chapter.id,
            name: lang === 'english' ? chapter.name_english : chapter.name_hindi,
            slug: chapter.slug,
            verses_count: chapter.verses_count,
            chapter_number: chapter.chapter_number,
            chapter_summary: lang === 'english' ? chapter.chapter_summary_english : chapter.chapter_summary_hindi,
        }
        return formattedChapter;
    }
    function formatChaptersLang(chapters: IGitamodel[], lang: string): IUsableGitamodel[] {
        let formattedChapters: IUsableGitamodel[] = chapters.map((chapter) => formatChapterLang(chapter, lang))
        return formattedChapters
    }
    function formatShlokLang(shlok: IShlokmodel, lang: string): IUsableShlokmodel {
        let formattedShlok: IUsableShlokmodel = {
            cloud_id: shlok.cloud_id,
            id: shlok.id,
            verse_number: shlok.verse_number,
            chapter_number: shlok.chapter_number,
            slug: shlok.slug,
            text: lang === 'english' ? shlok.text_english : shlok.text_hindi,
            description: lang === 'english' ? shlok.text_english : shlok.text_hindi,
        }
        return formattedShlok
    }
    function formatShloksLang(shloks: IShlokmodel[], lang: string): IUsableShlokmodel[] {
        let formattedShloks: IUsableShlokmodel[] = shloks.map((shlok) => formatShlokLang(shlok, lang))
        return formattedShloks
    }

    return { formatChapterLang, formatChaptersLang, formatShlokLang, formatShloksLang }
}