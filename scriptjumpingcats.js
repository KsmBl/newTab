//<div class="cat"></div>

function getRandomInt(max)
{
	return Math.floor(Math.random() * max);
}

const body = document.getElementById("body");

var catcount = 4;

for (let i = 0; i < catcount; i++) {
	body.innerHTML += "<img src='/images/cat.png' class='cat'/>"
}

let posX = [];
let posY = [];

let speedX = [];
let speedY = [];

const cats = document.getElementsByClassName("cat");

console.log(cats);

for (let i = 0; i < cats.length; i++) {
	posX[i] = 150 + getRandomInt(window.innerWidth - 300)
	posY[i] = 150 + getRandomInt(window.innerHeight - 300)

	speedX[i] = getRandomInt(10) + 1;
	speedY[i] = getRandomInt(10) + 1;
}

function updatePosition()
{
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;

	for (let i = 0; i < cats.length; i++) {
		posX[i] += speedX[i];
		posY[i] += speedY[i];

		if (posX[i] <= 0 || posX[i] >= windowWidth - cats[i].offsetWidth) {
			speedX[i] = -speedX[i];
		}

		if (posY[i] <= 0 || posY[i] >= windowHeight - cats[i].offsetHeight) {
			speedY[i] = -speedY[i];
		}
		
		cats[i].style.left = posX[i] + "px";
		cats[i].style.top = posY[i] + "px";
	}

	requestAnimationFrame(updatePosition);
}

updatePosition();
