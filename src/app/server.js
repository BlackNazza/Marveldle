const express = require('express');
const axios = require('axios');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

const publicKey = '6590fe533225d3bbcb2ae8685cf1695b';
const privateKey = 'a927529eb60f85f6542f4ca8b9851d98d764ed49';

app.get('/api/marvel', async (req, res) => {
  const ts = Date.now().toString();
  const hash = crypto.createHash('md5').update(ts + privateKey + publicKey).digest('hex');
  const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Marvel API' });
  }
});

app.listen(PORT, () => console.log(`Server läuft auf http://localhost:${PORT}`));
