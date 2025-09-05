"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing necessary dependencies
const express_1 = __importDefault(require("express")); // Framework for creating HTTP servers
const dotenv_1 = __importDefault(require("dotenv")); // To load environment variables from a .env file
const body_parser_1 = __importDefault(require("body-parser")); // Middleware to parse request bodies
const cors_1 = __importDefault(require("cors")); // Middleware to allow cross-origin requests (Cross-Origin Resource Sharing)
const helmet_1 = __importDefault(require("helmet")); // Middleware to increase app security by setting HTTP headers
const morgan_1 = __importDefault(require("morgan")); // Middleware to log HTTP requests
/* ROUTE IMPORTS */
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const searchRoutes_1 = __importDefault(require("./routes/searchRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
/* CONFIGURATIONS */
// Middleware configurations
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Middleware to parse JSON request bodies
app.use((0, helmet_1.default)()); // Middleware to set security headers
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: 'cross-origin' })); // Cross-origin resource policy
app.use((0, morgan_1.default)('common')); // Middleware to log HTTP requests in 'common' format
app.use(body_parser_1.default.json()); // Middleware to parse requests with JSON body
app.use(body_parser_1.default.urlencoded({ extended: false })); // Middleware to parse URL-encoded data
app.use((0, cors_1.default)()); // Middleware to enable cross-origin requests (CORS)
/* ROUTES */
app.get('/', (req, res) => {
    res.send('This is home route'); // Simple response for the "/" route
});
app.use('/projects', projectRoutes_1.default);
app.use('/tasks', taskRoutes_1.default);
app.use('/search', searchRoutes_1.default);
app.use('/users', userRoutes_1.default);
/* SERVER CONFIGURATION */
// Defining the server port from the environment variable (process.env.PORT), with fallback to 3000
const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`); // Logging confirmation that the server is running
});
