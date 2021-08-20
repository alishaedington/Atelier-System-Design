const express = require('express');
const cors = require('cors');
const router = require('./routes');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/loaderio-cd147b6287330d187ac35365492131ce/', (req, res) => {
  console.log(req);
  res.send('loaderio-cd147b6287330d187ac35365492131ce');
});

app.use('/reviews', router);
app.listen(port, () => {
  console.log(`We be listening, port: ${port}`);
});
