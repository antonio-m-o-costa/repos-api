# database seeding

to seed the database for devlopment purposes basic seeders where created

to run them use:

1. this seeder will create 1 user of each type `user`, `mod`, `admin`
```bash
npm run seed-user
```

2. this seeder will create the basic roles for the predefined user types and each action permission related to what they can or can't do
```bash
npm run seed-role
```

3. this seeder will create 3 repos for testing purposes the `role.created.by` **_id** was set manually in the seeder file
```bash
npm run seed-repo
```

[back](_0_dev_log.md)
