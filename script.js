let titleInput = document.getElementById('titleInput')
let addbtn = document.getElementById('addbtn')
let viewbtn = document.getElementById('viewbtn')
let alert = document.querySelector('.alert')
let alertText = document.getElementById('alertText')
let ok = document.getElementById('resetbtn')
let main = document.querySelector('.main')

let popup = document.querySelector('.popup')
let popupYes = document.getElementById('popupYes')
let popupNo = document.getElementById('popupNo')

let tasks = JSON.parse(localStorage.getItem('tasks')) || []

let dateInput = document.querySelector('.dateInput')
let timeInput = document.querySelector('.timeInput')


addbtn.addEventListener('click', () => {
    let titleString = titleInput.value.toUpperCase()
    let foundTask = tasks.find(task => task.name === titleString)

    if(foundTask){
        alertText.textContent = `Task "${titleInput.value}" already exists ⚠. Click View Tasks button to view all tasks.`
        titleInput.value = ''
        main.classList.add('blur')
        alert.style.top = '15px'
    }else if(!titleInput.value.trim()){
        alertText.textContent = 'Title must not be Empty or Space Only! ⚠'
        titleInput.value = ''
        main.classList.add('blur')
        alert.style.top = '15px'
    }else if(!dateInput.value || !timeInput.value){
        alertText.textContent = `Please Select both date and time ⚠`
        main.classList.add('blur')
        alert.style.top = '15px'
    }else{
        let taskDueTime = new Date(dateInput.value + 'T' + timeInput.value)
        tasks.push(
            {
            name: titleInput.value.toUpperCase(), 
            status: 'Upcoming ⏰, Incomplete', 
            time: taskDueTime.toISOString()
        }
    )   
        localStorage.setItem('tasks', JSON.stringify(tasks))
        alertText.textContent = 'Task saved successfully 🎉. Click View Tasks button to view all tasks.'
        titleInput.value = ''
        dateInput.value = ''
        timeInput.value = ''
        main.classList.add('blur')
        alert.style.top = '15px'
    }
})


ok.addEventListener('click', () => {
    main.classList.remove('blur')
    alert.style.top = '-50%'
})

viewbtn.addEventListener('click', () => {
    let tasksSection = document.querySelector('.tasksSection')
    tasksSection.innerHTML = ''

    tasks.forEach((task, index) => {
        let taskStatus = getStatus(task)

        let taskDiv = document.createElement('div')
        taskDiv.className = 'task'

        let titleDiv = document.createElement('div')
        titleDiv.className = 'title'
        titleDiv.textContent = task.name
        taskDiv.appendChild(titleDiv)

        let dueTime = document.createElement('div')
        dueTime.className = 'dueTime'
        dueTime.textContent = new Date(task.time).toLocaleString()
        taskDiv.appendChild(dueTime)

        let statusDiv = document.createElement('div')
        statusDiv.className = 'status'
        statusDiv.textContent = taskStatus
        taskDiv.appendChild(statusDiv)

        let subButtonsDiv = document.createElement('div')
        subButtonsDiv.className = 'subButtons'

        let markComplete = document.createElement('button')
        markComplete.className = 'mark'
        markComplete.textContent = 'Mark as Completed'
        subButtonsDiv.appendChild(markComplete)

        markComplete.addEventListener('click', () => {
            task.status = 'Completed ✔'
            statusDiv.textContent = 'Completed ✔'
            localStorage.setItem('tasks', JSON.stringify(tasks))
        })

        let deleteTask = document.createElement('button')
        deleteTask.className = 'delete'
        deleteTask.textContent = 'Delete Task'
        subButtonsDiv.appendChild(deleteTask)

        deleteTask.addEventListener('click', () => {
            main.classList.add('blur')
            popup.style.transform = 'scale(1)'

            popupYes.addEventListener('click', () => {
                taskDiv.remove()
                popup.style.transform = 'scale(0)'
                main.classList.remove('blur')
                tasks.splice(index, 1)
                localStorage.setItem('tasks', JSON.stringify(tasks))

            })
            popupNo.addEventListener('click', () => {
                popup.style.transform = 'scale(0)'
                main.classList.remove('blur')
            })

        })

        taskDiv.appendChild(subButtonsDiv)
        tasksSection.appendChild(taskDiv)
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))
})


// function for comparing time
function getStatus(task){
    let currentTime = new Date()
    let taskDueTime = new Date(task.time)

    if(task.status === 'Completed ✔'){
        return 'Completed ✔'
    }else if(currentTime > taskDueTime){
        task.status = 'Expired 💀'

        return 'Expired 💀'
    }else if(
        currentTime.toDateString() === taskDueTime.toDateString() &&
        currentTime.getHours() === taskDueTime.getHours() &&
        currentTime.getMinutes() === taskDueTime.getMinutes()
    ){
        task.status = 'Now 🔔'
        return 'Now 🔔'
    }else{
        task.status = 'Upcoming ⏰, Incomplete'
        return 'Upcoming ⏰, Incomplete'
    }

}