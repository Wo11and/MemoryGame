const board = document.getElementById("game-board");

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
