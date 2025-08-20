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

let tasks = []


addbtn.addEventListener('click', () => {
    let titleString = titleInput.value.toUpperCase()
    let foundTask = tasks.find(task => task.name === titleString)

    if(foundTask){
        alert.style.backgroundColor = 'rgb(255, 170, 170)'
        alertText.textContent = `Task "${titleInput.value}" already exists ⚠. Click View Tasks button to view all tasks.`
        titleInput.value = ''
        main.classList.add('blur')
        alert.style.top = '-1px'
    }else if(!titleInput.value.trim()){
        alert.style.backgroundColor = 'rgb(255, 170, 170)'
        alertText.textContent = 'Title must not be Empty or Space Only! ⚠'
        titleInput.value = ''
        main.classList.add('blur')
        alert.style.top = '-1px'
    }else{
        tasks.push({name: titleInput.value.toUpperCase(), status: 'Incomplete ✖'})
        alert.style.backgroundColor = 'rgba(174, 255, 174, 0.46)'
        alertText.textContent = 'Task added successfully 🎉. Click View Tasks button to view all tasks.'
        titleInput.value = ''
        main.classList.add('blur')
        alert.style.top = '-1px'
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
        let taskDiv = document.createElement('div')
        taskDiv.className = 'task'

        let titleDiv = document.createElement('div')
        titleDiv.className = 'title'
        titleDiv.textContent = task.name
        taskDiv.appendChild(titleDiv)

        let statusDiv = document.createElement('div')
        statusDiv.className = 'status'
        statusDiv.textContent = task.status
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

            })
            popupNo.addEventListener('click', () => {
                popup.style.transform = 'scale(0)'
                main.classList.remove('blur')
            })

        })

        taskDiv.appendChild(subButtonsDiv)
        tasksSection.appendChild(taskDiv)
    })
})