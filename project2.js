const readline = require('readline');

// Task constructor function
function Task(description, dueDate, priority) {
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
  this.completed = false;
}

// To-do list array
const todoList = [];

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to add a new task
function addTask() {
  rl.question('Enter task description: ', (description) => {
    rl.question('Enter due date: ', (dueDate) => {
      rl.question('Enter priority: ', (priority) => {
        const task = new Task(description, dueDate, priority);
        todoList.push(task);
        console.log('Task added successfully.');
        showActions();
      });
    });
  });
}

// Function to list all tasks
function listTasks() {
  console.log('---------------------');
  console.log('TO-DO LIST');
  console.log('---------------------');
  todoList.forEach((task, index) => {
    console.log(`${index + 1}) ${task.description} (Due: ${task.dueDate}, Priority: ${task.priority}, Completed: ${task.completed ? 'Yes' : 'No'})`);
  });
  console.log('---------------------');
  showActions();
}

// Function to list completed tasks
function listCompletedTasks() {
  console.log('---------------------');
  console.log('COMPLETED TASKS');
  console.log('---------------------');
  const completedTasks = todoList.filter(task => task.completed);
  if (completedTasks.length === 0) {
    console.log('No completed tasks.');
  } else {
    completedTasks.forEach((task, index) => {
      console.log(`${index + 1}) ${task.description} (Due: ${task.dueDate}, Priority: ${task.priority})`);
    });
  }
  console.log('---------------------');
  showActions();
}

// Function to mark a task as completed
function markTaskAsDone() {
  rl.question('Enter the index of the task to mark as completed: ', (indexStr) => {
    const index = parseInt(indexStr) - 1;
    if (index >= 0 && index < todoList.length) {
      todoList[index].completed = true;
      console.log('Task marked as completed.');
    } else {
      console.log('Invalid task index.');
    }
    showActions();
  });
}

// Function to delete a task
function deleteTask() {
  rl.question('Enter the index of the task to delete: ', (indexStr) => {
    const index = parseInt(indexStr) - 1;
    if (index >= 0 && index < todoList.length) {
      todoList.splice(index, 1);
      console.log('Task deleted successfully.');
    } else {
      console.log('Invalid task index.');
    }
    showActions();
  });
}

// Function to sort tasks by due date
function sortTasksByDueDate() {
  todoList.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  console.log('Tasks sorted by due date.');
  showActions();
}

// Function to sort tasks by priority
function sortTasksByPriority() {
  todoList.sort((a, b) => a.priority - b.priority);
  console.log('Tasks sorted by priority.');
  showActions();
}

// Function to clear all tasks
function clearAllTasks() {
  todoList.length = 0;
  console.log('All tasks cleared.');
  showActions();
}

// Function to display the list of actions
function showActions() {
  console.log('***************************');
  console.log('Welcome to JS TODO-APP');
  console.log('***************************');
  console.log('Select an action:');
  console.log('1) Add a new task');
  console.log('2) List all tasks');
  console.log('3) List completed tasks');
  console.log('4) Mark a task as done');
  console.log('5) Delete a task');
  console.log('6) Sort tasks by due date');
  console.log('7) Sort tasks by priority');
  console.log('8) Clear all tasks');
  console.log('***************************');
  rl.question('What\'s your choice? ', (choice) => {
    console.log('---------------------');
    if (choice === '1') {
      addTask();
    } else if (choice === '2') {
      listTasks();
    } else if (choice === '3') {
      listCompletedTasks();
    } else if (choice === '4') {
      markTaskAsDone();
    } else if (choice === '5') {
      deleteTask();
    } else if (choice === '6') {
      sortTasksByDueDate();
    } else if (choice === '7') {
      sortTasksByPriority();
    } else if (choice === '8') {
      clearAllTasks();
    } else {
      console.log('Invalid choice.');
      showActions();
    }
  });
}

// Start the application
showActions();
