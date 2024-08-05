## Vercel Clone

_There are multiple **parts** in this project_:

1. Build Server
2. API Server
3. Reverse Proxy Server
4. App

##### Build Server

---

The main purpose of this server is to:

- Take a public repository as input
- Clone the project
- Build the project
- Push the output to S3

To make it scalable, we are using Amazon ECS. Our image is stored in ECR, and whenever a request comes in, we spin up a task in the cluster. This allows multiple tasks to run in parallel within the cluster, solving our scaling problem. In other words, we can build multiple repositories simultaneously.

The cluster is also Fargate type, which is serverless. It spins up as needed, and we only pay for the amount of time it is active.

##### API Server

---

The main purpose of this server is to:

- Expose apis for the frontend to use
- Create a socket server to stream the logs from redis

##### Reverse Proxy Server

---

The main purpose of this server is to:

- Stream s3 data to the web

##### App

---

This has the code related to frontend
