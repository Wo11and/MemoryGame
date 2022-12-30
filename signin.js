const local_storage = JSON.parse(localStorage.getItem("users"));
let users = local_storage ? local_storage : [];

class user {
	constructor(email, password) {
		this.email = email;
		this.password = password;
		this.high_score = 0;
	}
}

const login_btn = document.getElementById("login-btn");
login_btn.addEventListener("click", login);

function login() {
	const email = document.getElementById("email").value;
	const password = document.getElementById("passwd").value;

	users.forEach((usr) => {
		console.log(email);
		if (usr.email == email && usr.password == password) {
			console.log("a");
			alert("succes");
			window.location = `./index.html?email=${email}`;
		}
	});
}
