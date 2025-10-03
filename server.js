// server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors()); // Allow requests from browser

app.get('/api/like', async (req, res) => {
  const { uid, region } = req.query;
  if (!uid || !region) return res.status(400).json({error: 'UID or region missing'});

  try {
    const response = await fetch(`https://zexxyapi.vercel.app/like?uid=${uid}&server_name=${region}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));