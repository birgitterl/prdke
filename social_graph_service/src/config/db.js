var neo4j = require('neo4j-driver');

const DB_URI = 'bolt://graphDB:7687';
const username = 'neo4j';
const pwd = 'admin';

const driver = neo4j.driver(DB_URI, neo4j.auth.basic(username, pwd));
module.exports = driver;
