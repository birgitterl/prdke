const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const elastic = require('elasticsearch');
const elasticClient = elastic.Client({
  host: 'elasticsearch:9200'
});

router.post('/profiles', (req, res) => {
  elasticClient
    .index({
      index: 'profiles',
      body: req.body
    })
    .then((response) => {
      return res.status(201).json({ msg: 'Profile indexed' });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .json({ errors: [{ msg: 'Internal Server Error' }] });
    });
});

router.post('/messages', (req, res) => {
  elasticClient
    .index({
      index: 'messages',
      body: req.body
    })
    .then((response) => {
      return res.status(201).json({ msg: 'Message indexed' });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .json({ errors: [{ msg: 'Internal Server Error' }] });
    });
});

router.get('/profiles', (req, res) => {
  let query = {
    index: 'profiles'
  };
  if (req.query.profile) query.q = `*${req.query.profile}*`;
  elasticClient
    .search(query)
    .then((response) => {
      return res.status(200).json({ profiles: response.hits.hits });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .json({ errors: [{ msg: 'Internal Server Error' }] });
    });
});

router.get('/messages', (req, res) => {
  let query = {
    index: 'messages'
  };
  if (req.query.message) query.q = `*${req.query.message}*`;
  elasticClient
    .search(query)
    .then((response) => {
      return res.status(200).json({ message: response.hits.hits });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .json({ errors: [{ msg: 'Internal Server Error' }] });
    });
});

module.exports = router;
