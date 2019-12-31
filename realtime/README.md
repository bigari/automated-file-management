# Realtime server built on node

## What it does

It acts as a realtime proxy between the clients and the rest api.
A client can send a message queue with a given format, It will be forwarded to the rest-api and the responses will be broadcasted to the connected clients for the given event.

### Message format

```json
{
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

### Response queue format

Each message in the queue map to a response

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
