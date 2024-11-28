const db = require('../config/db'); // Ensure the correct path to db.js

// Get all tasks
exports.getAllTasks = (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(200).json(results);
  });
};

// Create a new task
exports.createTask = (req, res) => {
  const { name, description } = req.body;
  db.query('INSERT INTO tasks (name, description) VALUES (?, ?)', [name, description], (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(201).json({ id: results.insertId, name, description });
  });
};

// Update a task
exports.updateTask = (req, res) => {
  const taskId = req.params.id;
  const { name, description } = req.body;
  db.query('UPDATE tasks SET name = ?, description = ? WHERE id = ?', [name, description, taskId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(200).json(results);
  });
};

// Delete a task
exports.deleteTask = (req, res) => {
  const taskId = req.params.id;
  db.query('DELETE FROM tasks WHERE id = ?', [taskId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(200).json(results);
  });
};