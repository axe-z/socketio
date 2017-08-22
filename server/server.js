const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const path = require('path');
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public');

const app = express();

app.use(express.static(publicPath)); //public, index.html

// app.use('/', (req,res) => {
//   res.send('<h1>bravo</h1>')
// })

app.use(bodyParser.json());


 


app.listen(port, () => {
  console.log(`ca roule sur ${port}`);
});
