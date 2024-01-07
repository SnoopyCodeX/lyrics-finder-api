import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import findLyrics from './functions/lyrics';
dotenv.config();

const app = express();
app.use(cors({
    origin: '*'
}));

app.get('/lyrics', async (req, res) => {
    const song = req.query.song as string;

    const result = await findLyrics(song);
    res.json(result);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server listening on port 3000');
});