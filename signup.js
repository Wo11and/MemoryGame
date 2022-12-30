const local_storage = JSON.parse(localStorage.getItem("users"));
let users = local_storage ? local_storage : [];

class user {
	constructor(email, password) {
		this.email = email;
		this.password = password;
		this.high_score = 0;
	}
}

const signup_btn = document.getElementById("signup-btn");
signup_btn.addEventListener("click", register);

const login_btn = document.getElementById("login-btn");
login_btn.addEventListener("click", login);

// Set up our register function
function register() {
	// Get all our input fields
	const email = document.getElementById("email").value;
	const password = document.getElementById("passwd").value;

	// Validate input fields
	if (validate_email(email) == false || validate_password(password) == false) {
		alert("Email or Password invalid");
		return;
		// Don't continue running the code
	}

	let flag = true;
	users.forEach((usr) => {
		if (usr.email == email) {
			alert("User exists!");
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
}

// Validate Functions
function validate_email(email) {
	const expression = /^[^@]+@\w+(\.\w+)+\w$/;
	if (expression.test(email) == true) {
		// Email is good
		return true;
	} else {
		// Email is not good
		return false;
	}
}

function validate_password(password) {
	// Firebase only accepts lengths greater than 6
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
