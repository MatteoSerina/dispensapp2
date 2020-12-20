const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    googleCx: process.env.GOOGLE_CX,
    googleApiKey: process.env.GOOGLE_API_KEY
}