# Express Credit Check Workflow

## Recreating Issue

### Start Server & Mongo

```bash
pnpm install
docker compose up -d
pnpm start
```

### Manual Using Curl

#### Initialize a workflow

```bash
curl --request POST \
  --url http://localhost:4242/workflows \
  --header 'Content-Type: application/json'
```

#### Submit a "SUBMIT" event, using the workflowId obtained from the previous step

```bash
curl --request POST \
  --url http://localhost:4242/workflows/o8bls8 \
  --header 'Content-Type: application/json' \
  --data '{ "type": "SUBMIT" }'
```

#### Check if the PENDING state is saved

```bash
curl --request GET \
  --url http://localhost:4242/workflows/o8bls8 \
  --header 'Content-Type: application/json'
```

#### Submit an "APPROVE" event, using the same

```bash
curl --request POST \
  --url http://localhost:4242/workflows/o8bls8 \
  --header 'Content-Type: application/json' \
  --data '{ "type": "APPROVE" }'
```

#### Check if the APPROVED final state is saved

```bash
curl --request GET \
  --url http://localhost:4242/workflows/o8bls8 \
  --header 'Content-Type: application/json'
```

### Using Script

```bash
node -r esbuild-register race-condition.ts 0 100
```

## Original README Contents

This is a simple workflow engine built with:

- XState v5
- TypeScript
- Express

This is a modified version of the express-workflow project that shows how to implement state hydration in the `actorService.ts` file.
It also uses a more complex machine with guards, actions, and parallel states configured.

**NOTE**: This project is _not_ production-ready and is intended for educational purposes.

## Usage

[MongoDB](https://www.mongodb.com/docs/manual/administration/install-community/) should be configured with a database named `creditCheck`.

Use docker compose up -d to have a database with creditCheck included.

We recommend installing the [MongoDB Compass app](https://www.mongodb.com/products/tools/compass) to view the contents of your database while you run this project.

Add the connection string to the DB client in the `actorService.ts` file by updating this line:

```typescript
const uri = "<your mongo uri here>";
```

```bash
pnpm install
pnpm start
```

## Endpoints

### POST `/workflows`

Creates a new workflow instance.

```bash
curl -X POST http://localhost:4242/workflows
```

Example response:
`201 - Created`

```json
{
  {"message":"New worflow created successfully","workflowId":"uzkjyy"}
}
```

### POST `/workflows/:id`

`200 - OK`

Sends an event to a workflow instance.

```bash
# Replace :id with the workflow ID; e.g. http://localhost:4242/workflows/7ky252
# the body should be JSON
curl -X POST http://localhost:4242/workflows/:id -d '{"type": "Submit", "SSN": "123456789", "lastName": "Bauman", "firstName": "Gavin"}' -H "Content-Type: application/json"
```

### GET `/workflows/:id`

Gets the current state of a workflow instance.

```bash
curl -X GET http://localhost:4242/workflows/:id
```


## CURLS 

Initialize workflow:

```
curl --request POST \
  --url http://localhost:4242/workflows
  -H "Content-Type: application/json"
```

Send Event (send SUBMIT then APPROVE - can have saving issue at either event):

```
curl --request POST \
  --url http://localhost:4242/workflows/vcrtyr \
  --data '{"type": "APPROVE"}'
  -H "Content-Type: application/json"
```

Get Saved Status:

```
curl --request GET \
  --url http://localhost:4242/workflows/vcrtyr
  -H "Content-Type: application/json"
```


