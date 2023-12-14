# Redis Cache Middleware Project

This project implements a Redis cache middleware to enhance the performance of your application by caching responses. When a request is made, the middleware checks if the data is available in the cache. If found, it serves the data from the cache instead of querying the database, reducing response time.

## Getting Started

Follow these steps to set up and run the project:

```bash
cd src
npm install
node index.js
```

## Project Structure

The project follows a structured organization to keep code modular and maintainable.

- middlewares: Contains middleware functions, including the Redis cache middleware responsible for caching responses.
- utils: Houses utility functions, notably the database connection setup. The Redis client is initialized and managed here.
- routes: A folder dedicated to route files. Here, you define the routes and connect them to the corresponding controller functions.
- models/posts: A folder that encapsulates the MongoDB model for posts. Each model file represents a specific data structure.
