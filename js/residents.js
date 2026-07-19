document.addEventListener("DOMContentLoaded", () => {

loadResidents();

});

function loadResidents(){

const residents =
JSON.parse(localStorage.getItem("akrResidents")) || [];

const body =
document.getElementById("residentTableBody");

body.innerHTML="";

residents.forEach((r,index)=>{

body.innerHTML+=`

<tr>

<td>${r.flat}</td>

<td>${r.name}</td>

<td>${r.mobile}</td>

<td>${r.status||"Active"}</td>

<td>

<button onclick="deleteResident(${index})">

Delete

</button>

</td>

</tr>

`;

});

}

function deleteResident(index){

let residents=
JSON.parse(localStorage.getItem("akrResidents"))||[];

residents.splice(index,1);

localStorage.setItem(
"akrResidents",
JSON.stringify(residents)
);

loadResidents();

}

document
.getElementById("searchResident")
.addEventListener("input",function(){

const keyword=this.value.toLowerCase();

document
.querySelectorAll("#residentTableBody tr")
.forEach(row=>{

row.style.display=
row.innerText
.toLowerCase()
.includes(keyword)
?"":"none";

});

});
