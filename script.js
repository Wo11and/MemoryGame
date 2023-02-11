// get needed DOM elements
const board = document.getElementById("game-board");
const start_btn = document.getElementById("start-btn");
const restart_btn = document.getElementById("restart-btn");

//retrieve data from local storage
const local_storage = JSON.parse(localStorage.getItem("users"));
let users = local_storage ? local_storage : [];

const email = sessionStorage.getItem("activeUser");
const username = email.slice(0, email.indexOf("@"));
const username_field = document.getElementById("username");
username_field.innerText = username;

//time variables
let start;
let finish;

start_btn.addEventListener("click", startGame);
restart_btn.addEventListener("click", restartGame);

let cards_array = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
let guesed = 0;
let started = false;

function shuffleArray(array) {
	//shuffle the array by swaping every element with a random one over a  single itteration
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
	cards_array.forEach((element, index) => {
		const card = document.createElement("div");
		card.classList.add("card");
		card.setAttribute("data-id", index);

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

let prevFlipped; //the card lastly flipped face up if any

board.addEventListener("click", (event) => {
	if (!event.target.classList.contains("backing")) {
		return;
	}

	if (!started) {
		return;
	}

	//console.log(event.target);
	if (event.target.classList.contains("backing")) {
		event.target.classList.add("flipped");
	}

	setTimeout(() => {
		//add timeout so the cards dont't get flipped back immediately
		if (prevFlipped) {
			if (
				cards_array[prevFlipped.parentElement.getAttribute("data-id")] ==
				cards_array[event.target.parentElement.getAttribute("data-id")]
			) {
				prevFlipped.classList.add("guessed");
				event.target.classList.add("guesed");
				guesed++;
				checkWin();
			} else {
				prevFlipped.classList.remove("flipped");
				event.target.classList.remove("flipped");
			}
			prevFlipped = null;
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
	showTimer();
}

function restartGame() {
	if (!started) {
		return;
	}

	prevFlipped = null;
	guesed = 0;
	shuffleArray(cards_array);
	clear_board();
	generate_board();
	start = Date.now();
	showTimer();
	hideWinnerScreen();
}

function checkWin() {
	if (guesed == 8) {
		finish = Date.now();
	} else {
		return;
	}

	const elapsed = finish - start;
	//console.log(elapsed);
	users.forEach((usr) => {
		if (usr.email == email) {
			if (usr.high_score == 0 || usr.high_score > elapsed) {
				usr.high_score = elapsed;
			}

			localStorage.setItem("users", JSON.stringify(users));
			hideTimer();
			console.log(elapsed);
			showWinnerScreen(
				`Congratulations! You won. Elapsed time: ${Math.floor(
					elapsed / 60000
				)} . ${Math.floor((elapsed / 1000) % 60)} min`
			);
		}
	});
}

const winnerScreen = document.getElementById("winner-screen");
const timer = document.getElementById("timer-icon");

function showWinnerScreen(msg) {
	winnerScreen.innerText = msg;
	winnerScreen.classList.remove("hidden");
}

function hideWinnerScreen() {
	winnerScreen.classList.add("hidden");
}

function showTimer() {
	timer.classList.remove("hidden");
}

function hideTimer() {
	timer.classList.add("hidden");
}
