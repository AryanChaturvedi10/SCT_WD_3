// Task array to store all tasks
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

// Initialize app on page load
document.addEventListener('DOMContentLoaded', function() {
    renderTasks();

    // Allow Enter key to add task
    const taskInput = document.getElementById('taskInput');
    if (taskInput) {
        taskInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTask();
            }
        });
    }
});

// Add new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDate = document.getElementById('taskDate');
    const taskTime = document.getElementById('taskTime');

    if (!taskInput) {
        console.error('Task input element not found');
        return;
    }

    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        date: taskDate.value || '',
        time: taskTime.value || '',
        createdAt: new Date().toISOString()
    };

    tasks.unshift(task);
    saveTasks();
    renderTasks();

    // Clear inputs
    taskInput.value = '';
    taskDate.value = '';
    taskTime.value = '';
    taskInput.focus();
}

// Toggle task completion
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

// Delete task
function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
    }
}

// Edit task
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const taskItem = document.querySelector(`[data-id="${id}"]`);
    if (!taskItem) return;

    const taskContent = taskItem.querySelector('.task-content');

    // Create edit form
    taskContent.innerHTML = `
        <input type="text" value="${escapeHtml(task.text)}" id="edit-input-${id}" class="edit-input">
        <div class="task-datetime mt-2">
            <input type="date" value="${task.date}" id="edit-date-${id}" class="px-2 py-1 border rounded text-sm">
            <input type="time" value="${task.time}" id="edit-time-${id}" class="px-2 py-1 border rounded text-sm">
        </div>
    `;

    // Change action buttons
    const actionsDiv = taskItem.querySelector('.task-actions');
    actionsDiv.innerHTML = `
        <button onclick="saveEdit(${id})" class="save-btn">Save</button>
        <button onclick="cancelEdit(${id})" class="cancel-btn">Cancel</button>
    `;

    const editInput = document.getElementById(`edit-input-${id}`);
    if (editInput) editInput.focus();
}

// Save edited task
function saveEdit(id) {
    const newText = document.getElementById(`edit-input-${id}`).value.trim();
    const newDate = document.getElementById(`edit-date-${id}`).value;
    const newTime = document.getElementById(`edit-time-${id}`).value;

    if (newText === '') {
        alert('Task cannot be empty!');
        return;
    }

    const task = tasks.find(t => t.id === id);
    if (task) {
        task.text = newText;
        task.date = newDate;
        task.time = newTime;
        saveTasks();
        renderTasks();
    }
}

// Cancel edit
function cancelEdit(id) {
    renderTasks();
}

// Filter tasks
function filterTasks(filter) {
    currentFilter = filter;

    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Find and activate the clicked button
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        if (btn.textContent.trim().toLowerCase() === filter) {
            btn.classList.add('active');
        }
    });

    renderTasks();
}

// Clear completed tasks
function clearCompleted() {
    const completedCount = tasks.filter(t => t.completed).length;

    if (completedCount === 0) {
        alert('No completed tasks to clear!');
        return;
    }

    if (confirm(`Delete ${completedCount} completed task(s)?`)) {
        tasks = tasks.filter(t => !t.completed);
        saveTasks();
        renderTasks();
    }
}

// Render tasks to DOM
function renderTasks() {
    const taskList = document.getElementById('taskList');

    if (!taskList) {
        console.error('Task list element not found');
        return;
    }

    // Filter tasks based on current filter
    let filteredTasks = tasks;
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(t => t.completed);
    }

    if (filteredTasks.length === 0) {
        taskList.innerHTML = '<div class="empty-state">No tasks to display. Add a new task to get started! 🚀</div>';
        return;
    }

    taskList.innerHTML = filteredTasks.map(task => {
        const dateTimeStr = formatDateTime(task.date, task.time);
        return `
            <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <input 
                    type="checkbox" 
                    class="task-checkbox" 
                    ${task.completed ? 'checked' : ''} 
                    onchange="toggleTask(${task.id})"
                >
                <div class="task-content">
                    <div class="task-text">${escapeHtml(task.text)}</div>
                    ${dateTimeStr ? `<div class="task-datetime">${dateTimeStr}</div>` : ''}
                </div>
                <div class="task-actions">
                    <button onclick="editTask(${task.id})" class="edit-btn">Edit</button>
                    <button onclick="deleteTask(${task.id})" class="delete-btn">Delete</button>
                </div>
            </div>
        `;
    }).join('');
}

// Format date and time for display
function formatDateTime(date, time) {
    let parts = [];

    if (date) {
        const d = new Date(date);
        parts.push(`📅 ${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`);
    }

    if (time) {
        parts.push(`⏰ ${time}`);
    }

    return parts.join(' ');
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Save tasks to localStorage
function saveTasks() {
    try {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (e) {
        console.error('Error saving tasks to localStorage:', e);
    }
}