document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element References ---
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');
    const filterButtons = document.querySelectorAll('.filter-btn'); // New: for filtering tasks
    const clearCompletedButton = document.getElementById('clear-completed-btn'); // New: clear completed tasks button
    const pendingTasksCount = document.getElementById('pending-tasks-count'); // New: task counter
    const prioritySelect = document.getElementById('priority-select'); // New: priority selector

    let currentFilter = 'all'; // Default filter state

    // --- Initialization ---
    loadTodos(); // Load existing to-dos on page load
    updatePendingTasksCount(); // Update the counter after loading
    applyFilter(); // Apply the default filter
    addEventListeners(); // Centralized event listener setup

    // --- Event Listeners Setup ---
    function addEventListeners() {
        addButton.addEventListener('click', handleAddTodo);
        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleAddTodo();
            }
        });

        // Event listeners for filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                currentFilter = e.target.dataset.filter;
                applyFilter();
                // Update active state for filter buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Event listener for clear completed button
        clearCompletedButton.addEventListener('click', clearCompletedTodos);
    }

    /**
     * Handles the addition of a new to-do item, including priority.
     */
    function handleAddTodo() {
        const todoText = todoInput.value.trim();
        const priority = prioritySelect.value; // Get selected priority

        if (!todoText) {
            alert('To-do item cannot be empty. Please enter a task.');
            todoInput.focus();
            return;
        }

        // Create new element with text, not completed status, and selected priority
        createTodoElement(todoText, false, priority);
        saveTodos();
        updatePendingTasksCount();
        applyFilter(); // Re-apply filter to show new item if applicable
        todoInput.value = '';
        prioritySelect.value = 'medium'; // Reset priority to default
    }

    /**
     * Creates and appends a list item (<li>) element for a to-do, now with priority.
     *
     * @param {string} text - The text content of the to-do item.
     * @param {boolean} completed - A boolean indicating if the to-do is completed.
     * @param {string} priority - The priority of the task (e.g., 'low', 'medium', 'high').
     */
    function createTodoElement(text, completed, priority) {
        const li = document.createElement('li');
        li.className = `todo-item ${completed ? 'completed' : ''} priority-${priority}`; // Add priority class
        li.setAttribute('data-todo-text', text);
        li.setAttribute('data-priority', priority);
        li.setAttribute('data-completed', completed); // Store completed state as data attribute for filtering
        li.setAttribute('role', 'listitem');

        const checkbox = document.createElement('input'); // New: checkbox for completion
        checkbox.type = 'checkbox';
        checkbox.checked = completed;
        checkbox.className = 'todo-checkbox';
        checkbox.setAttribute('aria-label', `Mark "${text}" as complete`);
        checkbox.addEventListener('change', () => {
            li.classList.toggle('completed');
            li.setAttribute('data-completed', checkbox.checked); // Update data attribute
            saveTodos();
            updatePendingTasksCount();
            applyFilter(); // Re-apply filter after status change
        });

        const span = document.createElement('span');
        span.textContent = text;
        span.className = 'todo-text';
        span.tabIndex = 0;
        span.setAttribute('role', 'textbox'); // Now it's editable
        span.setAttribute('aria-label', `Edit task "${text}"`);
        span.contentEditable = 'false'; // Initially not editable

        // Double-click to enable editing
        span.addEventListener('dblclick', () => {
            span.contentEditable = 'true';
            span.focus();
            li.classList.add('editing'); // Add editing class for styling
        });

        // Exit editing on 'Enter' or 'blur'
        span.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); // Prevent new line
                span.blur(); // Trigger blur event to save
            }
        });

        span.addEventListener('blur', () => {
            span.contentEditable = 'false';
            li.classList.remove('editing');
            const newText = span.textContent.trim();
            if (newText === '' || newText === li.getAttribute('data-todo-text')) {
                span.textContent = li.getAttribute('data-todo-text'); // Revert if empty or no change
            } else {
                li.setAttribute('data-todo-text', newText);
                saveTodos(); // Save after editing
            }
        });

        // Priority display element (e.g., a badge or icon)
        const priorityDisplay = document.createElement('span');
        priorityDisplay.className = `priority-badge priority-${priority}`;
        priorityDisplay.textContent = priority.charAt(0).toUpperCase() + priority.slice(1); // Capitalize first letter

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.setAttribute('aria-label', `Delete task "${text}"`);
        deleteButton.addEventListener('click', () => {
            // Add a class for exit animation before removal
            li.classList.add('fade-out');
            li.addEventListener('animationend', () => {
                todoList.removeChild(li);
                saveTodos();
                updatePendingTasksCount();
                applyFilter();
            }, { once: true }); // Ensure event listener is removed after one use
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(priorityDisplay); // Add priority display
        li.appendChild(deleteButton);
        todoList.appendChild(li);
        
        // Add a class for entry animation
        li.classList.add('fade-in');
        li.addEventListener('animationend', () => {
            li.classList.remove('fade-in');
        }, { once: true });
    }

    /**
     * Saves the current state of all to-do items to local storage, including priority.
     */
    function saveTodos() {
        const todos = [];
        todoList.querySelectorAll('li').forEach(li => {
            todos.push({
                text: li.querySelector('.todo-text').textContent,
                completed: li.classList.contains('completed'),
                priority: li.getAttribute('data-priority') // Save priority
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
        console.log('To-do list saved to localStorage.');
    }

    /**
     * Loads to-do items from local storage, now including priority.
     */
    function loadTodos() {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            try {
                const todos = JSON.parse(storedTodos);
                todos.forEach(todo => {
                    // Default priority if not found (for older saved items)
                    const priority = todo.priority || 'medium';
                    createTodoElement(todo.text, todo.completed, priority);
                });
                console.log('To-do list loaded from localStorage.');
            } catch (error) {
                console.error('Error parsing todos from localStorage:', error);
                alert('Could not load saved to-do items due to data corruption. Starting with an empty list.');
                localStorage.removeItem('todos');
            }
        }
    }

    /**
     * Updates the count of pending (uncompleted) tasks.
     */
    function updatePendingTasksCount() {
        const pendingTasks = todoList.querySelectorAll('li:not(.completed)').length;
        pendingTasksCount.textContent = pendingTasks;
    }

    /**
     * Filters the displayed to-do items based on the currentFilter state.
     */
    function applyFilter() {
        todoList.querySelectorAll('li').forEach(li => {
            const isCompleted = li.classList.contains('completed');
            switch (currentFilter) {
                case 'all':
                    li.style.display = 'flex';
                    break;
                case 'pending':
                    li.style.display = isCompleted ? 'none' : 'flex';
                    break;
                case 'completed':
                    li.style.display = isCompleted ? 'flex' : 'none';
                    break;
            }
        });
        // After filtering, ensure pending tasks count is accurate
        updatePendingTasksCount();
    }

    /**
     * Clears all completed to-do items from the list and local storage.
     */
    function clearCompletedTodos() {
        // Collect completed items to animate their removal
        const completedItems = todoList.querySelectorAll('li.completed');
        if (completedItems.length === 0) {
            alert('No completed tasks to clear!');
            return;
        }

        // Use a counter to track animation ends
        let animationsCompleted = 0;
        completedItems.forEach(li => {
            li.classList.add('fade-out');
            li.addEventListener('animationend', () => {
                todoList.removeChild(li);
                animationsCompleted++;
                if (animationsCompleted === completedItems.length) {
                    saveTodos(); // Save after all removals
                    updatePendingTasksCount();
                    applyFilter();
                }
            }, { once: true });
        });
    }
});jkhijh