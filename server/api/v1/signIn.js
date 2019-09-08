var loginModel = require('../../models/signIn');
var signIn = {

    login : (username, password)=>{

        return new Promise(function(resolve, reject){
            loginModel.create(username, password)
            .then(function(data){
                resolve(data);
            })
            .catch(function(error){
                reject(error.message);
            });
        });
    
    }

};

module.exports = signIn;