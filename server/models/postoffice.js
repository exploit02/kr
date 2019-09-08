const DBInstance = require('./DBConnect');
const db =  DBInstance.db;
var postofficeModel ={

    create : (post_ofc_name, pin_number, policestation_id, created_by, updated_by)=>{
        return new Promise((resolve, reject)=>{
            var queryString = `
            INSERT
                INTO
                    masters.post_office(
                        post_ofc_name,
                        pin_number,
                        policestation_id,
                        created_by,
                        updated_by
                        )
                    VALUES (
                        $1,
                        $2,
                        $3,
                        $4,
                        $5
                    )
                    RETURNING id
            `;
            var queryArgs = [
                post_ofc_name, 
                pin_number, 
                policestation_id, 
                created_by, 
                updated_by
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

    read: (postofcid)=>{
        return new Promise((resolve, reject)=>{
            var queryString = `
            SELECT
            id,
            post_ofc_name,
            pin_number,
            policestation_id,
            CASE
                WHEN is_active THEN 'Active'
                ELSE 'Inactive'
            END AS status
        FROM
            masters.post_office
            `;
            if(postofcid != undefined){
                queryString += `
                WHERE
	                id = $1
                `;
            }
            db.any(queryString, postofcid)
            .then((data)=>{
                resolve(data)
            })
            .catch((error)=>{
                reject(error);
            });
        });
    },

    update: (post_ofc_name, pin_number, policestation_id, updated_by,postofcid)=>{
        
        return new Promise ((resolve, reject)=>{
            var queryString = `
            UPDATE
                masters.post_office
            SET
                post_ofc_name = $1, 
                pin_number = $2,
                policestation_id = $3,
                updated_by = $4,
                update_time = now()
            WHERE
                id = $5
            RETURNING true
            `;
            var queryArgs = [
                post_ofc_name, 
                pin_number, 
                policestation_id, 
                updated_by,
                postofcid
            ];
            db.any(queryString, queryArgs)
            .then(function(data){
                resolve(data)
            })
            .catch(function(data){
                reject(data);
            });
        });
    },

    delete : (postofcid,is_active,updated_by)=>{
        return new Promise((resolve, reject)=>{
            var queryString = `
            UPDATE
	            masters.post_office
            SET
                is_active = $1,
                updated_by = $2,
                update_time = now()
            WHERE
                id = $3
            RETURNING 
                    id,
                    post_ofc_name
            `;
            var queryArgs = [
                is_active,
                updated_by,
                postofcid
            ];
            db.any(queryString, queryArgs)
            .then(function(data){
                resolve(data)
            })
            .catch(function(data){
                reject(data);
            });
        });
    }
}

module.exports = postofficeModel;