document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = 'http://localhost:3000/api/tasks';

  // Fetch and display tasks
  async function fetchTasks() {
    const response = await fetch(apiUrl);
    const tasks = await response.json();
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = `${task.title}: ${task.description}`;
      taskList.appendChild(li);
    });
  }

  // Add a new task
  document.getElementById('task-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('task-input').value;
    const description = 'No description'; // You can add a description input if needed

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description, completed: false })
    });

    if (response.ok) {
      fetchTasks();
      document.getElementById('task-form').reset();
    }
  });

  // Initial fetch of tasks
  fetchTasks();
});