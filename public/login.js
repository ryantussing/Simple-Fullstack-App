const $loginForm = document.getElementById('login')
const $logoutButton = document.getElementById('logout-button')

$loginForm.onsubmit = login

loginMessage()

$logoutButton.onclick = () => {
    localStorage.setItem('loggedIn', false)
    localStorage.setItem('usernameLocal', null)
    localStorage.setItem('currentUserID', null)
    // console.log("Logout button clicked.")
    // console.log(localStorage.getItem('loggedIn'))
    loginMessage(localStorage.getItem('loggedIn'))
}

function login(e) {
    if (localStorage.getItem('loggedIn') == "true") {
        alert("A user is already logged in!")
    } else if (localStorage.getItem('loggedIn') == "false") {
        e.preventDefault()
        const payload = {
            body: JSON.stringify({
                username: document.getElementById("username").value,
                password: document.getElementById("password").value
            }),
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch("/login", payload)
            .then(res => res.json())
            .then(res => {
                loggedIn = res.loggedIn
                message = res.message
                newUser = res.newUser
                userID = res.userID
                username = res.username
                console.log(res)
                // In this if statement: need to add an if statement that determines whether or not a user is new or existing...
                // ... in order to propersly decalre the userID variable (userID vs. userID.id)
                if (loggedIn) {
                    localStorage.setItem('loggedIn', true)
                    localStorage.setItem('usernameLocal', username)
                    if (newUser) {
                        localStorage.setItem('currentUserID', userID)
                        // console.log("The following two .logs are result of newUser:")
                        // console.log(typeof localStorage.getItem('currentUserID')+" "+localStorage.getItem('currentUserID'))
                        // console.log(userID)
                    } else if (!newUser) {
                        localStorage.setItem('currentUserID', userID.id)
                        // console.log("The following two .logs are result of !newUser:")
                        // console.log(typeof localStorage.getItem('currentUserID')+" "+localStorage.getItem('currentUserID'))
                        // console.log(userID.id)
                    } else {console.error()}
                } else {
                        alert(message)
                    }
                loginMessage()
                $loginForm.reset()
            })
            .catch(error => console.error(error))
    } else {console.error()}
}

function loginMessage() {
    // console.log("loginMessage() was called.")
    if (localStorage.getItem('loggedIn') == "true") {
        // console.log("if loginMessage() was called.")
        $loginForm.innerHTML = `
            <section id="form-section">
                <div id="form-labels">
                    <label for="username">Username: </label>
                    <input type="text" name="username" id="username" />
                    <br />
                    <label for="password">Password: </label>
                    <input type="password" name="password" id="password" />
                </div>
                <div id="formInput">
                    <input type="submit" value="Login / Create Account" />
                </div>
            </section> `
        localStorage.setItem('loginSuccessHTML', `<section id="login-success-message-HTML" class="login-message">
                *Successfully logged in as ${localStorage.getItem('usernameLocal')}!*<br />Return to the main page.</section>`)
        $loginForm.innerHTML = $loginForm.innerHTML + localStorage.getItem('loginSuccessHTML')
    } else if (localStorage.getItem('loggedIn') == "false") {
        // console.log("else if loginMessage() was called.")
        $loginForm.innerHTML = `
            <section id="form-section">
                <div id="form-labels">
                    <label for="username">Username: </label>
                    <input type="text" name="username" id="username" />
                    <br />
                    <label for="password">Password: </label>
                    <input type="password" name="password" id="password" />
                </div>
                <div id="formInput">
                    <input type="submit" value="Login / Create Account" />
                </div>
            </section> `
        localStorage.setItem('loginSuccessHTML', ``)
        $loginForm.innerHTML = $loginForm.innerHTML + localStorage.getItem('loginSuccessHTML')
    } else {console.log("The else statement was called within loginMessage().")}
}