//retrieve data from local sorage
const local_storage = JSON.parse(localStorage.getItem("users"));
let users = local_storage ? local_storage : [];

class user {
	constructor(email, password) {
		this.email = email;
		this.password = password;
		this.high_score = 0;
	}
}

const succesBanner = document.getElementById("succes");
const signup_btn = document.getElementById("signup-btn");
signup_btn.addEventListener("click", register);

function register() {
	const email = document.getElementById("email").value;
	const password = document.getElementById("passwd").value;

	// Validate input fields
	if (
		!validate_email(email) ||
		!validate_password(password) ||
		!validate_field(password) ||
		!validate_field(email)
	) {
		showError("Invalid email or password!");
		return;
	}

	let flag = true;
	users.forEach((usr) => {
		if (usr.email == email) {
			showError("User exists!");
			flag = false;
			return;
		}
	});

	if (!flag) {
		return;
	}

	let to_add = new user(email, password);
	users.push(to_add);
	localStorage.setItem("users", JSON.stringify(users));
	succesBanner.classList.remove("hidden");
	setTimeout(() => {
		succesBanner.classList.add("hidden");
	}, 2000);
}

// Validate Functions
function validate_email(email) {
	const expression = /^[^@]+@\w+(\.\w+)+\w$/;
	if (expression.test(email) == true) {
		return true;
	} else {
		return false;
	}
}

function validate_password(password) {
	if (password < 6) {
		return false;
	} else {
		return true;
	}
}

function validate_field(field) {
	if (field == null) {
		return false;
	}

	if (field.length <= 0) {
		return false;
	} else {
		return true;
	}
}

const error = document.getElementById("error");
function showError(msg) {
	error.innerText = msg;
	error.classList.remove("hidden");
}
