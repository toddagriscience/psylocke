<!--- Copyright Todd LLC, All rights reserved -->

# Psylocke

This repository contains the authentication and general backend for Todd.

Please refer to `CONTRIBUTING.md` for more information on getting started.

## Specifications/Tooling

- Express.js as an API framework
- PostgreSQL + Drizzle ORM
- Vitest for testing

## Project structure

Psylocke uses something very similar to an MVC structure. Specifically, it is built off of a slight modification of [this structure](https://softwareontheroad.com/ideal-nodejs-project-structure/?utm_source=github&utm_medium=readme).

- `app.ts`: standard entry point for express
- `bin/`: startup scripts
- `config/`: general config files
- `loaders/`: startup files -- different from `bin/`
- `middleware/`: express middleware
- `models/`: database models, any helper (getter/setter) functions for the given database, and views
- `routes/`: general routes
- `services/`: business logic
- `types/`: general types

Not all of these folders/files may be used initially.

All files should be separated by model -- for example, given a user model, routes relating to the user model should be placed in `routes/user.ts` and business logic relating to the user model should be placed in `services/user.ts`.

## Database/schema/models

The database schema is stored in `models/`. Here are a few notes:

- Initial database schema was written by Oscar Gaske (oscar.gaske.cs@gmail.com).
- Generally speaking, lengths of `VARCHAR`'s are a _very_ overestimated guess of how long a entry could potentially be.
- When connecting to the database, use the `snake_case` option as shown in [Drizzle's documentation](https://orm.drizzle.team/docs/sql-schema-declaration#camel-and-snake-casing).
