import 'dotenv/config';

export default {
    port: process.env.port,
    privateKeyJWT: process.env.privateKeyJWT,
    MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL,
};



