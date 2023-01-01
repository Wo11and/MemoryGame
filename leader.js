const local_storage = JSON.parse(localStorage.getItem("users")); //get local storage contents
let users = local_storage ? local_storage : []; //save contents to users array if any

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
	//print the first 5 players or all if there are less
	if (users[i].high_score == 0) {
		//ignore players without score
		continue;
	}
	const li = document.createElement("li"); //<li><span>username</span><span>score</span></li>
	const username = document.createElement("span");
	username.innerText = users[i].email;

	const score = document.createElement("span");
	score.innerText = `${Math.floor(users[i].high_score / 60000)} . ${Math.floor(
		(users[i].high_score / 1000) % 60
	)} min`;

	li.appendChild(score);
	li.appendChild(username);

	ranking.appendChild(li);
}
