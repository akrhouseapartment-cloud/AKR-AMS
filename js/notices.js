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


// ----------------------------
// Search & Filter Notices
// ----------------------------

const searchNotice =
document.getElementById("searchNotice");

const noticeFilter =
document.getElementById("noticeFilter");

function filterNotices(){

    const keyword =
    searchNotice.value.toLowerCase().trim();

    const category =
    noticeFilter.value;

    const cards =
    document.querySelectorAll(".card");

    cards.forEach((card)=>{

        const title =
        card.querySelector("h3")
        ?.textContent.toLowerCase() || "";

        const content =
        card.querySelector("p")
        ?.textContent.toLowerCase() || "";

        const priority =
        card.dataset.priority || "normal";

        const searchMatch =
            title.includes(keyword) ||
            content.includes(keyword);

        const filterMatch =
            category==="all" ||
            priority===category;

        card.style.display =
            searchMatch && filterMatch
            ? "block"
            : "none";

    });

}

if(searchNotice){

    searchNotice.addEventListener(
        "input",
        filterNotices
    );

}

if(noticeFilter){

    noticeFilter.addEventListener(
        "change",
        filterNotices
    );

}
