const express = require('express');
const app = express();
const port = 5000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send();
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
});