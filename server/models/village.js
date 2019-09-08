const DBInstance = require('./DBConnect');
const db =  DBInstance.db;

var villageModel = {

create:(village_name,post_ofc_id,created_by,updated_by)=>{
    return new Promise((resolve, reject)=>{
        var queryString = `
        INSERT
            INTO
                masters.village(
                    village_name,
                    post_ofc_id,
                    created_by,
                    updated_by
                    )
                VALUES (
                    $1,
                    $2,
                    $3,
                    $4
                )
                RETURNING id
        `;
        var queryArgs = [
            village_name, 
            post_ofc_id, 
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
read:(villageid)=>{
    return new Promise((resolve, reject)=>{
        var queryString = `
        SELECT
        id,
        village_name,
        post_ofc_id,
        CASE
            WHEN is_active THEN 'Active'
            ELSE 'Inactive'
        END AS status
    FROM
        masters.village
        `;
        if(villageid != undefined){
            queryString += `
            WHERE
                id = $1
            `;
        }
        db.any(queryString, villageid)
        .then((data)=>{
            resolve(data)
        })
        .catch((error)=>{
            reject(error);
        });
    });

},
update:(village_name,post_ofc_id,updated_by,villageid)=>{

    return new Promise ((resolve, reject)=>{
        var queryString = `
        UPDATE
            masters.village
        SET
           village_name = $1, 
           post_ofc_id = $2,
           updated_by = $3,
           update_time = now()
        WHERE
            id = $4
        RETURNING true
        `;
        var queryArgs = [
            village_name, 
            post_ofc_id, 
            updated_by,
            villageid
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
delete:(villageid,is_active,updated_by)=>{

    return new Promise((resolve, reject)=>{
        var queryString = `
        UPDATE
            masters.village
        SET
            is_active = $1,
            updated_by = $2,
            update_time = now()
        WHERE
            id = $3
        RETURNING 
                id,
                village_name
        `;
        var queryArgs = [
            is_active,
            updated_by,
            villageid
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

module.exports = villageModel;