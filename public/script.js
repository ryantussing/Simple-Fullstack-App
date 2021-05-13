const $header = document.querySelector('header#main-header')
const $content = document.getElementById('main#content')
const $footer = document.getElementById('footer#main-footer')
const $addTaskMain = document.getElementById('add-task-main')
const $addListMain = document.getElementById('add-list-main')
const $addTaskList = document.getElementById('add-task-list')
const $taskArea = document.getElementById('task-area')
const $taskWriter = document.getElementById('task-writer')
const $inputArea = document.getElementById('input-area')
const $logoutButton = document.getElementById('logout-button')
const $soloDelete = document.getElementById('solo-tasks-delete-button')

$logoutButton.onclick = () => {
    localStorage.setItem('loggedIn', false)
    localStorage.setItem('usernameLocal', null)
    localStorage.setItem('currentUserID', null)
    loadTasks(localStorage.getItem('loggedIn'))
}

$addTaskMain.onclick = () => {addTasks(localStorage.getItem('loggedIn'))}
// $addListMain.onclick = () => {addLists(localStorage.getItem('loggedIn'))}

loadTasks(localStorage.getItem('loggedIn'))

function loadTasks(loggedIn) {
    // console.log(typeof loggedIn+" loggedIn was passed into loadTasks() as: "+loggedIn)
    if (loggedIn == "true") {
        // e.preventDefault()
        fetch("/loadTasks")
            .then(res => res.json())
            // ERROR happens because new_user on server.js does not have  a true or false value once the server is started
            .then(res => {
                $taskArea.innerHTML = ""
                const soloTasksHTML = res.map( solo_tasks => `
                    <div id="${solo_tasks.id}" class="solo-task">
                        <p class="solo-tasks-content-container">${solo_tasks.content}</p>
                        <button class="solo-tasks-delete-button" id="solo-tasks-delete-button-${solo_tasks.id}" 
                        onclick="removeTasks(${solo_tasks.id})" value="${solo_tasks.id}">X</button>
                    </div>
                `).join("")
                $taskArea.innerHTML = $taskArea.innerHTML + soloTasksHTML
                // console.log("loadTasks() was called and loggedIn was true.")
            })
    } else if (loggedIn == "false") {
        $taskArea.innerHTML = ""
        const taskAreaLoginMessageHTML = `<div id="task-area-login-message-html" class="task-area-login-message">
            Logged out! No tasks available! Login to start adding tasks!</div>`
        $taskArea.innerHTML = $taskArea.innerHTML + taskAreaLoginMessageHTML
        // console.log("loadTasks() was called and loggedIn was false.")
        }   else {
                console.error()
            }
}

function addTasks(loggedIn) {
    if (loggedIn == "false") {
        alert("not logged in")
    } else if (loggedIn == "true") {
        const payload = {
            body: JSON.stringify({
                content: document.getElementById("input-area").value,
                user_id: localStorage.getItem('currentUserID')
            }),
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch("/addTasks", payload)
            .then(res => res.json())
            .then(res => {
                loadTasks(localStorage.getItem('loggedIn'))
                if (res.tooShort) {
                    alert(res.message)
                }
                $inputArea.value = ''
            })
            .catch(error => console.error(error))
    } else {console.error()}
}

function removeTasks(idOfTaskToBeDeleted) {
    // console.log("removeTasks() was called.")
    const payload = {
        body: JSON.stringify({
            solo_task_id: idOfTaskToBeDeleted
        }),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch("/removeTasks", payload)
        .then(res => res.json())
        .then(res => {
            loadTasks(localStorage.getItem('loggedIn'))
            // console.log(res.message)
        })
        .catch(error => console.error(error))
}

// function addLists(loggedIn) {
//     if (loggedIn == "false") {
//         alert("not logged in")
//     } else if (loggedIn == "true") {
//         const payload = {
//             body: JSON.stringify({
//                 title: document.getElementById("input-area").value,
//                 user_id: localStorage.getItem('currentUserID')
//             }),
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         }
//         fetch("/addLists", payload)
//             .then(res => res.json())
//             .then(res => {
//                 loadLists(localStorage.getItem('loggedIn'))
//                 if (res.tooShort) {
//                     alert(res.message)
//                 }
//                 $inputArea.value = ''
//             })
//             .catch(error => console.error(error))
//     } else {console.error()}
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
- POSSIBLE IDEAS: 
    - create a database table linking all solo_tasks/lists titled "order", and as each element is added it is given an
    increasing int value that can then be used to sort the order in which elements were added
    - add animations and shadows to elements
*/