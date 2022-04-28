# Database usage

`adcp-profiler-service` is backed by a PostgreSQL database and stores projects, clients and project_services.

## Database migrations

Database migrations are handled using [`knex.js`](https://knexjs.org/) and can be migrated manually using the following commands:

```sh
npx knex migrate:latest # used to migrate to latest database version
npx knex migrate:up # used to migrate to the next database version
npx knex migrate:down # used to migrate to the previous database version
```

## Table structure

The following tables exist in the `profiler` database.

### `projects`

#### Columns

| column        | PostreSQL type            | nullable |       default        | description                         |
|:--------------|:--------------------------|:---------|:--------------------:|:------------------------------------|
| `id`          | `UUID`                    | FALSE    | `uuid_generate_v4()` | Unique identifier for the `project` |
| `client_id`   | `UUID`                    | FALSE    |          -           | `client` id                         |
| `name`        | `CHARACTER VARYING(50)`   | FALSE    |          -           | Name of the project                 |
| `description` | `CHARACTER VARYING(100)`  | FALSE    |          -           | Description of the project          |
| `start_date`  | `Timestamp with timezone` | TRUE     |          -           | Date the project started            |
| `end_date`    | `Timestamp with timezone` | TRUE     |          -           | Date the project ended              |
| `budget`      | `CHARACTER VARYING(50)`   | TRUE     |          -           | Budget of the project               |
| `documentUrl` | `CHARACTER VARYING(100)`  | TRUE     |          -           | Url for a project's document        |
| `created_at`  | `Timestamp with timezone` | FALSE    |       `now()`        | When the row was first created      |
| `updated_at`  | `Timestamp with timezone` | FALSE    |       `now()`        | When the row was last updated       |

#### Indexes

| columns                     | Index Type | description                                     |
|:----------------------------| :--------- |:------------------------------------------------|
| `id`                        | PRIMARY    | Primary key                                     |
| `name`                      | UNIQUE     | Guarentees a `name` can only be registered once |

### `clients`

#### Columns

| column        | PostreSQL type            | nullable |       default        | description                        |
|:--------------|:--------------------------|:---------|:--------------------:|:-----------------------------------|
| `id`          | `UUID`                    | FALSE    | `uuid_generate_v4()` | Unique identifier for the `client` |
| `first_name`  | `CHARACTER VARYING(50)`   | FALSE    |          -           | First name of the client           |
| `last_name`   | `CHARACTER VARYING(50)`   | FALSE    |          -           | Last name of the client            |
| `company`     | `CHARACTER VARYING(50)`   | FALSE    |          -           | Company of the client              |
| `role`        | `CHARACTER VARYING(50)`   | FALSE    |          -           | Role of the client                 |
| `created_at`  | `Timestamp with timezone` | FALSE    |       `now()`        | When the row was first created     |
| `updated_at`  | `Timestamp with timezone` | FALSE    |       `now()`        | When the row was last updated      |

#### Indexes

| columns | Index Type | description |
|:--------| :--------- | :---------- |
| `id`    | PRIMARY    | Primary key |

### `project_services`

#### Columns

| column       | PostreSQL type            | nullable | default | description                                 |
|:-------------|:--------------------------|:---------|:-------:|:--------------------------------------------|
| `service_id` | `UUID`                    | FALSE    |    -    | Unique identifier for the `project_service` |
| `project_id` | `UUID`                    | FALSE    |    -    | Project id of the associated service        |
| `created_at` | `Timestamp with timezone` | FALSE    | `now()` | When the row was first created              |
| `updated_at` | `Timestamp with timezone` | FALSE    | `now()` | When the row was last updated               |

#### Indexes

| columns      | Index Type | description |
|:-------------| :--------- | :---------- |
| `service_id` | PRIMARY    | Primary key |

#### Foreign Keys

| columns      | References    | description                       |
|:-------------|:--------------|:----------------------------------|
| `project_id` | `project(id)` | Guarantees the `project` is valid |
