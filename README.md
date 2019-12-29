# ⚡ Link speed Server

A server implementation for [link speed](https://www.github.com/Decad/link-speed), implemented as a cloudflare worker. Hosted at https://linkspeed.voror.workers.dev

# Running locally

```
docker build -t link-speed-server .
docker run -p 3000:3000 link-speed-server
```

# Spec

The server implementation is very simple, it has three routes all returning binary data with a `Content-Type` of `application/octet-stream`:

#### GET /empty

Returns a zero byte response with a 200 status code, used for testing RTT.

#### GET /blob/:size

Returns a binary blob with a content length and size matching the size parameter in bytes. E.g. /blob/1024 returns a binary blob 1024 bytes in size. Used to test download speed.

#### POST /upload

This endpoint will have binary data sent to it and returns a 200 successful after the request body has been completely read.

# Licence

MIT