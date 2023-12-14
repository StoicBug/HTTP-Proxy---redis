import axios from 'axios';
import redis from 'redis';

// Function to create a new Redis client instance
function createRedisClient() {
    const client = redis.createClient({
        host: 'localhost',
        port: 6379,
    });

    client.on('error', (err) => {
        console.error('Redis client error:', err);
    });

    client.on('end', () => {
        console.log('Redis client connection closed. Reconnecting...');
    });

    return client;
}

// Initialize the Redis client
let redisClient = createRedisClient();

// Middleware to check cache
const checkCache = (req, res, next) => {
    const { url } = req;
    if (!redisClient.isOpen) {
        redisClient = createRedisClient();
    }
    try {
        redisClient.get(url, (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            if (data !== null) {
                res.status(304).json(JSON.parse(data));
            } else {
                next();
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// Middleware to proxy requests
const proxyRequest = async (req, res) => {

    let url  = req.originalUrl;
    url = "https://jsonplaceholder.typicode.com" + url; 
    console.log('Incoming request URL:', url);
    
    if (!redisClient.isOpen) {
        redisClient = createRedisClient();
    }
    try {
        const response = await axios.get(url);
        const responseData = response.data;

        // Cache the response in Redis with a TTL (time to live) of 3 minutes (180 seconds)
        redisClient.setex(url, 40, JSON.stringify(responseData));

        res.json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export {
    checkCache,
    proxyRequest,
};