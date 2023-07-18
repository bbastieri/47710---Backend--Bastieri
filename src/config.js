import 'dotenv/config';

export default {
    port: process.env.port,
    privateKeyJWT: process.env.privateKeyJWT,
    mongoAtlasURL: process.env.mongoAtlasURL
};


