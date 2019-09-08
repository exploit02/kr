var stateModel = require('../../../models/state');
var state = {

create : (state_name,country_id,state_code,created_by,updated_by)=>{
    return new Promise(function(resolve, reject){
        stateModel.create(state_name,country_id,state_code,created_by,updated_by)
        .then(function(data){
            resolve(data);
        })
        .catch(function(error){
            reject(error.message);
        });
    });
},
  

read: (stateid)=>{
    return new Promise((resolve, reject)=>{
        stateModel.read(stateid)
        .then(function(data){
            resolve(data);
        })
        .catch(function(data){
            reject(error.message);
        });
    });
},

 update: (stateid, state_name, country_id, state_code, updated_by)=>{
    return new Promise((resolve, reject)=>{
        stateModel.update(stateid, state_name, country_id, state_code, updated_by)
        .then(function(data){
            resolve(data);
        })
        .catch(function(error){
            reject(error);
        });
    });
 },

 delete: (stateid,is_active,updated_by)=>{
     
    return new Promise((resolve, reject)=>{
        stateModel.delete(stateid,is_active,updated_by)
        .then(function(data){
            resolve(data);
        })
        .catch(function(data){
            reject(error.message);
        });
    });

 }

};

module.exports = state;