const DBInstance = require('./DBConnect');
const db = DBInstance.db;
var bcrypt = require('bcrypt');

var indexModel = {

create: (username, password)=>{

    return new Promise ((resolve, reject)=>{

        var queryString = `
        WITH cc AS (
            SELECT
            id
            FROM 
            users.users
            WHERE 
            uname = $1
            )
            SELECT 
            crunchy
            FROM 
            splitsvilla.munch
            WHERE
            munch_id = (SELECT id FROM cc)
        `;
        var queryArgs = [
            username
        ];
        db.any(queryString, queryArgs)
               .then(function(data){
                   if(data[0] == undefined){
                       resolve("User Not Found.");
                   }else{
                       const hash = data[0].crunchy;
                    bcrypt.compare(password, hash, function(err, response){
                        if(response == true){
                            resolve("Matched Successfully");
                        }else{
                            reject("error");
                        }

                    });
                }
                //    resolve(data);
               })
               .catch(function(error){
                console.log(error);
                reject(error);
            });
    });
}

};
module.exports = indexModel; 