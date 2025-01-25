"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
function default_1(pool) {
    router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield pool.query('SELECT * FROM tasks');
            res.json(result.rows);
        }
        catch (err) {
            console.error('Error retrieving tasks:', err);
            res.status(500).send('Server error');
        }
    }));
    router.get('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const result = yield pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
            if (result.rows.length === 0) {
                return res.status(404).send('Task not found');
            }
            res.json(result.rows[0]);
        }
        catch (err) {
            console.error('Error retrieving task:', err);
            res.status(500).send('Server error');
        }
    }));
    router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, description, priority, status, category } = req.body;
            const result = yield pool.query('INSERT INTO tasks (title, description, priority, status, category) VALUES ($1, $2, $3, $4, $5) RETURNING *', [title, description, priority, status, category]);
            res.status(201).json(result.rows[0]);
        }
        catch (err) {
            console.error('Error creating task:', err);
            res.status(500).send('Server error');
        }
    }));
    router.put('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { title, description, priority, status, category } = req.body;
            const result = yield pool.query('UPDATE tasks SET title = $1, description = $2, priority = $3, status = $4, category = $5 WHERE id = $6 RETURNING *', [title, description, priority, status, category, id]);
            if (result.rows.length === 0) {
                return res.status(404).send('Task not found');
            }
            res.json(result.rows[0]);
        }
        catch (err) {
            console.error('Error updating task:', err);
            res.status(500).send('Server error');
        }
    }));
    router.delete('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const result = yield pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length === 0) {
                return res.status(404).send('Task not found');
            }
            res.status(204).send();
        }
        catch (err) {
            console.error('Error deleting task:', err);
            res.status(500).send('Server error');
        }
    }));
    return router;
}
