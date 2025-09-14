const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 7000;

app.use(cors());
const corsOptions = {
  origin: ["https://crm.megacrane.acculermedia.in", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(express.json());

app.post('/submit-to-google-sheet', async (req, res) => {
  try {
    const response = await axios.post(
      'https://script.google.com/macros/s/AKfycbw2LiZtDSysqweHZzVFLHdFeP6KLL6r79wqkZZtlvgFxV6yQeZUSiGhkn_daxpxfZhudQ/exec',
      req.body
    );
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send('Error submitting data to Google Sheets');
  }
});

app.get("/",(req, res) => {
    res.send("Hello World")
})


app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});