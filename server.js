const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res) => {
  res.status(404).json({
    error: 'Page not found'
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('blog-tdd server running on port', process.env.PORT || 3000);
});
