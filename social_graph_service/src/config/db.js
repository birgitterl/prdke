const neo4j = require('neo4j-driver');

// credentials: neo4j/admin
const driver = neo4j.driver('bolt://graphDB:7687'); //TODO password
const session = driver.session;