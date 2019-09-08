const DBInstance = require('./DBConnect');
const db = DBInstance.db;

var countryModel = {

    create: (country_name,created_by,updated_by)=>{

       return new Promise(function(resolve, reject){

            var queryString =`
            INSERT
            INTO
                masters.country(
                    country_name,
                    created_by,
                    updated_by
                )
                VALUES(
                    $1,
                    $2,
                    $3
                )
                RETURNING
                id
            `;

            var queryArgs = [
                country_name,
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

    read: (countryid)=> {

        return new Promise((resolve, reject)=>{

            var queryString = `
            SELECT
                id,
                country_name,
                CASE
                    WHEN is_active then
                        'Active'
                    ELSE
                        'Inactive'
                END AS status,
                is_active 
            FROM
               masters.country
            `;

            if(countryid !== undefined){
                queryString += `
                WHERE
                    id = $1
                `;
            }

            queryString += `
                ORDER BY country_name ASC

            `

            db.any(queryString, countryid)
               .then(function(data){
                   resolve(data);
               })
               .catch(function(error){
                console.log(error);
                reject(error);
               });
            
        });

    },

    update: (country_name,updated_by,countryid)=> {

        return new Promise((resolve, reject)=>{

            var queryString = `
            UPDATE
                masters.country
            SET
                country_name = $1,
                updated_by = $2,
                update_time = now()
            WHERE 
                 id = $3
            RETURNING 
                    TRUE
            `;

            var queryArgs = [
                country_name,
                updated_by,
                countryid 
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

    delete: (countryid,is_active,updated_by)=> {
        return new Promise((resolve,reject)=>{

            var queryString = `
            UPDATE
                masters.country
            SET
                is_active = NOT is_active,
                updated_by = $1,
                update_time = now()     
            WHERE
                 id = $2
            RETURNING id,country_name
            `;

        var queryArgs = [
            updated_by,
            countryid
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

module.exports = countryModel;