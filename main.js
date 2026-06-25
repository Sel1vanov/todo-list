//вытаскиваем кнопки из html-файла
const resetButton = document.querySelector('.rst-btn')
const addButton = document.querySelector('.add-task')
const descriptionTask = document.getElementById('main-input')
const nameTask = document.getElementById('name-task')
const tasksList = document.querySelector('.task-list')

//очистка формы
function resetInput(event){
    nameTask.value = ""
    descriptionTask.value = ""
}
resetButton.addEventListener('click', resetInput)
//подвязка кнопки с событием
let tasks;
if(localStorage.getItem('tasks') !== null) tasks = JSON.parse(localStorage.getItem('tasks'))
    else tasks = []
function newTask(){
    let title = nameTask.value
    let description = descriptionTask.value
    if(!title || !description) return(alert("Введите название и описание."))
    tasks.push({
        name: title,
        desc: description
    })
    console.log(tasks)
    render()
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function render(){
    tasksList.innerHTML = ''
    tasks.forEach(function(task, index){
        const cardHTML = `
        <div class="card-task">
                    <h3>${task.name}</h3>
                    <p>${task.desc}</p>
                        <div class="card-buttons">
                        <md-filled-tonal-icon-button toggle>
                        <md-icon>done</md-icon>
                        <md-icon slot="selected">close</md-icon>
                        </md-filled-tonal-icon-button>
                        <md-filled-icon-button class="deleteBTN" data-index="${index}">
                        <md-icon>delete</md-icon>
                        </md-filled-icon-button>
                        <div>
                </div>
        `
        tasksList.insertAdjacentHTML('beforeend', cardHTML)
    })
}

addButton.addEventListener('click', newTask)

function deleteTask(index){
    tasks.splice(index, 1);
    render()
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

tasksList.addEventListener('click', function(event){
    const deleteButton = event.target.closest('.deleteBTN')
    
    if(deleteButton){
        const index = deleteButton.dataset.index;
        deleteTask(index)
    }
})

render()
