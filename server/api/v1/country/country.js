var countryModel = require('../../../models/country');
var country = {

create : (country_name,created_by,updated_by)=>{
    return new Promise(function(resolve, reject){
        countryModel.create(country_name,created_by,updated_by)
        .then(function(data){
            resolve(data);
        })
        .catch(function(error){
            reject(error.message);
        });
    });
},


read: (countryid)=>{
    return new Promise(function(resolve, reject){
        countryModel.read(countryid)
        .then(function(data){
            resolve(data);
        })
        .catch(function(error){
            reject(error.message);
        });
    });
},

update: (country_name,updated_by,countryid)=>{

    return new Promise(function(resolve, reject){
        countryModel.update(country_name,updated_by,countryid)
        .then(function(data){
            resolve(data);
        })
        .catch(function(error){
            reject(error.message);
        });
    });

},


delete: (countryid,is_active,updated_by)=>{

    return new Promise(function(resolve, reject){
        countryModel.delete(countryid,is_active,updated_by)
        .then(function(data){
            resolve(data);
        })
        .catch(function(error){
            reject(error.message);
        });
    });   
}


};

module.exports = country;