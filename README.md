# Simple GraphQL Project

This is a simple graphql project built with express.js

Built by Josh Ferrell :)

## Installation

```
yarn install
```

### Required environment VARIABLES
The following environment variables are required to run in a file called `dev.env` in the root app directory

#### User Defined Variables
| Variable Name | Example                                              |
|:--------------|:-----------------------------------------------------|
| JWT_SECRET    | for testing purposes can be garbage, used for jwt.io |
| NAME          | servername-host                                      |
| PORT          | port that the server will run on                     |

#### Information for Postgres
* POSTGRES_HOST
* POSTGRES_PORT
* POSTGRES_USER
* POSTGRES_DBNAME
* POSTGRES_SYNC_FORCE
    * TYPE: boolean
    * Forces updates on the db for orm building

#### Information for Steam API
* STEAM_API_KEY
    * [Get Steam API Key](https://steamcommunity.com/dev/apikey)

## Available Commands

* `yarn start` | start the graphql server
* `yarn test` | run through unit tests for the server
* `yarn lint` | ensure that the server passes linter tests
* `yarn coverage` | run through jest coverages

## Deploy Docker Container

### Pre-Reqs
Docker must be installed for this to work properly. See the [Docker Installation Guide](https://docs.docker.com/engine/installation/) for information on this.

### Deploy Locally

Some shell scripts have been created for people to be able to deploy their own version of this application. Simply run
```
bash ./deploy-server.sh {server name} {port}
```

### Publish to hyper

#### Pre-Reqs

    * [Install hyper](https://console.hyper.sh/register)
    * [Setup Docker Hub](https://docs.docker.com/docker-hub/#create-a-docker-id)

#### Run Publish Script
```
bash ./publish-server.sh {server name} {port}
```

### TODO
* Add bunyan logger
* Complete schema definitions for graphql
