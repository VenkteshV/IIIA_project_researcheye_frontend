const express = require('express');
const router = express.Router();
const request = require('request-promise');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
router.post('/',jsonParser, function (req, res) {
  let requestObject = {};

  requestObject['headers'] = {
    'Content-Type': 'application/json',
    'Authorization': 'c2VydmljaW5nZ3JhcGhxbDpzZXJ2aWNpbmdncmFwaHFsQDEyMw==',
  };

  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');

  requestObject['url'] = 'http://localhost:5000/researcher';
  requestObject['body'] = JSON.stringify(req.body);
  console.log('requestObject',requestObject);
  request.post(requestObject)
        .then(
            (response) => res.json(JSON.parse(response))
    ).catch(
        (err) => {res.status(err.statusCode).json(err.message)
          console.log('error',err);
        }
    );
});

module.exports = router;
