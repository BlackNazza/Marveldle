const express = require('express');
const axios = require('axios');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

const publicKey = '4845b8885eabf230dec8e2ec0782c263';
const privateKey = '89f43c0de22cfd2a2c1e38516f9677d56f84f16a';

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
