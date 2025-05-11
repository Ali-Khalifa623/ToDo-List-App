const input = document.getElementById('input');
const addBtn = document.getElementById('addBtn');
let tasksList = document.querySelector('.tasks-list')
const taskStats = document.querySelector('.stat')
const taskProgress = document.querySelector('.progress-bar')
let tasks = [];
let finisedTasks = []
let mood = 'create'
let value;



window.onload = () => {
  if (localStorage.getItem('task')) {
    tasks = JSON.parse(localStorage.getItem('task'))
    showTask()
    updateTaskStats()
  }
}

addBtn.onclick = () => {
  if (input.value.trim()) {
    let task = {
      title: input.value,
      finished: false,
    }
    if (mood === 'create') {
      tasks.push(task)
    } else {
      tasks[value].title = task.title
      tasks[value].finished = false
    }
    input.value = ''
    showTask()
    updateTaskStats()
    localStorage.setItem('task', JSON.stringify(tasks))
  }
}

const showTask = () => {
  tasksList.innerHTML =''
  for (var i = 0; i < tasks.length; i++) {
    let li = document.createElement('li')
    li.innerHTML = `
      <li class="task-item d-flex juatify-content-between align-items-center p-3 rounded-3 gap-3 mb-3" style="background: #0A1E36">
        <div class="text form-check w-100">
          <label class="form-check-label fs-5 d-flex align-items-center gap-2">
          <input type="checkbox" ${tasks[i].finished === false ? '' : 'checked'} onchange="makeTaskFinished(this, ${i})" class="form-check-input mt-0">${tasks[i].title}
          </label>
        </div>
        <div class="icons d-flex gap-2">
          <i class="fa-solid fa-trash text-danger fs-5" onclick="deleteTask(${i})"></i>
          <i class="fa-solid fa-edit text-primary fs-5 ms-1" onclick="updateTask(${i})"></i>
        </div>
      </li>
    `
    tasksList.append(li)
    
    let checkboxs = tasksList.querySelectorAll('.task-item input')
    checkboxs.forEach((checkbox) => {
      if (checkbox.checked) {
      checkbox.parentElement.classList.add('checked')
    } else {
      checkbox.parentElement.classList.remove('checked')
    }
    })
  } 
}

const deleteTask = (index) => {
  tasks.splice(index, 1)
  showTask()
  updateTaskStats()
  localStorage.setItem('task', JSON.stringify(tasks))
}

const updateTask = (index) => {
  input.value = tasks[index].title;
  mood = 'update'
  value = index
  updateTaskStats()
}

const makeTaskFinished = (checkbox, index) => {
  tasks[index].finished = false ? !tasks[index].finished : !tasks[index].finished;
  if (checkbox.checked && tasks[index].finished == true) {
    checkbox.parentElement.classList.add('checked')
  } else {
    checkbox.parentElement.classList.remove('checked')
  }
  updateTaskStats()
  localStorage.setItem('task', JSON.stringify(tasks))
}

const updateTaskStats = () => {
  finisedTasks = tasks.filter((task) => task.finished === true)
  taskStats.innerHTML = `${finisedTasks.length} / ${tasks.length}`
  if (tasks.length === 0) {
    taskProgress.style.width = '0'
  } else {
    taskProgress.style.width = `${(finisedTasks.length / tasks.length) * 100}%`
  }
}
