const DBInstance = require('./DBConnect');
const db = DBInstance.db;
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var indexModel = {

    create: (username, password) => {

        return new Promise((resolve, reject) => {

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
            sm.crunchy,
            sm.munch_id,
            uu.uname,
            uu.email_id,
            uu.user_type_id
            FROM 
            splitsvilla.munch as sm
            left join 
            users.users as uu
            on 
            uu.id = sm.munch_id
            WHERE
            munch_id = (SELECT id FROM cc)
        `;
            var queryArgs = [
                username
            ];
            db.any(queryString, queryArgs)
                .then(function (data) {
                    const userData = data[0]
                    
                    if (userData == undefined) {
                        resolve({
                            response: {
                                Code: -2,
                                Success: false,
                                Message: "User Doesn't Exist. Provide a valid Username"
                            },
                            status: 400
                        });
                    } else {
                        const hash = userData.crunchy;
                        bcrypt.compare(password, hash, function (err, response) {
                            if (response == true) {
                                const tokenData = {
                                    uId: userData.munch_id,
                                    uName: userData.uname,
                                    eMail: userData.email_id,
                                    uType: userData.user_type_id
                                }
                                const token = jwt.sign(tokenData, 'testing_jwt', {expiresIn:'5h'});
                                resolve({
                                    response:{
                                        Code: 1,
                                        Success: true,
                                        Message: "Successfully Logged In"
                                    },
                                    status: 200,
                                    userData: tokenData,
                                    token: token  
                                });
                            } else {
                                resolve({
                                    response: {
                                        Code: -3,
                                        Success: false,
                                        Message: "Invalid Password" 
                                    },
                                    status: 401
                                });
                            }

                        });
                    }
                    //    resolve(data);
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error);
                });
        });
    }

};
module.exports = indexModel;