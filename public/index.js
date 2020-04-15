M.AutoInit(); // initialize all of the Materialize Components

window.onload = setToTomorrowsDate()

function setToTomorrowsDate(){
    var currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + 1)
    document.getElementById('date').value= currentDate.toISOString().substr(0,10);
}

form = document.getElementById('task-form')
form.addEventListener('submit',addTask)



function setEventListnersForNoteForms(){
    document.querySelectorAll('form').forEach(noteForm=>{
        if(noteForm.getAttribute('data-todoId')!== null){
            noteForm.addEventListener('submit',addNote)
        }
    })
}

function addNote(e){
    e.preventDefault()
    let note = e.target.children[0].value
    let notesList = e.target.parentNode.children[3]
    let li = document.createElement('li')
    li.textContent = note 
    notesList.appendChild(li)

    let todoId = e.target.children[0].getAttribute('data-todoId')
    e.target.children[0].value = ''
    addNoteToDatabase(todoId,note)
}

async function addNoteToDatabase(todoId,note){
    uri = `/todos/${todoId}/notes`
    await fetch(uri, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({note})
    })
}
//sorting buttons
dueAscdBtn = document.getElementById('due-ascd-btn')
dueDescBtn = document.getElementById('due-desc-btn')
priorityBtn = document.getElementById('priority-btn')
statusBtn = document.getElementById('status-btn')

dueAscdBtn.addEventListener('click', sortByDueAscending)
dueDescBtn.addEventListener('click', sortByDueDescending)
priorityBtn.addEventListener('click', sortByPriority)
statusBtn.addEventListener('click', sortByStatus)



function setEventListnersForCheckBoxes(){
    document.querySelectorAll('input[type=checkbox]')
        .forEach(checkBox=>checkBox.oninput = modifyCheckBoxStatus)
}
let modifyCheckBoxStatus = function(e){
    let todoId = e.target.getAttribute('data-todoId')    
    modifyCheckedValueInDatabase(todoId,e.target.checked)
}
async function modifyCheckedValueInDatabase(todoId,value){
    let uri = `/todos/${todoId}`
    await fetch(uri, { 
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({id:todoId,status:value})
    })
}


function setEventListnersForDue(){
        document.querySelectorAll('input[type=date]')
        .forEach(due=>{
            if(due.getAttribute('data-todoId')!==null)
                due.oninput = modifyDue
        })
}
let modifyDue = function(e){
    let todoId = e.target.getAttribute('data-todoId')    
    modifyDueValueInDatabase(todoId,e.target.value)
}
async function modifyDueValueInDatabase(todoId,value){
    let uri = `/todos/${todoId}`
    await fetch(uri, { 
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({id:todoId,due:value})
    })
}


function setEventListnersForPriority(){
    document.querySelectorAll('select')
        .forEach(due=>{
            if(due.getAttribute('data-todoId')!==null)
                due.oninput = modifyPriority
        })
}
let modifyPriority = function(e){
    let todoId = e.target.getAttribute('data-todoId')    
    modifyPriorityValueInDatabase(todoId,e.target.value)
}
async function modifyPriorityValueInDatabase(todoId,value){
    let uri = `/todos/${todoId}`
    await fetch(uri, { 
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({id:todoId,priority:value})
    })
}

