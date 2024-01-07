import * as cheerio from 'cheerio';

type LyricsResult = {
    title: string;
    artist: string;
    lyrics: string;
    albumArt: string;
}

export default async function findLyrics(query: string) : Promise<LyricsResult> {
    const res = await fetch(`https://genius.com/api/search/multi?q=${encodeURIComponent(query)}`);
    const json = (await res.json()) as any;
    const hits = json.response.sections[0].hits;
    const hit = hits[0].result;
    const lyricsUrl = await fetch(hit.url);
    const lyricsText = await lyricsUrl.text();
    const $ = cheerio.load(lyricsText);
    const lyricsHtml = $('div[data-lyrics-container|=true]');

    let lyrics = "";
    if(lyricsHtml.text()) {
        lyricsHtml.each((_, elem) => {
            lyrics += cheerio.load(cheerio.load(elem).html().replace(/<br>/gi, "\n")).text()
            lyrics += '\n'
        })
    }

    const title = hit.title;
    const artist = hit.primary_artist ? hit.primary_artist.name : "Unknown Artist";
    const photo = hit.song_art_image_thumbnail_url;
    return { lyrics, title, artist, albumArt: photo };
}