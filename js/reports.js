document.addEventListener("DOMContentLoaded", () => {

const data =
JSON.parse(localStorage.getItem("akrMaintenance")) || [];

let total = 0;
let pending = 0;
let paidCount = 0;
let pendingCount = 0;

const table =
document.getElementById("reportTable");

table.innerHTML = "";

data.forEach(item => {

table.innerHTML += `
<tr>
<td>${item.flat}</td>
<td>${item.owner}</td>
<td>₹${item.amount}</td>
<td>${item.status}</td>
</tr>
`;

if(item.status==="Paid"){
total += Number(item.amount);
paidCount++;
}else{
pending += Number(item.amount);
pendingCount++;
}

});

document.getElementById("totalCollection").textContent="₹"+total;
document.getElementById("pendingAmount").textContent="₹"+pending;
document.getElementById("paidFlats").textContent=paidCount;
document.getElementById("pendingFlats").textContent=pendingCount;

});

document.getElementById("exportCSV").addEventListener("click",()=>{

alert("CSV Export feature coming in next version.");

});
