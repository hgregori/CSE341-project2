const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Project 2 API',
        description: 'CSE341 Project 2 API'
    },
    host: 'cse341-project2-k2jy.onrender.com',
    schemes: ['https']
}

const outputFile = './swagger.json';
const endpointsFiles = ['./router/router.js'];


// swagger generator
swaggerAutogen(outputFile, endpointsFiles, doc);