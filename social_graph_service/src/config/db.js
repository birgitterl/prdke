const neo4j = require('neo4j-driver');

const driver = neo4j.driver('bolt://neo4j:7687', neo4j.auth.basic('neo4j', '12345')); //TODO password
const session = driver.session;