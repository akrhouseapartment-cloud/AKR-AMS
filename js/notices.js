/* ==========================================
   AKR AMS - notices.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadNotices();

});

function loadNotices(){

    let notices =
        JSON.parse(localStorage.getItem("akrNotices")) || [];

    if(notices.length===0){

        console.log("Default notices loaded.");

        return;

    }

    const container=document.getElementById("noticeContainer");

    container.innerHTML="";

    notices.forEach(notice=>{

        container.innerHTML += `

        <div class="card">

        <h3>${notice.category}</h3>

        <p>${notice.message}</p>

        <small>${notice.date}</small>

        </div>

        `;

    });

}

const addNoticeBtn =
document.getElementById("addNoticeBtn");

if(addNoticeBtn){

addNoticeBtn.addEventListener("click",()=>{

alert("Add Notice module coming soon.");

});

}
