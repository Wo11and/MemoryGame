const local_storage = JSON.parse(localStorage.getItem("users"));
let users = local_storage ? local_storage : [];

function sortByTime(a, b) {
	if (a.high_score < b.high_score) {
		return -1;
	} else {
		return 1;
	}
}

users.sort(sortByTime);
const ranking = document.getElementById("ranking");

for (let i = 0; i < Math.min(users.length, 5); i++) {
	const li = document.createElement("li");
	const username = document.createElement("span");
	username.innerText = users[i].email;

	const score = document.createElement("span");
	score.innerText = `${Math.floor(users[i].high_score / 60000)} . ${
		users[i].high_score % 60
	} min`;

	li.appendChild(score);
	li.appendChild(username);

	ranking.appendChild(li);
}
