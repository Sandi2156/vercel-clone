## Vercel Clone

*There are multiple **parts** in this project*:

1. Build Server
2. API Server

##### Build Server

---

The main purpose of this server is to:

- Take a public repository as input
- Clone the project
- Build the project
- Push the output to S3

To make it scalable, we are using Amazon ECS. Our image is stored in ECR, and whenever a request comes in, we spin up a task in the cluster. This allows multiple tasks to run in parallel within the cluster, solving our scaling problem. In other words, we can build multiple repositories simultaneously.

The cluster is also Fargate type, which is serverless. It spins up as needed, and we only pay for the amount of time it is active.
