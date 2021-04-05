const $header = document.querySelector('header#main-header')
const $content = document.getElementById('main#content')
const $footer = document.getElementById('footer#main-footer')
const $addTaskMain = document.getElementById('add-task-main')
const $addListMain = document.getElementById('add-list-main')
const $addTaskList = document.getElementById('add-task-list')
const $taskArea = document.getElementById('task-area')
const $inputArea = document.getElementById('input-area')

// $addTaskMain.onclick = () => {alert("'add task main' clicked")}
// $addTaskMain.onclick = createTask()
// $addListMain.onclick = createList()

addTasks()

function addTasks() {

    fetch("/")
        .then(res => res.json())
        .then(solo_tasks => {
            const soloTasksHTML = contentArray().solo_tasks.map( task => `
                <div id="${task.id}" class="solo-task" >${task.content}</div>
            `).join("")
            $taskArea.innerHTML = $taskArea.innerHTML + soloTasksHTML
        })
    // fetch("/lists")
    //     .then(res => res.json())
    //     .then(lists => {
    //         const listsHTML = contentArray().lists.map ( list => `
    //         <div id="${list.id}" class="list">
    //             ${list.title}: <input type="text" id="add-list-task-input${+ list.id}"> <button type="button" id="add-list-task-button${+ list.id}">Add Task</button>
    //             ${list_tasks.map( ltask => `
    //                 <div id="${ltask.id}" class="list-task">
    //                     ${ltask.content}
    //                 </div>
    //             `).join("")}
    //             </div>
    //     `).join("")
    //         $taskArea.innerHTML = $taskArea.innerHTML + listsHTML
    //     })
    

    // const soloTasksHTML = contentArray().solo_tasks.map( task => `
    //     <div id="${task.id}" class="solo-task" >${task.content}</div>
    // `).join("")
    // const listsHTML = contentArray().lists.map ( list => `
    //     <div id="${list.id}" class="list">
    //         ${list.title}: <input type="text" id="add-list-task-input${+ list.id}"> <button type="button" id="add-list-task-button${+ list.id}">Add Task</button>
    //         ${list.list_tasks.map( ltask => `
    //             <div id="${ltask.id}" class="list-task">
    //                 ${ltask.content}
    //             </div>
    //         `).join("")}
    //         </div>
    // `).join("")
    // $taskArea.innerHTML = $taskArea.innerHTML + soloTasksHTML + listsHTML
}

// function createTask(e) {
//     e.preventDefault()
//     const payload = {
//         body: JSON.stringify({
//             text: document.getElementById("input-area").value
//         }),
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         }
//     }
//     fetch("/solotasks", payload)
//         .then(res => res.json())
//         .then(res => console.log(res.body))
//         .catch(error => console.error(error))
// }

// function createList(e) {
//     e.preventDefault()
//     const payload = {
//         body: JSON.stringify({
//             text: document.getElementById("input-area").value
//         }),
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         }
//     }
//     fetch("/lists", payload)
//         .then(res => res.json())
//         .then(res => console.log(res.body))
//         .catch(error => console.error(error))
// }

function contentArray() {
    // IDs WILL CHANGE TO ACCEPT VALUES FROM THE DATABASE
    return {
        solo_tasks : 
        [
            {
                "id" : 1 ,
                "content" : "-- Do homework"
            },
            {
                "id" : 2 ,
                "content" : "-- Don't do homework"
            }
        ],
        lists : 
        [
            {
                "id" : 1,
                "title" : "Activities",
                list_tasks : [
                    {
                        "id" : 1,
                        "content" : "-- Run"
                    },
                    {
                        "id" : 2,
                        "content" : "-- Walk"
                    },
                    {
                        "id" : 3,
                        "content" : "-- Swim"
                    }
                ]
                
            }
        ]
    }
}

/* 
- continue creating the javascript funtion that adds tasks and task lists to the page
- create classes to link styling to elements in js

- POSSIBLE IDEAS: 
    - create a database table linking all solo_tasks/lists titled "order", and as each element is added it is given an
    increasing int value that can then be used to sort the order in which elements were added
    - add animations and shadows to elements
    - make the header a nav bar? so that you can click on things
*/