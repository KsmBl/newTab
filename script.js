//change IP and PORT (remember to change the Port on the config file for the backend too)
const IP = "http://12.345.67.890:1234"

function openurl(url)
{
	window.location.href = "//" + url;
}

function extractDomain(url) {
	var domain;
	var index = url.indexOf("://") + 3;
	index = url.indexOf("/", index);
	if (index !== -1) {
		domain = url.substring(0, index);
	} else {
		domain = url;
	}
	return domain;
}

async function post(endpoint, data = {})
{
	const response = await fetch(`${IP}/${endpoint}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	return await response.json();
}

async function get(endpoint)
{
	const response = await fetch(`${IP}/${endpoint}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return await response.json();
}

function searchGoogle()
{
	var query = document.getElementById('searchInput').value;

	if (query == "chat") {
		openurl("chat.openai.com");
		return
	} else if (query == "google") {
		openurl("google.de");
		return
	} else if (query == "yt") {
		openurl("youtube.de");
		return
	} else if (query == "regex") {
		openurl("regex101.com");
		return
	}

	var searchUrl = 'google.com/search?q=' + encodeURIComponent(query);
	openurl(searchUrl);
	return
}

document.getElementById("searchInput").addEventListener("keypress", function(event)
{
	if (event.keyCode === 13) {
		searchGoogle();
	}
});

function handleMousePosition(event)
{
	var screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

	var mouseY = event.clientY;

	if (mouseY >= (screenHeight * 0.90)) {
		var settingsbar = document.getElementById('settingsbar');
		settingsbar.classList.remove('hidden');
	} else {
		var settingsbar = document.getElementById('settingsbar');
		settingsbar.classList.add('hidden');
	}
}

function reloadPage()
{
	location.reload();
}

async function newIcon()
{
	var name = prompt("Name:", "");
 	if (name == null || name.trim() == "") {
		return 1;
	}

	var url = prompt("URL:", "");

 	if (url !== null && url.trim() !== "") {
		const icon = {
			"name" : name,
			"url" : url
		}

		console.log(await post("postshortcut", icon))
		reloadPage();
	} else {
		alert("url empty");
		return;
	}
}

async function removeIcon()
{
	var name = prompt("Name:", "");
 	if (name == null || name.trim() == "") {
		return;
	}

	var sure = prompt(`are you sure? Do you want to delete: ${name}? (y|N)`, "");

 	if (sure == "y" || sure.trim() == "Y") {
		console.log(await post("removeshortcut", name))
		reloadPage();
	} else {
		alert("canceld");
	}
}

async function getIcons()
{
	const shortcuts = await get("getshortcuts");
	var itembox = document.getElementById("itembox");

	for (let i = 0; i < shortcuts.length; i++) {
		var io = shortcuts[i]; //io = i-object
		itembox.innerHTML +=	`<div class="icon" onclick="openurl('${io.url}')">
						<img src="https://icon.horse/icon/${extractDomain(io.url)}"/>
						<p> ${io.name} </p>
					</div>`;
	}
}

async function start()
{
	getIcons();
	document.getElementById("searchInput").focus();
	document.addEventListener('mousemove', handleMousePosition);
}

start();
