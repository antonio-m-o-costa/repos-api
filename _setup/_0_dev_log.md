# development log

## API structure

| path                 | method | body request        | body response                                                | permissions                                   |
| :------------------- | :----- | :------------------ | :----------------------------------------------------------- | :-------------------------------------------- |
| `/`                  | get    | empty               | links to login or register                                   | allow all                                     |
| `/auth/login`        | post   | json{user,pass}     | session created / links to (get)`users/`                     | allow all                                     |
| `/auth/logout`       | post   | empty               | destroy session / links to (get)`/`                          | allow with session `all`                      |
| `/users`             | get    | empty               | list all user / links to (get)`users/:id`                    | allow with session `all`                      |
| `/users`             | post   | json{user,pass,rle} | user created / links to (get)`users/login`                   | allow all                                     |
| `/users/:id`         | get    | empty               | user info / links to (patch) and (delete)`users/:id/:action` | `user` view only                              |
| `/users/:id/:action` | patch  | json{data}          | user updated / links to (get)`users/:id`                     | `user` self / `mod` user update / `admin` all |
| `/users/:id/:action` | delete | empty               | user deleted / links to (get)`users/`                        | `user` self / `mod` soft delete / `admin` all |

## data structure

```jsonc
"reposDB": {
    "users" : {                             // collection
        "user" : {                          // document structure
            "_id" :         "int",          // not null     | unique | primary key
            "username" :    "string",       // not null     | unique | short ( <=15 chars )
            "password" :    "string",       // not null     | short ( <=15 chars ) hashed
            "created" :     "date",         // not null     | creation date
            "role" :        "string",       // not null     | default is *user*
            "edited" : {
                "at" :      "date",         // can be null  | edition date
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
                        "delete":   "string",   // not null     | all / self / none
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
