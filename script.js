let taskArray = [];

let taskIdCounter = 0;

const taskForm = document.getElementById('task-form');
const taskListElement = document.getElementById('task-list');

taskForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const titleValue = document.getElementById('task-title').value;
    const priorityValue = document.getElementById('task-priority').value;
    

    const statusRadios = document.getElementsByName('task-status');
    let statusValue = 'pending';
    for (let i = 0; i < statusRadios.length; i++) {
        if (statusRadios[i].checked) {
            statusValue = statusRadios[i].value;
            break; 
        }
    }

    const newTask = {
        id: taskIdCounter++, 
        title: titleValue,
        priority: priorityValue,
        status: statusValue
    };

    taskArray.push(newTask);

    addTaskToDOM(newTask);

    taskForm.reset();
});


function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center mb-2 shadow-sm';
    
    const taskTextSpan = document.createElement('span');
    taskTextSpan.textContent = `[${task.priority.toUpperCase()}] ${task.title} - Status: ${task.status}`;
    
    if (task.status === 'completed') {
        taskTextSpan.style.textDecoration = 'line-through';
        taskTextSpan.style.color = 'gray';
    }

    const buttonDiv = document.createElement('div');

    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.className = 'btn btn-success btn-sm me-2';
    
    completeBtn.addEventListener('click', function() {
        taskTextSpan.style.textDecoration = 'line-through';
        taskTextSpan.style.color = 'gray';
        
        taskTextSpan.textContent = `[${task.priority.toUpperCase()}] ${task.title} - Status: completed`;

        for (let i = 0; i < taskArray.length; i++) {
            if (taskArray[i].id === task.id) {
                taskArray[i].status = 'completed';
                break;
            }
        }
    });

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'btn btn-danger btn-sm';
    
    removeBtn.addEventListener('click', function() {
        taskListElement.removeChild(li);

        for (let i = 0; i < taskArray.length; i++) {
            if (taskArray[i].id === task.id) {
                taskArray.splice(i, 1);
                break;
            }
        }
    });

    buttonDiv.appendChild(completeBtn);
    buttonDiv.appendChild(removeBtn);

    li.appendChild(taskTextSpan);
    li.appendChild(buttonDiv);

    taskListElement.appendChild(li);
}