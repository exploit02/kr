const initOptions = {
    // global event notification;
    error(error, e) {
        // A connection-related error;
        // Connections are reported back with the password hashed,
        // for safe errors logging, without exposing passwords.
        if (e.cn) {
            console.log('CN:', e.cn);
            console.log('EVENT:', error.message || error);
        }
    }
};

const pgp            = require('pg-promise')(initOptions);
const dbConfig       = require('../config/DBConfig').configuration;
const db             = pgp(dbConfig);

var DBInstance = {
    db : db,
    connect : ()=>{
                    db.connect()
                        .then(obj => {
                            obj.done(); // success, release the connection;
                            console.log('DB Connection Successfull');
                        })
                        .catch(error => {
                            console.log('ERROR:', error.message || error);
                        });
    }
};

module.exports = DBInstance;