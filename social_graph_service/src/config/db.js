var neo4j = require('neo4j-driver');

var driver = neo4j.driver('bolt://graphDB:7687', neo4j.auth.basic('neo4j', 'admin'));

exports.driver = driver;
