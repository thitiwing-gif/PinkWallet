// โหลดข้อมูลจาก Local Storage
let balance = Number(localStorage.getItem("balance")) || 10000;

let history = JSON.parse(localStorage.getItem("history")) || [
    "💰 เริ่มต้นระบบ ฿10,000"
];

let hideBalance = false;

function saveData(){
    localStorage.setItem("balance", balance);
    localStorage.setItem("history", JSON.stringify(history));
}

function updateUI(){

    document.getElementById("balance").innerHTML =
        hideBalance ? "฿••••••" : "฿" + balance.toLocaleString("th-TH") + ".00";

    const list = document.getElementById("historyList");

    list.innerHTML="";

    history.slice().reverse().forEach(item=>{

        list.innerHTML += `<li>${item}</li>`;

    });

    saveData();

}

function toggleBalance(){

    hideBalance=!hideBalance;

    updateUI();

}

function deposit(){

    balance+=100;

    history.push("➕ ฝาก +100 บาท");

    updateUI();

}

function withdraw(){

    balance-=100;

    history.push("➖ ถอน -100 บาท");

    updateUI();

}

function transfer(){

    balance-=50;

    history.push("↗️ โอน -50 บาท");

    updateUI();

}

function receive(){

    balance+=50;

    history.push("📥 รับ +50 บาท");

    updateUI();

}

document.addEventListener("DOMContentLoaded", updateUI);
