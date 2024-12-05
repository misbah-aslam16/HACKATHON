const container = document.getElementById('container');
const registerBtn = document.getElementById('showRegister');
const loginBtn = document.getElementById('showLogin');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

function register() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if (!name.value || !email.value || !password.value) {
        Swal.fire("All fields are required!");
        return;
    }
}

function login() {
    const email = document.getElementById("s-email");
    const password = document.getElementById("s-password");

    if (!email.value || !password.value) {
        Swal.fire("Please enter both email and password!");
        return;
    }
}