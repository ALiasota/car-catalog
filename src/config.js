/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const dotenv = require('dotenv')

let envFilePath = ''
let isLocal = false
if (process.argv.some(a => a === 'dev')) envFilePath = '.env.development'
if (process.argv.some(a => a === 'prod')) envFilePath = '.env.production'
if (process.argv.some(a => a === 'stage')) envFilePath = '.env.stage'
if (process.argv.some(a => a === 'local')) isLocal = true

dotenv.config({ path: envFilePath })

const config = {
    DEV: {
        SENTRY_ENV: 'development',
        PORT: 5001,
        IS_LOCAL: isLocal,
        APP_DOMAIN: 'http://localhost:5001',
    },
    STAGE: {
        SENTRY_ENV: 'stage',
        PORT: 5002,
        IS_LOCAL: isLocal,
        APP_DOMAIN: 'http://localhost:5002',
    },
    PROD: {
        SENTRY_ENV: 'production',
        PORT: 5001,
        IS_LOCAL: isLocal,
        APP_DOMAIN: 'http://localhost:5001',
    },
}

const secretesNamesList = ['DB']

const secretes = {}
secretesNamesList.forEach(s => (secretes[s] = process.env[s]))

const env = process.env?.ENV

module.exports = {
    ...config[env],
    ...secretes,
}

module.exports.secretesNamesList = secretesNamesList
