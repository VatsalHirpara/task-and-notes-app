const taskList = document.getElementById('task-list')
const title = document.getElementById('title')
const description = document.getElementById('description')
const date = document.getElementById('date')
const priority = document.getElementById('priority')

document.addEventListener('DOMContentLoaded', loadTasks())
async function loadTasks(){
    let tasks = await getTodos()
    if(tasks.length===0) return
    tasks = tasks.map(todo=>createLiElement(todo))
    tasks.forEach(task=> {
        taskList.appendChild(task)
    });
    setEventListnersForNoteForms()
    setEventListnersForCheckBoxes()
    setEventListnersForDue()
    setEventListnersForPriority()
}

async function getTodos() {
    const resp = await fetch('http://127.0.0.1:3000/todos/', { method: 'GET' })
    const todos = await resp.json()
    return todos
}

async function addTask(e){
    e.preventDefault()
    let todo = {
        title: title.value ,
        description:description.value,
        due:date.value,
        priority: priority.value,
        status: false
    }
    let res = await addTaskToDatabase(todo)
    todo.id= res.data.id 
    todoLi = createLiElement(todo)
    taskList.appendChild(todoLi);
    title.value = description.value = ''
    priority.options.selectedIndex = 2
    setToTomorrowsDate()

    setEventListnersForNoteForms()
    setEventListnersForCheckBoxes()
    setEventListnersForDue()
    setEventListnersForPriority()
}

async function addTaskToDatabase(todo){
    let res = await fetch('/todos/', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    return res.json()
}

function createLiElement(todo){
    let status = todo.status ? 'checked':''
    let priority = todo.priority
    let low='',medium='',high=''
    if(priority==='low') low = 'selected'
    if(priority==='medium') medium = 'selected'
    if(priority==='high') high = 'selected'
    let description = todo.description
    if(description===null || description===undefined) description=''

    let notes = todo.notes
    if(notes===null || notes===undefined) notes=''
    else {
        notes = notes.split(',')
        notes = notes.map((note)=>`<li>${note}</li>`)
        notes = notes.join('')
    }
    
    let liHTML = 
    `
    <div class="collapsible-header">
        <label>
                <input type="checkbox" data-todoId="${todo.id}" ${status}><span></span>
        </label>
            ${todo.title}<i class="material-icons">expand_more</i>
        <div class="input-field col l3" style="margin: 0;">
            <input type="date" name="date" data-todoId="${todo.id}" value="${todo.due.substr(0,10)}" style="height: 35px;" required>
        </div>
        <div class="input-field col" style="margin: 0;" >
            <select class="browser-default" data-todoId="${todo.id}" style="margin: 0;height: 35px; border: none;">
                <option disabled>Priority</option>
                <option value="low" ${low}>Low</option>
                <option value="medium" ${medium}>Medium</option>    
                <option value="high" ${high}>High</option>
                <label for="priority">Priority</label>
            </select>
        </div>
    </div>
    <div class="collapsible-body">
        <div style="margin-bottom: 1em;">Description : ${description}</div>
            <form data-todoId="${todo.id}">
                <input type="text" data-todoId="${todo.id}" name="title" required placeholder="Enter note here" class="col l7" style="height: 2em;margin-right: 1em;">
                <button data-todoId="${todo.id}" class="btn waves-effect blue darken-2 btn-small" type="submit">Add note</button>   
            </form>
        <h6>Notes:</h6>
        <ul style="margin-top:1em;" data-todoId="${todo.id}">
            ${notes}
        </ul>
    </div>  
    `
    
    let li = document.createElement('li')
    li.innerHTML = liHTML
    return li
}