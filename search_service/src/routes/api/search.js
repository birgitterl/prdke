const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const elastic = require('elasticsearch');
const elasticClient = elastic.Client({
  host: 'elasticsearch:9200'
});

// search profiles by query text
// Private route --> DONE
router.get('/profiles', auth, async (req, res) => {
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
    if (!response) {
      throw err;
    } else if (response.hits.hits.length) {
      const profiles = [];
      response.hits.hits.map((hit) => profiles.push(hit._source));
      return res.status(200).json({
        status: 200,
        profiles
      });
    } else {
      return res.status(404).json({
        status: 404,
        msg: 'No profiles found'
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});
module.exports = router;
