const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/like', async (req, res) => {
  const { uid, region } = req.query;
  if (!uid || !region) return res.status(400).json({ error: 'UID or region missing' });

  try {
    const response = await fetch(`https://zexxyapi.vercel.app/like?uid=${uid}&server_name=${region}`);
    const text = await response.text();  // read as text first
    let data;
    try {
      data = JSON.parse(text);  // try parse JSON
    } catch (e) {
      console.error("API returned invalid JSON:", text);
      return res.status(500).json({ error: "API returned invalid JSON", raw: text });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));