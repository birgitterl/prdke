const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const elastic = require('elasticsearch');
const elasticClient = elastic.Client({
  host: 'elasticsearch:9200'
});

router.get('/profiles', async (req, res) => {
  let querystring = `*${req.query.username}*`;
  try {
    const response = await elasticClient.search({
      index: 'profiles',
      body: {
        query: {
          wildcard: {
            username: {
              value: querystring
            }
          }
        }
      }
    });
    if (response.hits.hits.length > 0) {
      return res.status(200).json(response.hits.hits.map((hit) => hit._source));
    } else {
      return res.status(404).json({ errors: [{ msg: 'No profiles found.' }] });
    }
  } catch (err) {
    res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
});
module.exports = router;
