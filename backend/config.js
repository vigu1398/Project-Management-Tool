exports.config = {
    mongo: {
        uri: process.env.MONGODB_URI
    },
    corsOptions : {
        origin: ["*"],
        methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Accept', 'Origin', 'Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Access-Control-Allow-Origin'],
        optionsSuccessStatus: 204
    }
}