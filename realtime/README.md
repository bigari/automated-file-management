# Realtime server built on node

## What it does

It acts as a realtime proxy between the clients and the rest api.
A client can send a message queue with a given format, It will be forwarded to the rest-api and the responses will be broadcasted to the connected clients for the given event.

### Message format

```json
{
  "bcast": true,
  "jwt": "<token>",
  "queue": [
    {
      "verb": "GET|POST|PUT",
      "url": "Resource endpoint",
      "data": {
        "field1": "value1",
        "field2": "value2",
        "fieldn": "valuen"
      }
    }
  ]
}
```
bcast is optional, true by default. Set explicitly to false if only the sender should receive the response.

### Response queue format

Each message in the queue maps to a response

```json
[
  {
    "verb": "GET|POST|PUT",
    "url": "Resource endpoint",
    "data": {
      "field1": "value1",
      "field2": "value2",
      "fieldn": "valuen"
    }
  }
]
```