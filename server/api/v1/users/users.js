var usersModel = require('../../../models/users');
var users = {
    create : (fname,usertypeid,createdby,updatedby,lname,uname,email_id,
        mobile_no,gender,doj,dob,supervisor_id,super_type_id,crunchy)=>{

        return new Promise((resolve, reject)=>{
            usersModel.create(fname,usertypeid,createdby,updatedby,lname,uname,email_id,
                mobile_no,gender,doj,dob,supervisor_id,super_type_id,crunchy)
                .then(function(data){
                    resolve(data);
                })
                .catch(function(error){
                    reject(error);
                });
        });
        
    },
    

    read : (userid)=>{
        return new Promise((resolve, reject)=>{
            usersModel.read(userid)
                .then(function (data) {
                    resolve (data);
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    },

    update : (fname,usertypeid,updatedby,lname,uname,email_id,
            mobile_no,gender,doj,dob,supervisor_id,super_type_id,userid,crunchy)=>{

        return new Promise((resolve, reject)=>{
            usersModel.update(fname,usertypeid,updatedby,lname,uname,email_id,
                mobile_no,gender,doj,dob,supervisor_id,super_type_id,userid,crunchy)
                .then(function(data){
                    resolve(data);
                })
                .catch(function(error){
                    reject(error);
                });
        });
        
    },

    delete : (userid)=>{

        return new Promise((resolve, reject)=>{
            usersModel.delete(userid)
                .then(function(data){
                    resolve(data);
                })
                .catch(function(error){
                    reject(error)
                });
        });

    }
};

module.exports = users;