document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const descriptionInput = document.getElementById('description-input');
  const taskList = document.getElementById('task-list');

  // Fetch and display tasks
  fetchTasks();

  // Add task
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = taskInput.value.trim();
    const description = descriptionInput.value.trim();
    if (task && description) {
      addTask(task, description);
      taskInput.value = '';
      descriptionInput.value = '';
    }
  });

  // Delete task
  taskList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const taskId = e.target.parentElement.dataset.id;
      deleteTask(taskId);
    }
  });

  function fetchTasks() {
    fetch('http://localhost:3000/api/tasks')
      .then(response => response.json())
      .then(tasks => {
        taskList.innerHTML = '';
        tasks.forEach(task => {
          const li = document.createElement('li');
          li.dataset.id = task.id;
          li.innerHTML = `<strong>${task.name}</strong>: ${task.description}`;
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          li.appendChild(deleteButton);
          taskList.appendChild(li);
        });
      });
  }

  function addTask(task, description) {
    fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: task, description: description })
    })
    .then(response => response.json())
    .then(() => fetchTasks());
  }

  function deleteTask(taskId) {
    fetch(`http://localhost:3000/api/tasks/${taskId}`, {
      method: 'DELETE'
    })
    .then(() => fetchTasks());
  }
});