const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const portafolioPath = path.join(__dirname, 'data', 'portafolio.json');
if (!fs.existsSync(portafolioPath)) fs.writeFileSync(portafolioPath, '[]', 'utf-8');

app.get('/api/portafolio', (req, res) => {
  const data = fs.readFileSync(portafolioPath, 'utf-8');
  res.json(JSON.parse(data));
});

app.post('/api/portafolio', (req, res) => {
  const data = fs.readFileSync(portafolioPath, 'utf-8');
  const portafolio = JSON.parse(data);
  portafolio.push(req.body);
  fs.writeFileSync(portafolioPath, JSON.stringify(portafolio, null, 2));
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));