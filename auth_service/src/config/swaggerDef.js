const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  info: {
    title: "moody auth_service",
    version: "1.0.0",
    description: "REST API for the moody auth_service",
  },
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "x-auth-token",
      scheme: "bearer",
      bearerFormat: "JWT",
      in: "header",
    },
  },
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ["./src/routes/api/*.js", "./src/models/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;
