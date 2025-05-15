//Creates an array from the local storages OR does empty arrays if nothing is stored in the list nor the admin commands
let sList = JSON.parse(localStorage.getItem("student")) || []
let pList = JSON.parse(localStorage.getItem("purpose")) || []

addNewRow();
addNewToAdminList();

function addToQueue(event) {
	event.preventDefault(); //Stops the website from refreshing after submission
	let student = document.getElementById("studentName");
	let studentname = student.value.trim();
	let purpose = document.getElementById("studentPurpose");
	let studentpurpose = purpose.value;

	if (studentname === "") {
		alert("Please enter a name.");
		return;
	}

	if (studentpurpose === "") {
		alert("Please enter your purpose.");
		return;
	}

	if (sList.includes(studentname)) {
		alert("This name is already in the list.");
		return;
	}

	sList.push(studentname);
	pList.push(studentpurpose);
	localStorage.setItem("student", JSON.stringify(sList)); // Save to localStorage
	localStorage.setItem("purpose", JSON.stringify(pList)); // Save to localStorage

	student.value = "";
	purpose.value = "";
	addNewRow();
	addNewToAdminList();
}

function addNewToAdminList(){
	const adminList = document.getElementById("adminList");
	adminList.innerHTML = ""

	for (let j = 0; j < sList.length; j++) {
		//Makes an entry for the list
		const adlist = document.createElement("li");
		adlist.textContent = (j + 1) + ". " + sList[j] + " - " + pList[j];

		//Makes a remove button for every entries in the list
		const removebtn = document.createElement("button");
		removebtn.textContent = "Remove";
		removebtn.className = "remove-btn";
		removebtn.onclick = function() {
		removeEntry(j);
		};

		//Attach the remove button to the entry
		adlist.appendChild(removebtn);

		//Attach entries into the actual id
		adminList.appendChild(adlist);
	}
}

function removeEntry(index) {
	//Remove the names and corresponding purposes
	sList.splice(index, 1);
	pList.splice(index, 1);

	//Updates the list after removal, and then stringifys the sList and pList into strings in order to be saved in local storage
	localStorage.setItem("student", JSON.stringify(sList));
	localStorage.setItem("purpose", JSON.stringify(pList));
	addNewRow();
	addNewToAdminList();
}

function addNewRow() {
	const tableBody = document.getElementById("queueData");
	tableBody.innerHTML = ""; // Clear old data

	//Creates a new row in the table everytime a new set of data is received
	for (let i = 0; i < sList.length; i++) {
		let row = "<tr>" +
		"<td>" + (i + 1) + "</td>" +
		"<td>" + sList[i] + "</td>" +
		"<td>" + pList[i] + "</td>" +
		"</tr>";
		tableBody.innerHTML += row;
	}
}