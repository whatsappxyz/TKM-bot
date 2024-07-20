const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT1BGK3h6ZlJONUg1VHN4WGROYlQyZFVZbVYvRkd0VEFvUUVUQzVxNDdFUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNzNHOGRnclUyZmR1UjJlLzdvaXhuT0s0TElhMG5rR3F0OTlWeTVObnhWST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzS0JHZXFsWmRsNVJBRHlQNHRCMHQxMUlWTjZSMnJ5TUZzZitPV1F5RVZZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrT2lYc0VyOHdlQ0E3VEdLeGF6cjVuRVhzenM4S0xrb3kvRnFEbkxZZWlvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndGdzhGSW92c0ZXNlRia2RmMEVQOEZsaHdWcXU5WW95RlZKNkhwM0NaRTA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJIK1FEZVZ1RXM4bC9hdFZndHJyWVppdDdUdTNvNG5SWlVDYVptTURUMGs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib05GZzIyakFCb0xpcWJhaVR2elFUWEVRYzIwNWF5RUxhN2dZZVhyeHBHdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSkxnYy9mRkRsQXBEcWZpSnhXNmVNLzNuaWlMTW1ERldYUXYyN2NEeS8yND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjQ1ZzQwQ2pmRVBlL0lRa3NjR3lkTU1DZXhDbzBBeS9FVFNSQVBXTnl0MTJHaWhCZ1hIa284S3JlWmd0QUdMY0tWMkJhcVJyZmJuY1gzS3l1cmlvS0RnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ4LCJhZHZTZWNyZXRLZXkiOiIzYmZ2VmlEeGY0ZldwbXozd3kwYmNNa3FiaHNndlBuWEw4TTJpQnpHZkFFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkxNzA2NzU3NTQ3MkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzNzE3QzE0NEQwMDg0RkVFQTRGNjEwNUJGODFFQTFBNCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIxNTA4MzEyfSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MTcwNjc1NzU0NzJAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRUYzMDQ5MUNDRkI5Mzk5MDNBMTE4NTM1MkRBRkNERUQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyMTUwODMxM31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiVFhsZ0dlT2ZRek9DMEhjcFlPc21DUSIsInBob25lSWQiOiI0Y2FhNWY3YS05N2E2LTRmYjEtOGZjMS0yZjNiMTljOWEwYzYiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOGNUSzNBNnFhYXQreGdpd1JwT0h5eUZMMzYwPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJ4cUZKdGlXWnFKWEZKa1BKenBOTGhEbFl4bz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJSU0NBVzJGQiIsIm1lIjp7ImlkIjoiOTE3MDY3NTc1NDcyOjI1QHMud2hhdHNhcHAubmV0IiwibmFtZSI6Ik1yIFNIVUJIQU0ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1Avcm9mOEVFTWpEOExRR0dBVWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkdvN25kUVN5Vk9ka01EQ1J6Um1oRHZHWE9xV0xvakNXZEgwUURORnJhZ1U9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlUvNmFWK0lTUnFNMWV6dmlvRWIzRlBUaEFyL0ZGak5ReDdCajdiVUlISHJSWHdWTzE2d1QreU5sK1k3YVBseDhYOEhVQzZJN3ozSUZvdDFRZ2FmbkJnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJMcTczdHFFdHR0M0pFR3A3ZmhpTVpnRkJGTllVaWxUQS9aRHFNVVY4Z1VuRDFvdzBnb0J3ZkhuOHhUNWg1QlZYcXlWUlVjZXRqeGtUSmVLSlVCSEFBUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkxNzA2NzU3NTQ3MjoyNUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJScU81M1VFc2xUblpEQXdrYzBab1E3eGx6cWxpNkl3bG5SOUVBelJhMm9GIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxNTA4MzA5LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUh5NCJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Shubham",
    NUMERO_OWNER : process.env.OWNER_NUM || "917067575472",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'Msr_shubham.k',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
