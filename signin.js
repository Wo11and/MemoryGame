//retrieve data from local storage
const local_storage = JSON.parse(localStorage.getItem("users"));
let users = local_storage ? local_storage : [];

const login_btn = document.getElementById("login-btn");
login_btn.addEventListener("click", login);

function login() {
	const email = document.getElementById("email").value;
	const password = document.getElementById("passwd").value;

	let succes = false;
	users.forEach((usr) => {
		console.log(email);
		if (usr.email == email && usr.password == password) {
			succes = true;
			sessionStorage.setItem("activeUser", usr.email);
			window.location.replace("./game.html");
		}
	});

	if (!succes) {
		showError("User password combination not found");
	}
}

const error = document.getElementById("error");
function showError(msg) {
	error.innerText = msg;
	error.classList.remove("hidden");
}
