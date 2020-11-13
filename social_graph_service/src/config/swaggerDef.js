const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  info: {
    title: 'moody auth_service',
    version: '1.0.0',
    description: 'REST API for the moody social_graph_service'
  },
  securityDefinitions: {
    authentication: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  }
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./src/routes/api/*.js', './src/models/*.js']
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;
