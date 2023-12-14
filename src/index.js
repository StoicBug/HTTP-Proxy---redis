import express from 'express';
import { checkCache, proxyRequest } from './middleware/cacheMiddleware.js';
import {connectToDatabase} from './utils/database.js'
import {router} from './routes/resourceRoutes.js'

const app = express();
const port = 3000;

//static express index.html
app.use(express.static('public'));

// Connect to MongoDB
connectToDatabase();

// Express route for proxy
//app.use('*',checkCache, proxyRequest, router);

app.use('/',checkCache, router);

app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
});