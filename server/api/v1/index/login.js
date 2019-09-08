var indexModel = require('../../../models/signIn');
var login = {

create : (username, password)=>{

    return new Promise(function(resolve, reject){
        indexModel.create(username, password)
        .then(function(data){
            resolve(data);
        })
        .catch(function(error){
            reject(error.message);
        });
    });

}


};
module.exports = login;