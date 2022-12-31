const board = document.getElementById("game-board");
const start_btn = document.getElementById("start-btn");
const restart_btn = document.getElementById("restart-btn");

const local_storage = JSON.parse(localStorage.getItem("users"));
let users = local_storage ? local_storage : [];

let started = false;
let start;
let finish;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const email = urlParams.get("email") ? urlParams.get("email") : false;

if (!email) {
	window.location = "./index.html";
}
const username = email.substring(0, email.indexOf("@"));
const username_field = document.getElementById("username");
username_field.innerText = username;

start_btn.addEventListener("click", startGame);
restart_btn.addEventListener("click", restartGame);

let cards_array = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
let guesed = 0;
let gameStarted = false;

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

shuffleArray(cards_array);

function clear_board() {
	board.innerHTML = "";
}
function generate_board() {
	cards_array.forEach((element) => {
		const card = document.createElement("div");
		card.classList.add("card");
		card.setAttribute("data-id", element);

		const backing_img = document.createElement("img");
		backing_img.classList.add("backing");
		backing_img.src = `./src/backing.png`;

		card.appendChild(backing_img);

		const front_img = document.createElement("img");
		front_img.classList.add("front");
		front_img.src = `./src/${element}.png`;

		card.appendChild(front_img);

		board.appendChild(card);
	});
}

generate_board();

let prevFlipped;

board.addEventListener("click", (event) => {
	if (!event.target.classList.contains("backing")) {
		return;
	}

	if (!started) {
		return;
	}

	console.log(event.target);
	if (event.target.classList.contains("backing")) {
		event.target.classList.add("flipped");
	}

	setTimeout(() => {
		if (prevFlipped) {
			if (
				prevFlipped.parentElement.getAttribute("data-id") ==
				event.target.parentElement.getAttribute("data-id")
			) {
				prevFlipped.classList.add("guessed");
				event.target.classList.add("guesed");
				guesed++;
				console.log(guesed);
				prevFlipped = "";
				checkWin();
			} else {
				prevFlipped.classList.remove("flipped");
				event.target.classList.remove("flipped");
				prevFlipped = "";
			}
		} else {
			prevFlipped = event.target;
		}
	}, 800);
});

function startGame() {
	if (started) {
		return;
	}
	started = true;
	start = Date.now();
}

function restartGame() {
	if (!started) {
		return;
	}

	shuffleArray(cards_array);
	clear_board();
	generate_board();
	start = Date.now();
	hideWinnerScreen();
}

function checkWin() {
	if (guesed == 8) {
		finish = Date.now();
	} else {
		return;
	}

	const elapsed = finish - start;
	console.log(elapsed);
	users.forEach((usr) => {
		if (usr.email == email) {
			if (!usr.high_score || usr.high_score > elapsed) {
				usr.high_score = elapsed;
			}

			localStorage.setItem("users", JSON.stringify(users));

			showWinnerScreen(
				`Congratulations! You won. Elapsed time: ${Math.floor(
					elapsed / 60000
				)} . ${elapsed % 60} min`
			);
		}
	});
}

const winnerScreen = document.getElementById("winner-screen");

function showWinnerScreen(msg) {
	winnerScreen.innerText = msg;
	winnerScreen.classList.remove("hidden");
}

function hideWinnerScreen() {
	winnerScreen.classList.add("hidden");
}
