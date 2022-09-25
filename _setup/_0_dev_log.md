# development log

## API structure

```txt
/api                            # welcome -> redirect to auth
    /auth                           # authentication -> response ( paths to register and login ) if valid token response equal to '/login'
        /register                   # register new user
        /login                      # login and auth user -> response ( paths to repos or users or roles ) based on role
            /repos              # all roles have access
                /get                # can get all repos / flagged repos only visible by creator
                /get/:id            # can get one by id
                /post               # can create
                /patch/:id          # users can edit own or flag any / mod and admin can edit any or flag any ( edit should be corrections not full content change )
                /delete/:id         # user and mod can request deletion amin can delete
            /users              # only mod and admin can access
                /get                # can get all users
                /get/:id            # can get one by id
                /post               # create user is only thru '/register'
                /patch/:id          # users can edit self / mod can edit self and flag any / admin can edit or flag any
                /delete/:id         # user and mod can request deletion amin can delete
            /roles              # only admin as access
                /get                # can get all
                /get/:id            # can get one by id
                /post               # can create ( roles are collection based )
                /patch/:id          # can edit one by id
                /delete/:id         # can delete ( if no collection is associated )
    /*                              # redirects to '/auth'
```

## data structure

```jsonc
"reposDB": {
    "repos" : {                             // collection
        "repo" : {                          // document structure
            "_id" :         "int",          // not null     | unique | primary key
            "title" :       "string",       // not null     | unique | short ( <100 chars )
            "text" :        "string",       // not null     | long ( <=>100 chars )
            "image" :       "string",       // can be null  | image.type ( png or jpg ) <=5MB / hashed
            "created" : {
                "at" :      "date",         // not null     | creation date
                "by" :      "int",          // not null     | foreign key ( user )
            },
            "edited" : {
                "at" :      "date",         // can be null  | edition date
                "by" :      "int",          // can be null  | foreign key ( user )
            },
            "flagged" : {
                "desc" :    "string",       // can be null  | report / delete
                "at" :      "date",         // can be null  | flagged date
                "by" :      "int",          // can be null  | foreign key ( user )
            },
            "deleted" : {
                "at" :      "date",         // can be null  | deletion date
                "by" :      "int",          // can be null  | foreign key ( user )
            }
        }
    },
    "users" : {                             // collection
        "user" : {                          // document structure
            "_id" :         "int",          // not null     | unique | primary key
            "username" :    "string",       // not null     | unique | short ( <=15 chars )
            "password" :    "string",       // not null     | short ( <=15 chars ) hashed
            "email" :       "string",       // not null     | unique | email ( user@foo.bar ) hashed
            "avatar" :      "string",       // can not null | image.description ( png or jpg ) / 50*50px / <=50KB / hashed
            "created" :     "date",         // not null     | creation date
            "verified" :    "date",         // not null     | verification date
            "role" :        "string",       // not null     | default is *user*
            "edited" : {
                "at" :      "date",         // can be null  | edition date
                "by" :      "int",          // can be null  | foreign key ( user )
            },
            "flagged" : {
                "desc" :    "string",       // can be null  | report / delete
                "at" :      "date",         // can be null  | flagged date
                "by" :      "int",          // can be null  | foreign key ( user )
            },
            "deleted" : {
                "at" :      "date",         // can be null  | deletion date
                "by" :      "int",          // can be null  | foreign key ( user )
            }
        }
    },
    "roles" : {                             // collection
        "role" : {                          // document structure
            "_id" :             "int",      // not null     | unique | primary key
            "scope" :           "string",   // not null     | role name (type of user)
            "actions" : [
                {
                    "affects" :     "string",   // not null     | affected collection name
                    "permissions" : {
                        "get":      "string",   // not null     | all / self / none
                        "post":     "boolean",  // not null     | true / false
                        "patch":    "string",   // not null     | all / self / none
                        "delete":   "string",  // not null     | all / self / none
                    },
                },
                {
                    // ...
                },
            ]
        }
    }
}
```

> note: all data can only be soft deleted thru the API with exception of custom roles created by an admin the 3 default descriptions cannot be deleted

1. database [setup](_1_database.md)
2. database [seeding](_2_seeding.md)
