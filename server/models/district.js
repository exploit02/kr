var DBInstance = require('./DBconnect');
var db =  DBInstance.db;

var districtModel = {

create: (district_name, district_code, state_id, created_by, updated_by )=>{
    return new Promise((resolve, reject)=>{

            var queryString = `
            INSERT
            INTO
                masters.district(
                district_name,
                district_code,
                state_id,
                created_by,
                updated_by)
            VALUES(
                $1,
                $2,
                $3,
                $4,
                $5
            )
            RETURNING id  
            `;
        var queryArgs = [
            district_name, 
            district_code, 
            state_id, 
            created_by, 
            updated_by
        ];
        db.any(queryString, queryArgs)
        .then(function(data){
            resolve(data)
        })
        .catch(function(data){
            reject(error);
        });

    });


},

read: (district_id)=>{
    return new Promise((resolve, reject)=>{
        var queryString = `
        SELECT
            id,
            district_name,
            district_code,
            state_id,
            CASE
            WHEN is_active THEN 'Active'
            ELSE 'Inactive'
            END AS status
       FROM
        masters.district
        `;

        if(district_id !== undefined){
             queryString += `
            WHERE 
                id = $1
            `;
        }
        db.any(queryString, district_id)
        .then((data)=>{
            resolve(data)
        })
        .catch((error)=>{
            reject(error);
        });
    });


},

update: (district_id, district_name, district_code, state_id, updated_by)=>{
    return new Promise((resolve, reject)=>{
        var queryString = `
        UPDATE
            masters.district
        SET
            district_name = $1,
            district_code =$2,
            state_id =$3,
            updated_by = $4,
            update_time = now()
        WHERE
            id = $5
        RETURNING true
        `;
        var queryArgs =[
            district_name, 
            district_code, 
            state_id, 
            updated_by,
            district_id
        ];
        db.any(queryString, queryArgs)
        .then(function(data){
            resolve(data)
        })
        .catch(function(error){
            reject(error);
        });

    });

},

delete: (district_id,is_active,updated_by)=>{
    return new Promise((resolve, reject)=>{
        var queryString = `
         UPDATE
            masters.district
         SET
            is_active = $1,
            updated_by = $2,
            update_time = now()
         WHERE
            id = $3
         RETURNING 
                id,
                district_name
        `;
        var queryArgs =[
            is_active,
            updated_by,
            district_id
        ];
        db.any(queryString, queryArgs)
        .then((data)=>{
            resolve(data)
        })
        .catch((error)=>{
            reject(error);
        });
    });

}
    
};

module.exports = districtModel;