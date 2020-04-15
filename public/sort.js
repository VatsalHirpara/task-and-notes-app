function sortByDueAscending(){
    let tasks = document.getElementById('task-list')    
    var tasksArr = Array.prototype.slice.call(tasks.children);  
    tasksArr.sort((l1,l2)=>{
            return (new Date(getDueDate(l1))) - (new Date(getDueDate(l2)))
    });
    for (i=0; i < tasksArr.length; i++) tasks.appendChild(tasksArr[i]);
}

function sortByDueDescending(){
    let tasks = document.getElementById('task-list')    
    var tasksArr = Array.prototype.slice.call(tasks.children);  
    tasksArr.sort((l1,l2)=>{
            return (new Date(getDueDate(l2))) - (new Date(getDueDate(l1)))
    });
    for (i=0; i < tasksArr.length; i++) tasks.appendChild(tasksArr[i]);
}

function getDueDate(li){
    return li.children[0].children[2].children[0].value
}

function sortByPriority(){
    let tasks = document.getElementById('task-list')    
    var tasksArr = Array.prototype.slice.call(tasks.children);  

    tasksArr.sort((l1,l2)=>{
            return getPriority(l2) - getPriority(l1)
    });
    for (i=0; i < tasksArr.length; i++) tasks.appendChild(tasksArr[i]);
}

function getPriority(li){
    let PriorityeEnum = {"low" : 1, "medium": 2,"high": 3}
    let priority =  li.children[0].children[3].children[0].value
    return PriorityeEnum[priority]
}

function sortByStatus(li){
    let tasks = document.getElementById('task-list')    
    var tasksArr = Array.prototype.slice.call(tasks.children);  

    tasksArr.sort((l1,l2)=>{
            return getStatus(l1) - getStatus(l2)
    });
    for (i=0; i < tasksArr.length; i++) tasks.appendChild(tasksArr[i]);
}

function getStatus(li){
    return li.children[0].children[0].children[0].checked
}