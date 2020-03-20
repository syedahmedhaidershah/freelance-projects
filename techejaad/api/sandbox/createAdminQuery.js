db.createUser(
    { 
        user: "sahs9996",
        pwd: "Ahmed1234.!",
        roles: [
            "userAdminAnyDatabase",
            "dbAdminAnyDatabase",
            "readWriteAnyDatabase"
        ]
    }
)