require('dotenv').config({
    path: '../.env'
});

const { API_PUBLIC_TOK, API_SECRET_TOK } = require('../config/index.config');
const OpenTok = require('opentok');
opentok = new OpenTok(API_PUBLIC_TOK, API_SECRET_TOK); // init open tok

module.exports = {
    opentok,
    API_PUBLIC_TOK
}