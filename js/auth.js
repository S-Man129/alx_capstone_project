function showLoginForm() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registrationForm").style.display = "none";
    clearRegistrationForm();
    clearLoginForm();
}

function showRegistrationForm() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registrationForm").style.display = "block";
    clearLoginForm();
    clearRegistrationForm();
}

function clearLoginForm() {
    document.getElementById("loginUsername").value = "";
    document.getElementById("loginPassword").value = "";
    document.getElementById("loginMessage").innerText = "";
}

function clearRegistrationForm() {
    document.getElementById("registerUsername").value = "";
    document.getElementById("registerEmail").value = "";
    document.getElementById("registerPassword").value = "";
    document.getElementById("registerMessage").innerText = "";
}

function login() {
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;
    const success = document.getElementById("loginRegSuccess");

    if (username === '' || password === '') {
        document.getElementById("loginMessage").innerText = "Please fill in all fields.";
        return;
    }

    if (localStorage.getItem(username) === password) {
        success.style.visibility = "visible";
        success.innerText = "Login Successful";
        success.style.transition = "ease-in-out 2s;"
        clearLoginForm();

        // Save the username to localStorage
        localStorage.setItem('username', username);

        showDashboard();
    } else {
        document.getElementById("loginMessage").innerText = "User not found";
    }
}


function register() {
    const username = document.getElementById("registerUsername").value.trim();
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const success = document.getElementById("loginRegSuccess");

    if (username === '' || email === '' || password === '') {
        document.getElementById("registerMessage").innerText = "Please fill in all fields.";
        return;
    }

    if (localStorage.getItem(username) === null) {
        localStorage.setItem(username, password);
        success.style.visibility = "visible";
        success.innerText = "Registration Successful";
        clearRegistrationForm();
        showLoginForm();
    } else {
        document.getElementById("registerMessage").innerText = "User already exists";
    }
}

function showDashboard() {
    
    setTimeout(function() {
        window.location.replace("dashboard.html");
    }, 2000);
}