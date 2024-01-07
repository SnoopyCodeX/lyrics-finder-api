## Simple Lyrics API

This is a simple lyrics API made using NodeJS, Express, Typescript, and Cheerio.

### Base URL

```
https://lyrics-finder-api.vercel.app
```

### Lyrics Endpoint

<kbd>Method: <samp>GET</samp></kbd>

```
/lyrics?song={song title}
```

### Response Format

```json
{
    "lyrics": "{lyrics of the song}",
    "title": "{title of the song}",
    "artist": "{artist name}",
    "albumArt": "{url of the album art of the song}"
}
```

You can find the main project [here](https://github.com/SnoopyCodeX/lyrics-finder).