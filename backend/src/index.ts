import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import tasksRouter from './routes/tasks';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todo',
    password: '26012004',
    port: 5432,
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Database connection successful:', res.rows[0].now);
    }
});

app.use('/api/tasks', tasksRouter(pool));

app.get('/', (req, res) => {
    res.send('Hello from Backend!');
});

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});