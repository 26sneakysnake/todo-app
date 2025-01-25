import express, { Request, Response } from 'express';
import { Pool } from 'pg';

const router = express.Router();

export default function (pool: Pool) {
    router.get('/', async (req: Request, res: Response) => {
        try {
            const result = await pool.query('SELECT * FROM tasks');
            res.json(result.rows);
        } catch (err) {
            console.error('Error retrieving tasks:', err);
            res.status(500).send('Server error');
        }
    });

    router.get('/:id', async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
            if (result.rows.length === 0) {
                return res.status(404).send('Task not found');
            }
            res.json(result.rows[0]);
        } catch (err) {
            console.error('Error retrieving task:', err);
            res.status(500).send('Server error');
        }
    });

    router.post('/', async (req: Request, res: Response) => {
        try {
            const { title, description, priority, status, category } = req.body;
            const result = await pool.query(
                'INSERT INTO tasks (title, description, priority, status, category) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [title, description, priority, status, category]
            );
            res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error('Error creating task:', err);
            res.status(500).send('Server error');
        }
    });

    router.put('/:id', async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { title, description, priority, status, category } = req.body;
            const result = await pool.query(
                'UPDATE tasks SET title = $1, description = $2, priority = $3, status = $4, category = $5 WHERE id = $6 RETURNING *',
                [title, description, priority, status, category, id]
            );
            if (result.rows.length === 0) {
                return res.status(404).send('Task not found');
            }
            res.json(result.rows[0]);
        } catch (err) {
            console.error('Error updating task:', err);
            res.status(500).send('Server error');
        }
    });

    router.delete('/:id', async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length === 0) {
                return res.status(404).send('Task not found');
            }
            res.status(204).send();
        } catch (err) {
            console.error('Error deleting task:', err);
            res.status(500).send('Server error');
        }
    });

    return router;
}