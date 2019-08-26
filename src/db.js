'use strict';

const result = require('dotenv').config();
const isProduction = process.env.NODE_ENV === 'production';

if (result.error) {
    throw result.error
}

const { Pool } = require('pg');

const pool = new Pool({
    connectionString: isProduction ? process.env.PRO_DB_URL 
    : process.env.DEV_DB_URL,
    ssl: isProduction,
});

module.exports = pool;
