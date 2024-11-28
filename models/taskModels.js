const db = require('../config/db');

const Task = {
  getAll: (callback) => {
    db.query('SELECT * FROM tasks', callback);
  },
  create: (task, callback) => {
    db.query('INSERT INTO tasks SET ?', task, callback);
  },
  update: (id, task, callback) => {
    db.query('UPDATE tasks SET ? WHERE id = ?', [task, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM tasks WHERE id = ?', [id], callback);
  }
};

module.exports = Task;