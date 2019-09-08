const DBInstance = require('./DBConnect');
const db = DBInstance.db;

var stateModel = {

    create: (state_name,country_id,state_code,created_by,updated_by)=>{

       return new Promise(function(resolve, reject){

            var queryString =`
            INSERT
            INTO
                masters.state(
                state_name,
                country_id,
                state_code,
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
                state_name,
                country_id,
                state_code,
                created_by,
                updated_by 
            ];

            db.any(queryString, queryArgs)
               .then(function(data){
                   resolve(data);
               })
               .catch(function(error){
                console.log(error);
                reject(error);
               });
       });
   
   
    },

    read: (stateid,  pageNumber, entryInPage)=> {

        return new Promise((resolve, reject)=>{

            var queryString = `
            SELECT
                id,
                count (*) over() as count,
                state_name,
                country_id,
                state_code,
                CASE
                    WHEN is_active then
                        'Active'
                    ELSE
                        'Inactive'
                END AS status,
                is_active 
            FROM
               masters.state
            `;

            if(stateid !== undefined){
                queryString += `
                WHERE
                    id = $1
                `;
            }
            queryString += `
            ORDER BY state_name ASC
            `;
            if(entryInPage !== undefined){
                queryString += `
                    LIMIT $2 
                `;
            }
            if(pageNumber !== undefined){
                queryString += `
                   OFFSET $3 
                `;

                var offset = entryInPage * (pageNumber - 1)
            }

            db.any(queryString, [stateid, entryInPage, offset])
               .then(function(data){
                   resolve(data);
               })
               .catch(function(error){
                console.log(error);
                reject(error);
               });
            
        });

    },

    update: (stateid, state_name, country_id, state_code, updated_by)=> {

        return new Promise((resolve, reject)=>{

            var queryString = `
            UPDATE
                masters.state
            SET
                state_name = $1,
                country_id = $2,
                state_code = $3,
                updated_by = $4,
                update_time = now()
            WHERE 
                 id = $5
            RETURNING 
                    TRUE
            `;

            var queryArgs = [
                state_name,
                country_id,
                state_code,
                updated_by,
                stateid 
            ];
            db.any(queryString, queryArgs)
               .then(function(data){
                   resolve(data);
               })
               .catch(function(error){
                reject(error);
               });
        });
    },

    delete: (stateid, is_active, updated_by)=> {

        return new Promise((resolve, reject)=>{

            var queryString = `
            UPDATE
                masters.state
            SET
                is_active = NOT is_active,
                updated_by = $1,
                update_time = now()
            WHERE
                 id = $2
            RETURNING 
            id, 
            state_name
            `;

        var queryArgs = [
            updated_by,
            stateid
        ];
        db.any(queryString, queryArgs)
               .then(function(data){
                   resolve(data);
               })
               .catch(function(error){
                reject(error);
               });
        });
    }
};

module.exports = stateModel;