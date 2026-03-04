const speakeasy = require('speakeasy');

const generatesecret = () => {
    return speakeasy.generateSecret({ length: 20 });
}

const verifytoken = (secret, token) => {
    return speakeasy.totp.verify({
        secret: secret.base32,
        encoding: 'base32',
        token: token,
        window: 1,
    });
}
module.exports = { generatesecret, verifytoken };