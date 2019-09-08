const DBInstance = require('./DBConnect');
const db = DBInstance.db;
// var connection = DB.connect();

var usersModel = {

    create : (fname,usertypeid,createdby,updatedby,lname,uname,email_id,
        mobile_no,gender,doj,dob,supervisor_id,super_type_id,crunchy)=>{

            return new Promise((resolve, reject)=>{

                var queryString = `
                INSERT
                    INTO
                        users.users(
                        fname,
                        user_type_id,
                        created_by,
                        updated_by,
                        lname,
                        uname,
                        email_id,
                        mobile_no,
                        gender,
                        doj,
                        dob,
                        supervisor_id,
                        super_type_id
                        )
                        VALUES(
                        $1,
                        $2,
                        $3,
                        $4,
                        $5,
                        $6,
                        $7,
                        $8,
                        $9,
                        $10,
                        $11,
                        $12,
                        $13
                        )
                        RETURNING id
                `;
            var queryArgs = [
                fname,
                usertypeid,
                createdby,
                updatedby,
                lname,
                uname,
                email_id,
                 mobile_no,
                 gender,
                 doj,
                 dob,
                 supervisor_id,
                 super_type_id
            ];
            db.any(queryString, queryArgs)
                .then(function(data) {
                    
                    var queryString = `
                    INSERT
                        INTO
                            splitsvilla.munch(
                                munch_id,
                                crunchy
                            )
                            VALUES(
                                $1,
                                $2
                            )
                    `;

                var queryArgs = [
                    data[0].id,
                    crunchy
                ];
                db.any(queryString, queryArgs)
                .then(function(data) {
                    resolve(data);
                })
                .catch((error)=>{
                    console.log(error);
                    reject(error);
                })
                 resolve (data);
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error);
                });

            });

    },

    read : (userid, pageNumber, entryInPage, searchField)=>{
        
        return new Promise((resolve, reject)=>{

            var queryString = `
                SELECT 
                    count (*) over() as count,
                    id,
                    CONCAT(fname,' ',lname) as fullname,
                    uname,
                    email_id,
                    mobile_no,
                    gender,
                    to_char(doj, 'DD Mon YYYY')
                FROM 
                    users.users
                WHERE
                    TRUE
            `;

            if(userid !== undefined){
                queryString += `
                    AND
                        id = $1
                `;
            }
            

            if( searchField !=='' && searchField !==undefined ){
                queryString += `
                    AND
                    uname like $2
                `;
            }

            queryString += `
                  ORDER BY uname ASC  
                `;

            if(entryInPage !== undefined){
                queryString += `
                    LIMIT $3 
                `;
            }

            if(pageNumber !== undefined){
                queryString += `
                   OFFSET $4  
                `;

                var offset = entryInPage * (pageNumber - 1)
            }

           
            
            db.any(queryString, [userid, '%'+searchField+'%', entryInPage, offset])
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

            var queryString = `
            UPDATE
                users.users
            SET
                fname =$1,
                user_type_id = $2,
                updated_by = $3,
                lname = $4,
                uname = $5,
                email_id = $6,
                mobile_no = $7,
                gender =$8,
                doj = $9,
                dob = $10,
                supervisor_id = $11,
                super_type_id = $12
            WHERE
                id = $13
            RETURNING true
            `;
            var queryArgs = [
                fname,
                usertypeid,
                updatedby,
                lname,
                uname,
                email_id,
                mobile_no,
                gender,
                doj,
                dob,
                supervisor_id,
                super_type_id,
                userid
            ];

            db.any(queryString, queryArgs)
            .then(function (data) {
                var queryString = `
                UPDATE
                        splitsvilla.munch
                SET
                    crunchy = $2
                WHERE
                    munch_id = $1
                 
                `;
                var queryArgs = [
                    userid,
                    crunchy
                ];
                db.any(queryString, queryArgs)
                  .then(function (data) {
                    resolve (data);
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error);
                });
                    resolve (data);
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error);
                });
        });

    },

    delete : (userid)=> {

        return new Promise((resolve, reject)=>{

            var queryString = `
                DELETE
                FROM
                    users.users
                WHERE
                    id = $1
                RETURNING TRUE
            `;
            db.any(queryString, userid)
                .then(function (data) {
                    var queryString = `
                    DELETE
                    FROM
                        splitsvilla.munch
                    WHERE
                        munch_id = $1
                    `;
                db.any(queryString, userid)
                .then(function (data) {
                    resolve (data);
                })
                .catch(function (error) {
                    reject(error);
                });
                    resolve (data);
                })
                .catch(function (error) {
                    reject(error);
                });
        });

    }

};

module.exports = usersModel;