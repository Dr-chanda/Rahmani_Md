const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0NrWWJpVXE3NFphZ0swVFYxS2k0Y0xOMEpRU0VGa3c2Mll1ZHkyMlBubz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0U2YzBkSVhXMjZnamU2WWtMRkMrVE5ZTEd2SzYwZkQzd3U2UlRwQ0xVbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnQkp1eDZVbVpVOC9xVXF4V21CVXZuT1AwSHNiN25PYWtFdjUrSmhBZEhrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMNlJScmJkeFQzNHhTdjlGNVBYeWxEV2xEUGRJd1pXblQxblh5RmRyUW5VPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhCYWcxM3Y5STE1emVqcnBKSlJ4YjRxSUlQNTZqRFdYL0wxREdLOXd0RmM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imw4Q2psYnVXS3JPczJlOEhaTjRsME1lTXVYZi8zY1Fvb0VrQ3pqeEJjaGs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0dWczNjTzhjQnJvTFUxUWNVSEQ0QU84c21wdWZNWXhDblplbEkyUjAwZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTmZuZ1BmVlBIT2h4akZqQlJMWmM1TXpnbnJPeVJNbU5JT2ZYdG9LWWlCRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRLVld3N0pqblhvNFh2VHY2MGdoeTVoZXJiSXoxWDd4ZUMxRHlYYzRobXZudnh4ZDVqaGpLTGgwK0tVbTZNZ3BUR3hwcm5oOFlsZEpvcVJHMlFMQkNnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MSwiYWR2U2VjcmV0S2V5IjoiUzBHRW9BeHdLS0lhcllEYU03N2VvM0dlQkZOVDdZRGxLZ0l2SW1oNjZLZz0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOltdLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoib0NHY1RJQjVRYzY5X19iVVZHYk9oUSIsInBob25lSWQiOiI1NDdjYjdiYS01Yzk1LTRjMGItYWUxYS05YjBiNTRiMmEyMTEiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY3BhRlJuOCtOUW5ud3ZERmtFN3ZxNmZJcDNBPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InhNV3UwUGFxcTBpYkd0Z2ZZNDVCNDJQWjhlaz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJWUlg0QVg2QyIsIm1lIjp7ImlkIjoiMjc3ODE2NzMwMjI6MTdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiw4pBQiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT2ZCdko0REVLVGtyYjRHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiSGI2ZHhzMXZIZDJjRGdwSkQ2WlV4UWQxK2NmRU5qR3RVcjY1SU15RnFYST0iLCJhY2NvdW50U2lnbmF0dXJlIjoiRHVleFROVmZqaFBFZzlCTEtSYUxrczRJc1ppN3dMTmdzLzlIY3VMSVkzWnM1RDQvUjJubTNYMEFmZ1ZXdkxtWWV2QjFpdER0Y0VXVWVpMEpnemUzQnc9PSIsImRldmljZVNpZ25hdHVyZSI6IldQbUwyZkdvRlFrc0NjMTZlL3BRSXE5QW04YkI0KzRmbVQrUnVLUk5nVUN3S1QxWnplZ2g1QkQ2ZENLTFhpS2ZHME5pZjBVNHQxUkkzL2gyRUs0bkNnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjc3ODE2NzMwMjI6MTdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUjIrbmNiTmJ4M2RuQTRLU1ErbVZNVUhkZm5IeERZeHJWSyt1U0RNaGFseSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0MTM4NjI4OX0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Drchanda",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "27781673022",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Drchanda',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
                  ANTIDELETE2 : process.env.ANTIDELETE2 || "yes",
                  ANTIDELETE1 : process.env.ANTIDELETE1 || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    CRISS_VMD : process.env.AUTO_LIKE_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
