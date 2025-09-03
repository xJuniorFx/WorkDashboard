// Importing necessary dependencies
import express from 'express'; // Framework for creating HTTP servers
import dotenv from 'dotenv'; // To load environment variables from a .env file
import bodyParser from 'body-parser'; // Middleware to parse request bodies
import cors from 'cors'; // Middleware to allow cross-origin requests (Cross-Origin Resource Sharing)
import helmet from 'helmet'; // Middleware to increase app security by setting HTTP headers
import morgan from 'morgan'; // Middleware to log HTTP requests

/* ROUTE IMPORTS */
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';
import searchRoutes from './routes/searchRoutes';

/* CONFIGURATIONS */
// Middleware configurations
dotenv.config();
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(helmet()); // Middleware to set security headers
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' })); // Cross-origin resource policy
app.use(morgan('common')); // Middleware to log HTTP requests in 'common' format
app.use(bodyParser.json()); // Middleware to parse requests with JSON body
app.use(bodyParser.urlencoded({ extended: false })); // Middleware to parse URL-encoded data
app.use(cors()); // Middleware to enable cross-origin requests (CORS)

/* ROUTES */
app.get('/', (req, res) => {
	res.send('This is home route'); // Simple response for the "/" route
});
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);
app.use('/search', searchRoutes);
/* SERVER CONFIGURATION */
// Defining the server port from the environment variable (process.env.PORT), with fallback to 3000
const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
	console.log(`Server running on port ${port}`); // Logging confirmation that the server is running
});
