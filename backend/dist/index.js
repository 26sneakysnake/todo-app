"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pg_1 = require("pg");
const tasks_1 = __importDefault(require("./routes/tasks"));
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const pool = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todo',
    password: 'password',
    port: 5432,
});
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection error:', err);
    }
    else {
        console.log('Database connection successful:', res.rows[0].now);
    }
});
app.use('/api/tasks', (0, tasks_1.default)(pool));
app.get('/', (req, res) => {
    res.send('Hello from Backend!');
});
app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
