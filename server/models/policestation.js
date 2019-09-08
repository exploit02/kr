const DBInstance = require('./DBConnect');
const db =  DBInstance.db;

var policestationModel = {

    create : (police_station_name, district_id, created_by, updated_by)=>{
            return new Promise((resolve, reject)=>{
                var queryString = `
                    INSERT
                        INTO
                            masters.police_station(
                                police_station_name,
                                district_id,
                                created_by,
                                updated_by
                                )
                            VALUES(
                                $1,
                                $2,
                                $3,
                                $4
                            ) 
                            RETURNING id       
                         `;
                var queryArgs = [
                    police_station_name, 
                    district_id, 
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

    read: (policestation_id)=>{
        return new Promise((resolve, reject)=>{
            var queryString = `
            SELECT
            id,
            police_station_name,
            district_id,
            CASE
                WHEN is_active THEN 'Active'
                ELSE 'Inactive'
            END AS status
        FROM
            masters.police_station
            `;
            if(policestation_id != undefined){
                queryString += `
                WHERE
                    id = $1
                `;
            }
            db.any(queryString, policestation_id)
            .then((data)=>{
                resolve(data)
            })
            .catch((error)=>{
                reject(error);
            });
        });

    },

    update: (policestation_id, police_station_name, district_id, updated_by)=>{

        return new Promise((resolve, reject)=>{
            var queryString = `
                    UPDATE
                         masters.police_station
                    SET
                        police_station_name = $1,
                        district_id = $2,
                        updated_by = $3,
                        update_time = now()
                    WHERE
                        id = $4
                    RETURNING true
            `;
            var queryArgs = [
                police_station_name,
                district_id,
                updated_by,
                policestation_id
            ];
            db.any(queryString, queryArgs)
            .then((data)=>{
                resolve(data)
            })
            .catch((error)=>{
                reject(error);
            });
        });

    },

    delete: (policestation_id, is_active, updated_by)=>{
        return new Promise((resolve, reject)=>{
            var queryString = `
            UPDATE
                masters.police_station
            SET
                is_active = $1,
                updated_by = $2,
                update_time = now()
            WHERE
                id = $3
            RETURNING id, police_station_name
            `;
            var queryArgs = [
                is_active,
                updated_by,
                policestation_id
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

module.exports = policestationModel;