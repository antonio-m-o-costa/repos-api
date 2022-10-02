# development notes

## API structure

| path           | method | body request         | body response                                        | permissions                                                            |
| :------------- | :----- | :------------------- | :--------------------------------------------------- | :--------------------------------------------------------------------- |
| `/`            | get    | empty                | links to login or register                           | allow all                                                              |
| `/auth/login`  | post   | json{user,pass}      | session created / links to (get)`users/`             | allow all                                                              |
| `/auth/logout` | post   | empty                | destroy session / links to (get)`/`                  | allow with session `all`                                               |
| `/users`       | get    | empty                | list all user / links to (get)`users/:id`            | allow with session `all`                                               |
| `/users`       | post   | json{user,pass,role} | user created / links to (get)`users/login`           | allow all                                                              |
| `/users/:id`   | get    | empty                | user info / links to (patch) and (delete)`users/:id` | allow with session `all`                                               |
| `/users/:id`   | patch  | json{data}           | user updated / links to (get)`users/:id`             | `user` self / `mod` user mod / `admin` all                             |
| `/users/:id`   | delete | empty or json{hard}  | user deleted / links to (get)`users/`                | `user` soft delete / `mod` soft delete / `admin` soft or hard with key |

## data structure

```jsonc
"reposDB": {
    "users" : {                             // collection
        "user" : {                          // document structure
            "_id" :         "int",          // not null     | unique | primary key
            "username" :    "string",       // not null     | unique | short ( <=15 chars )
            "password" :    "string",       // not null     | hashed bcrypt
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

> note: users can only be soft deleted thru the API with exception for users with the admin role (in this case the admin will be required to pass additional parameters to perform an hard delete)

## specific notes

1. database [setup](_1_database.md)
2. database [seeding](_2_seeding.md)

## other notes

- linting [javascript](_es_linting.md)
