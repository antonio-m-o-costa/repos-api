# development notes

---

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

---

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
}
```

> note: users can only be soft deleted thru the API with exception for users with the admin role (in this case the admin will be required to pass additional parameters to perform an hard delete)

---

## database creation and setup

installed `mongodb`, `mongo shell`, `mongo tools` and `mongo compass`

| mongodb                                                              | version used |
| :------------------------------------------------------------------- | -----------: |
| [mongodb community](https://www.mongodb.com/try/download/community)  |       ^6.0.1 |
| [mongosh shell](https://www.mongodb.com/try/download/shell)          |       ^1.5.4 |
| [mongodb tools](https://www.mongodb.com/try/download/database-tools) |     ^100.6.0 |
| [mongo compass](https://www.mongodb.com/try/download/compass)        |      ^1.32.6 |

added aliases to `.bashrc` and created `Data/` and `Log/` folders for ease of use (cleaning)

```bash
# custom port - add '--port 27017'
# log session - add '--logpath /home/user/Mongo/Log/session.log'
alias mongo-start='mongod --auth --dbpath /home/user/Mongo/Data/'
```

created `database`, `collections`

```mongosh
use reposDB
db.createCollection("users")
```

setup mongodb user with role to use authenticated connections

```mongosh
use admin
db.createUser({
    user: "repoUser",
    pwd: "repoPass",
    roles: [
        { role: "readWrite", db: "reposDB" }
    ]
})
```

final connection string

```txt
mongodb://repoUser:repoPass@127.0.0.1:27017/reposDB?authMechanism=DEFAULT&authSource=admin
```

## database seeding

to seed the database for devlopment purposes a basic seeder was created

to run them use:

this seeder will create 1 user of each type `user`, `mod`, `admin` and one deleted user

```terminal
npm run seed-user
```

## other notes

- linting [javascript](_es_linting.md)
