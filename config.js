require('dotenv').config();

const config = {
    database: {
        dbConnectionString: process.env.MONGODB_CONNECTION_STRING 
    },
    http: {
        port: 80
    },
    jwt: {
        secretKey: process.env.JWT_SECRET ,
        expiry: '30d'
    },
    pagination: {
        limit: 10,
        maxLimit: 1000
    },
};

module.exports = config;