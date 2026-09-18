const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Project 2 API',
        description: 'CSE341 Project 2 API'
    },
    host: 'localhost:3001',
    schemes: ['http', 'https']
}

const outputFile = './swagger.json';
const endpointsFiles = ['./router/router.js'];


// swagger generator
swaggerAutogen(outputFile, endpointsFiles, doc);