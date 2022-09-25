# database setup

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
db.createCollection("repos")
db.createCollection("users")
db.createCollection("roles")
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

[back](_0_dev_log.md)
